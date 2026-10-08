'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/auth/actions'
import { FiMapPin, FiPackage, FiLogOut, FiUser } from 'react-icons/fi'

const baseItem =
  'flex items-center gap-3 px-5 py-4 text-[14px] border-b border-line w-full text-left transition-all'

export const ProfileSidebar: React.FC = () => {
  const pathname = usePathname()

  const link = (href: string, label: string, icon: React.ReactNode) => {
    const isActive = pathname.startsWith(href)
    return (
      <Link
        href={href}
        className={`${baseItem} ${
          isActive
            ? 'text-purple bg-tint font-bold border-l-4 border-l-purple'
            : 'text-ink hover:text-purple hover:bg-card/50'
        }`}
      >
        <span className={`text-[17px] ${isActive ? 'text-purple' : 'text-muted'}`}>{icon}</span>
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <aside className="bg-white rounded-[8px] shadow-sm border border-line self-start overflow-hidden">
      <div className="px-5 py-4 text-[15px] font-bold text-ink border-b border-line flex items-center gap-2">
        <FiUser className="w-4 h-4 text-purple" />
        <span>My Account</span>
      </div>
      {link('/profile/addresses', 'Saved Addresses', <FiMapPin />)}
      {link('/profile/orders', 'My Orders', <FiPackage />)}
      <form
        action={signOut}
        onSubmit={() => {
          if (typeof window !== 'undefined') {
            try {
              const keys: string[] = []
              for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i)
                if (k && (k.startsWith('proguide_cart') || k === 'cart')) {
                  keys.push(k)
                }
              }
              keys.forEach((k) => localStorage.removeItem(k))
            } catch {}
          }
        }}
      >
        <button
          type="submit"
          onClick={() => {
            if (typeof window !== 'undefined') {
              try {
                const keys: string[] = []
                for (let i = 0; i < localStorage.length; i++) {
                  const k = localStorage.key(i)
                  if (k && (k.startsWith('proguide_cart') || k === 'cart')) {
                    keys.push(k)
                  }
                }
                keys.forEach((k) => localStorage.removeItem(k))
              } catch {}
            }
          }}
          className={`${baseItem} text-ink hover:text-red-600 hover:bg-red-50/40 cursor-pointer group`}
        >
          <FiLogOut className="text-[17px] text-muted group-hover:text-red-600 transition-colors" />
          <span>Logout</span>
        </button>
      </form>
    </aside>
  )
}
