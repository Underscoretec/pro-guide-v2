'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { generatePayloadCookie } from 'payload'
import { getPayloadClient } from '@/lib/payload/client'
import { issueOtp, validateStoredOtp, clearOtp, type OtpStep } from '@/lib/authOtp'

export type AuthState = {
  error?: string
  fieldErrors?: Record<string, string>
  values?: Record<string, string>
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9]{10,13}$/

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const values = {
    fullName: str(formData, 'fullName'),
    email: str(formData, 'email').toLowerCase(),
    phoneNumber: str(formData, 'phoneNumber').replace(/[\s-]/g, ''),
    institution: str(formData, 'institution'),
    addressLine: str(formData, 'addressLine'),
    city: str(formData, 'city'),
    state: str(formData, 'state'),
    postalCode: str(formData, 'postalCode'),
    country: str(formData, 'country') || 'India',
  }
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  const fieldErrors: Record<string, string> = {}
  if (!values.fullName) fieldErrors.fullName = 'Full name is required'
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = 'Enter a valid email address'
  if (!PHONE_RE.test(values.phoneNumber)) fieldErrors.phoneNumber = 'Enter a valid phone number (10–13 digits)'
  if (password.length < 8) fieldErrors.password = 'Password must be at least 8 characters'
  if (password !== confirmPassword) fieldErrors.confirmPassword = 'Passwords do not match'
  if (!values.addressLine) fieldErrors.addressLine = 'Street address is required'
  if (!values.city) fieldErrors.city = 'City is required'
  if (!values.state) fieldErrors.state = 'State is required'
  if (!values.postalCode) fieldErrors.postalCode = 'Postal code is required'

  if (Object.keys(fieldErrors).length) return { fieldErrors, values }

  const payload = await getPayloadClient()

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: values.email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.totalDocs > 0) {
    return { fieldErrors: { email: 'An account with this email already exists' }, values }
  }

  let userId: number | string
  try {
    const user = await payload.create({
      collection: 'users',
      overrideAccess: true,
      data: {
        email: values.email,
        password,
        role: 'user', // never trust client-supplied role
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        institution: values.institution || undefined,
        isEmailVerified: false,
        isPhoneVerified: false,
      },
    })
    userId = user.id

    try {
      await payload.create({
        collection: 'shipping-addresses',
        overrideAccess: true,
        data: {
          user: user.id,
          addressLine: values.addressLine,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
          isDefault: true,
        },
      })
    } catch (err) {
      // don't leave a user without an address behind
      await payload.delete({ collection: 'users', id: user.id, overrideAccess: true })
      throw err
    }

    // Issue Step 1 OTP (Email verification)
    await issueOtp(payload, userId, 'email')
  } catch (err) {
    console.error('Sign up failed', err)
    return { error: 'Could not create your account. Please try again.', values }
  }

  redirect(`/verify-otp?email=${encodeURIComponent(values.email)}&step=email`)
}

export async function verifyOtp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase()
  const step = (str(formData, 'step') || 'email') as OtpStep
  const otp = str(formData, 'otp') || (step === 'email' ? str(formData, 'emailOtp') : str(formData, 'phoneOtp'))

  const fieldErrors: Record<string, string> = {}
  if (!otp || !/^\d{6}$/.test(otp)) {
    fieldErrors.otp = `Enter the 6-digit ${step === 'email' ? 'email' : 'phone'} verification code`
  }
  if (!email) return { error: 'Missing email. Please sign up again.' }
  if (Object.keys(fieldErrors).length) return { fieldErrors }

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const user = docs[0]
  if (!user) return { error: 'Account not found. Please sign up again.' }

  if (step === 'email') {
    if (user.isEmailVerified) {
      if (!user.isPhoneVerified) {
        await issueOtp(payload, user.id, 'phone')
        redirect(`/verify-otp?email=${encodeURIComponent(email)}&step=phone`)
      } else {
        redirect('/sign-in?verified=1')
      }
    }

    const validationError = validateStoredOtp(user, 'email', otp)
    if (validationError) {
      return { fieldErrors: { otp: validationError } }
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      overrideAccess: true,
      data: {
        isEmailVerified: true,
      },
    })
    await clearOtp(payload, user.id, 'email')

    // Automatically issue Step 2 (Phone OTP)
    await issueOtp(payload, user.id, 'phone')

    redirect(`/verify-otp?email=${encodeURIComponent(email)}&step=phone`)
  }

  if (step === 'phone') {
    if (!user.isEmailVerified) {
      redirect(`/verify-otp?email=${encodeURIComponent(email)}&step=email`)
    }

    if (user.isPhoneVerified) {
      redirect('/sign-in?verified=1')
    }

    const validationError = validateStoredOtp(user, 'phone', otp)
    if (validationError) {
      return { fieldErrors: { otp: validationError } }
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      overrideAccess: true,
      data: {
        isPhoneVerified: true,
      },
    })
    await clearOtp(payload, user.id, 'phone')

    redirect('/sign-in?verified=1')
  }

  return {}
}

export async function resendOtp(email: string, step: OtpStep = 'email'): Promise<AuthState> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email.toLowerCase() } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const user = docs[0]
  if (!user) return { error: 'Account not found.' }

  try {
    await issueOtp(payload, user.id, step)
    return {}
  } catch (err) {
    console.error(`Failed to resend ${step} OTP`, err)
    return { error: 'Could not send verification code. Please try again.' }
  }
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase()
  const password = String(formData.get('password') ?? '')
  if (!email || !password) return { error: 'Email and password are required', values: { email } }

  const payload = await getPayloadClient()

  let result
  try {
    result = await payload.login({ collection: 'users', data: { email, password }, overrideAccess: true })
  } catch {
    return { error: 'Invalid email or password', values: { email } }
  }

  if (!result.user.isEmailVerified || !result.user.isPhoneVerified) {
    const nextStep: OtpStep = !result.user.isEmailVerified ? 'email' : 'phone'
    await issueOtp(payload, result.user.id, nextStep)
    redirect(`/verify-otp?email=${encodeURIComponent(email)}&step=${nextStep}`)
  }

  if (result.token) {
    const usersConfig = payload.collections.users.config
    const cookie = generatePayloadCookie({
      collectionAuthConfig: usersConfig.auth,
      cookiePrefix: payload.config.cookiePrefix,
      token: result.token,
      returnCookieAsObject: true,
    }) as { name: string; value?: string; expires?: string; httpOnly?: boolean; sameSite?: string; secure?: boolean; path?: string; domain?: string }

    const jar = await cookies()
    jar.set(cookie.name, cookie.value ?? result.token, {
      httpOnly: true,
      secure: cookie.secure,
      sameSite: 'lax',
      path: '/',
      expires: cookie.expires ? new Date(cookie.expires) : undefined,
      domain: cookie.domain,
    })
  }

  redirect('/')
}

export async function signOut() {
  const payload = await getPayloadClient()
  const jar = await cookies()
  jar.delete(`${payload.config.cookiePrefix}-token`)
  redirect('/sign-in')
}
