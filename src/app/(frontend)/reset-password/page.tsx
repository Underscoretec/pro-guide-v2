import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthShell } from '@/components/Auth/AuthShell'
import { ResetPasswordForm } from '@/components/Auth/ResetPasswordForm'

export const metadata: Metadata = { title: 'Reset Password | ProGuide' }

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams
  if (!email) redirect('/forgot-password')

  return (
    <AuthShell title="Reset Password" subtitle="Enter the 6-digit code we sent you and choose a new password.">
      <ResetPasswordForm email={email} />
    </AuthShell>
  )
}
