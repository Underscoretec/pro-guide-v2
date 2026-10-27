import type { Metadata } from 'next'
import { AuthShell } from '@/components/Auth/AuthShell'
import { ForgotPasswordForm } from '@/components/Auth/ForgotPasswordForm'

export const metadata: Metadata = { title: 'Forgot Password | ProGuide' }

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your account email and we'll send you a 6-digit code to reset your password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  )
}
