'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/auth/actions'

const item = 'flex items-center gap-3 px-4 py-4 text-[14px] border-b border-line w-full text-left'

export const ProfileSidebar: React.FC = () => {
  const pathname = usePathname()
  const link = (href: string, label: string, icon: string) => (
    <Link
      href={href}
      className={`${item} ${pathname.startsWith(href) ? 'text-orange-d font-semibold' : 'text-ink hover:text-purple'}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </Link>
  )
  return (
    <aside className="bg-white rounded-[6px] shadow-sm self-start">
      <div className="px-4 py-4 text-[16px] text-ink border-b border-line">Profile</div>
      {link('/profile/addresses', 'Saved Address', '📍')}
      {link('/profile/orders', 'My Orders', '📦')}
      <form action={signOut}>
        <button type="submit" className={`${item} text-ink hover:text-purple`}>
          <span aria-hidden>↪</span>
          Logout
        </button>
      </form>
    </aside>
  )
}
