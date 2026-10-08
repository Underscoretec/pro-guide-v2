import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import { ProfileSidebar } from '@/components/Profile/ProfileSidebar'

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  return (
    <main className="flex-1 bg-[#F1F1F1] py-8 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto grid gap-5 md:grid-cols-[320px_1fr]">
        <ProfileSidebar />
        <div>{children}</div>
      </div>
    </main>
  )
}
