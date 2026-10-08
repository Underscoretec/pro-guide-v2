import type { Metadata } from 'next'
import { AuthShell } from '@/components/Auth/AuthShell'
import { SignUpForm } from '@/components/Auth/SignUpForm'

export const metadata: Metadata = { title: 'Create Account | ProGuide' }

export default function SignUpPage() {
  return (
    <AuthShell wide title="Create Account" subtitle="Register to buy models and book workshops.">
      <SignUpForm />
    </AuthShell>
  )
}
