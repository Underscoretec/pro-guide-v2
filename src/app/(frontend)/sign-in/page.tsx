import type { Metadata } from 'next'
import { AuthShell } from '@/components/Auth/AuthShell'
import { SignInForm } from '@/components/Auth/SignInForm'

export const metadata: Metadata = { title: 'Sign In | ProGuide' }

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string }>
}) {
  const { verified } = await searchParams
  return (
    <AuthShell title="Sign In" subtitle="Welcome back. Sign in to your ProGuide account.">
      <SignInForm justVerified={verified === '1'} />
    </AuthShell>
  )
}
