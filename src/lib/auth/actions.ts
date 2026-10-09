'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { generatePayloadCookie } from 'payload'
import { getPayloadClient } from '@/lib/payload/client'
import { generateOtp, hashOtp, otpExpiry } from './otp'

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

  const redirectTo = str(formData, 'redirectTo')

  if (Object.keys(fieldErrors).length) return { fieldErrors, values }

  const payload = await getPayloadClient()

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: values.email } },
    limit: 1,
    depth: 0,
  })
  if (existing.totalDocs > 0) {
    return { fieldErrors: { email: 'An account with this email already exists' }, values }
  }

  let userId: number | string
  try {
    const otp = generateOtp()
    const user = await payload.create({
      collection: 'users',
      data: {
        email: values.email,
        password,
        role: 'user', // never trust client-supplied role
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        institution: values.institution || undefined,
        isEmailVerified: false,
        isPhoneVerified: false,
        emailOtpHash: hashOtp(otp),
        emailOtpExpiresAt: otpExpiry(),
        phoneOtpHash: hashOtp(otp),
        phoneOtpExpiresAt: otpExpiry(),
      },
    })
    userId = user.id

    try {
      await payload.create({
        collection: 'shipping-addresses',
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
      await payload.delete({ collection: 'users', id: user.id })
      throw err
    }
  } catch (err) {
    console.error('Sign up failed', err)
    return { error: 'Could not create your account. Please try again.', values }
  }

  const params = new URLSearchParams({ email: values.email })
  if (redirectTo && redirectTo.startsWith('/')) {
    params.set('redirect', redirectTo)
  }
  redirect(`/verify-otp?${params.toString()}`)
}

export async function verifyOtp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase()
  const emailOtp = str(formData, 'emailOtp')
  const phoneOtp = str(formData, 'phoneOtp')
  const redirectTo = str(formData, 'redirectTo')

  const fieldErrors: Record<string, string> = {}
  if (!/^\d{6}$/.test(emailOtp)) fieldErrors.emailOtp = 'Enter the 6-digit email OTP'
  if (!/^\d{6}$/.test(phoneOtp)) fieldErrors.phoneOtp = 'Enter the 6-digit phone OTP'
  if (!email) return { error: 'Missing email. Please sign up again.' }
  if (Object.keys(fieldErrors).length) return { fieldErrors }

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  })
  const user = docs[0]
  if (!user) return { error: 'Account not found. Please sign up again.' }

  const now = Date.now()
  const emailOk =
    user.isEmailVerified ||
    (user.emailOtpHash === hashOtp(emailOtp) &&
      !!user.emailOtpExpiresAt &&
      new Date(user.emailOtpExpiresAt).getTime() > now)
  const phoneOk =
    user.isPhoneVerified ||
    (user.phoneOtpHash === hashOtp(phoneOtp) &&
      !!user.phoneOtpExpiresAt &&
      new Date(user.phoneOtpExpiresAt).getTime() > now)

  if (!emailOk || !phoneOk) {
    return {
      fieldErrors: {
        ...(emailOk ? {} : { emailOtp: 'Invalid or expired OTP' }),
        ...(phoneOk ? {} : { phoneOtp: 'Invalid or expired OTP' }),
      },
    }
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      isEmailVerified: true,
      isPhoneVerified: true,
      emailOtpHash: null,
      emailOtpExpiresAt: null,
      phoneOtpHash: null,
      phoneOtpExpiresAt: null,
    },
  })

  const params = new URLSearchParams({ verified: '1' })
  if (redirectTo && redirectTo.startsWith('/')) {
    params.set('redirect', redirectTo)
  }
  redirect(`/sign-in?${params.toString()}`)
}

export async function resendOtp(email: string): Promise<AuthState> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email.toLowerCase() } },
    limit: 1,
    depth: 0,
  })
  const user = docs[0]
  if (!user) return { error: 'Account not found.' }

  const otp = generateOtp() // TODO: deliver via email / SMS
  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      emailOtpHash: hashOtp(otp),
      emailOtpExpiresAt: otpExpiry(),
      phoneOtpHash: hashOtp(otp),
      phoneOtpExpiresAt: otpExpiry(),
    },
  })
  return {}
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase()
  const password = String(formData.get('password') ?? '')
  const redirectTo = str(formData, 'redirectTo')
  if (!email || !password) return { error: 'Email and password are required', values: { email } }

  const payload = await getPayloadClient()

  let result
  try {
    result = await payload.login({ collection: 'users', data: { email, password } })
  } catch {
    return { error: 'Invalid email or password', values: { email } }
  }

  if (!result.user.isEmailVerified || !result.user.isPhoneVerified) {
    const params = new URLSearchParams({ email })
    if (redirectTo && redirectTo.startsWith('/')) {
      params.set('redirect', redirectTo)
    }
    redirect(`/verify-otp?${params.toString()}`)
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

  const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/'
  redirect(target)
}

export async function signOut() {
  const payload = await getPayloadClient()
  const jar = await cookies()
  jar.delete(`${payload.config.cookiePrefix}-token`)
  redirect('/sign-in')
}
