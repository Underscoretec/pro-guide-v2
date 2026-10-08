import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload/client'
import { issueOtp, type OtpStep } from '@/lib/authOtp'
import { AuthShell } from '@/components/Auth/AuthShell'
import { VerifyOtpForm } from '@/components/Auth/VerifyOtpForm'

export const metadata: Metadata = { title: 'Verify Account | ProGuide' }

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; step?: string }>
}) {
  const { email, step: queryStep } = await searchParams
  if (!email) redirect('/sign-up')

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email.toLowerCase() } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const user = docs[0]
  if (!user) redirect('/sign-up')

  if (user.isEmailVerified && user.isPhoneVerified) {
    redirect('/sign-in?verified=1')
  }

  // Determine active step based on user status
  let activeStep: OtpStep = 'email'
  if (!user.isEmailVerified) {
    activeStep = 'email'
  } else if (!user.isPhoneVerified) {
    activeStep = 'phone'
    // Ensure phone OTP has been issued
    if (!user.phoneOtpHash) {
      await issueOtp(payload, user.id, 'phone')
    }
  }

  // Ensure query param matches actual progress
  if (queryStep !== activeStep) {
    redirect(`/verify-otp?email=${encodeURIComponent(email)}&step=${activeStep}`)
  }

  const isEmail = activeStep === 'email'
  const title = isEmail ? 'Verify Your Email' : 'Verify Your Phone Number'
  const subtitle = isEmail
    ? `We've sent a 6-digit verification code to ${email}.`
    : `We've sent a 6-digit verification code to your phone number ${user.phoneNumber ? `(${user.phoneNumber})` : ''}.`

  return (
    <AuthShell title={title} subtitle={subtitle}>
      <VerifyOtpForm
        email={email}
        step={activeStep}
        phoneNumber={user.phoneNumber || undefined}
      />
    </AuthShell>
  )
}
