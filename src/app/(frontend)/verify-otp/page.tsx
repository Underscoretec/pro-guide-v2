import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthShell } from '@/components/Auth/AuthShell'
import { VerifyOtpForm } from '@/components/Auth/VerifyOtpForm'

export const metadata: Metadata = { title: 'Verify OTP | ProGuide' }

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams
  if (!email) redirect('/sign-up')

  return (
    <AuthShell
      title="Verify your account"
      subtitle={`Enter the OTPs sent to ${email} and your phone number.`}
    >
      <VerifyOtpForm email={email} />
    </AuthShell>
  )
}
