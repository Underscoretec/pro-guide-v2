import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import { ProfileSidebar } from '@/components/Profile/ProfileSidebar'

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  return (
    <main className="flex-1 bg-[#F8F8FA] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto grid gap-6 md:grid-cols-[280px_1fr] items-start">
        <ProfileSidebar />
        <div className="w-full">{children}</div>
      </div>
    </main>
  )
}
