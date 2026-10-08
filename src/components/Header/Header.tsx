'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

interface HeaderProps {
  data?: any
  user?: { fullName?: string | null; email: string } | null
}

export const Header: React.FC<HeaderProps> = ({ data, user }) => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const isUrlActive = (url: string) => {
    if (!url || !pathname) return false
    const cleanUrl = url.split('#')[0]
    if (cleanUrl === '/') {
      return pathname === '/'
    }
    return pathname === cleanUrl || pathname.startsWith(cleanUrl)
  }

  const getActiveNavLabel = (path: string): string => {
    if (!path || path === '/') return 'Home'
    if (path.startsWith('/contact')) return 'Contact Us'
    if (path.startsWith('/customized-model')) return 'Get Your Own Customized Model'
    if (path.startsWith('/resources')) return 'Resources'
    if (path.startsWith('/training-courses') || path.startsWith('/workshops')) return 'Training Courses'
    if (path.startsWith('/videos')) return 'Learning'
    return ''
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      window.location.href = '/products'
    }
  }

  const { itemCount, isHydrated } = useCart()

  // Fallbacks from global
  const announcementText =
    data?.announcement?.text ||
    'Unlock new opportunities by upskilling and stepping into a brighter future.'
  const announcementLinkText = data?.announcement?.linkText || 'Explore Now!!'
  const announcementLinkUrl = data?.announcement?.linkUrl || '#workshops'

  const logoSrc = data?.logo?.url || data?.logoUrl || '/images/logo.svg'
  const searchPlaceholder = data?.searchPlaceholder || 'What would you like to learn?'

  const defaultNavItems = [
    { label: 'Home', url: '/' },
    {
      label: 'Learning',
      hasDropdown: true,
      dropdownItems: [
        { label: 'About Faculty & Training', url: '/training-courses' },
        { label: 'Learning Bites', url: '/videos' },
        { label: 'Why 3D Simulation Models', url: '/resources' },
      ],
    },
    {
      label: 'Training Courses',
      hasDropdown: true,
      dropdownItems: [
        { label: '3D Temporal Bone', url: '/workshops#temporal' },
        { label: 'Paranasal Sinus', url: '/workshops#sinus' },
        { label: 'Microlaryngoscopy & Laser Surgeries', url: '/workshops#larynx' },
        { label: 'Types of Training Courses Conducted', url: '/training-courses' },
      ],
    },
    { label: 'Resources', url: '/resources' },
    { label: 'Get Your Own Customized Model', url: '/customized-model' },
    { label: 'Contact Us', url: '/contact' },
  ]

  const sanitizeUrl = (rawUrl: string, label: string) => {
    if (!rawUrl) return '/'
    let url = rawUrl.replace(/\.html/g, '')
    if (label === '3D Temporal Bone') return '/workshops#temporal'
    if (label === 'Paranasal Sinus') return '/workshops#sinus'
    if (label === 'Microlaryngoscopy & Laser Surgeries') return '/workshops#larynx'
    if (label === 'Types of Training Courses Conducted' || label === 'About Faculty & Training') return '/training-courses'
    if (label === 'Otolaryngology Video Library' || label === 'Learning Bites') return '/videos'
    if (label === 'Why 3D Simulation Models' || label === 'Resources') return '/resources'
    if (url === '#workshops') return '/workshops'
    if (url === '#temporal') return '/workshops#temporal'
    if (url === '#sinus') return '/workshops#sinus'
    if (url === '#larynx') return '/workshops#larynx'
    return url
  }

  const rawNavItems = data?.navItems && data.navItems.length > 0 ? data.navItems : defaultNavItems

  const navItems = rawNavItems.map((item: any) => ({
    ...item,
    url: sanitizeUrl(item.url, item.label),
    dropdownItems: item.dropdownItems?.map((drop: any) => ({
      ...drop,
      url: sanitizeUrl(drop.url, drop.label),
    })),
  }))

  const buyNowText =
    data?.buyNowButton?.text && !['Buy Now', 'Buy 3D Models'].includes(data.buyNowButton.text)
      ? data.buyNowButton.text
      : 'Explore Products'
  const buyNowUrl = sanitizeUrl(data?.buyNowButton?.url || '/products', 'Buy Now')
  const cartUrl = data?.cartUrl || 'https://pro-guide.in/'
  const loginText = data?.loginButton?.text || 'Login /Register'
  const loginUrl = '/sign-in'

  const initial = (user?.fullName || user?.email || '?').trim().charAt(0).toUpperCase()

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-purple-bar text-white text-center text-[13.5px] py-2 px-4 font-semibold">
        {announcementText}&nbsp;
        <Link href={sanitizeUrl(announcementLinkUrl, 'Announcement')} className="!text-[#FFD9A8] underline hover:text-white transition-colors">
          {announcementLinkText}
        </Link>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-line shadow-sm">
        <div className="max-w-full mx-auto px-6 min-h-[64px] py-2 flex items-center gap-[18px] justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={logoSrc}
              alt="ProGuide"
              width={172}
              height={50}
              priority
              unoptimized
              className="h-[50px] w-auto block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            {(() => {
              const activeNavLabel = getActiveNavLabel(pathname)
              return navItems.map((item: any, idx: number) => {
                if (item.hasDropdown) {
                  const isOpen = openDropdownIndex === idx
                  const isParentActive = item.label === activeNavLabel
                  return (
                    <div
                      key={idx}
                      className="relative group"
                      onMouseEnter={() => setOpenDropdownIndex(idx)}
                      onMouseLeave={() => setOpenDropdownIndex(null)}
                    >
                      <button
                        type="button"
                        className={`font-semibold text-[13.5px] px-[9px] py-2 rounded flex items-center gap-1 transition-colors ${
                          isParentActive
                            ? 'text-purple bg-tint font-bold'
                            : 'text-ink hover:text-purple hover:bg-tint'
                        }`}
                      >
                        {item.label} <span className="text-[10px] text-muted">&#x25BE;</span>
                      </button>
                      <div
                        className={`absolute top-full left-0 bg-white min-w-[250px] border border-line rounded-[6px] shadow-[0_14px_34px_rgba(31,35,40,0.14)] py-[6px] z-50 transition-all duration-150 ${
                          isOpen ? 'block opacity-100' : 'hidden opacity-0'
                        }`}
                      >
                        {item.dropdownItems?.map((dropItem: any, dropIdx: number) => {
                          const isDropActive = isUrlActive(dropItem.url)
                          return (
                            <Link
                              key={dropIdx}
                              href={dropItem.url || '#'}
                              onClick={() => setOpenDropdownIndex(null)}
                              className={`block px-4 py-[9px] text-[13.5px] transition-colors ${
                                isDropActive
                                  ? 'text-purple bg-tint font-bold'
                                  : 'text-ink hover:bg-tint hover:text-purple'
                              }`}
                            >
                              {dropItem.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                }

                const isActive = item.label === activeNavLabel
                return (
                  <Link
                    key={idx}
                    href={item.url || '/'}
                    className={`font-semibold text-[13.5px] px-[9px] py-2 rounded transition-colors ${
                      isActive
                        ? 'text-purple bg-tint font-bold'
                        : 'text-ink hover:text-purple hover:bg-tint'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })
            })()}

            {/* Unique Highlighted Products CTA Button */}
            <Link
              href={buyNowUrl}
              className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] text-white text-[13px] font-extrabold px-[15px] py-2 rounded-[6px] shadow-[0_4px_14px_rgba(230,126,34,0.38)] hover:shadow-[0_6px_22px_rgba(230,126,34,0.55)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 ml-1.5 overflow-hidden group"
            >
           
              <span>{buyNowText}</span>
            </Link>

            {/* Cart Icon */}
            <Link
              href={cartUrl}
              title="Shopping Cart"
              className="relative text-[20px] px-[6px] py-1 text-ink hover:text-purple transition-colors ml-1 inline-flex items-center"
            >
              &#128722;
              {isHydrated && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center leading-none shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Login / Register */}
            {user ? (
              <Link
                href="/profile"
                title="My Profile"
                aria-label="My Profile"
                className="ml-1 w-9 h-9 rounded-full bg-orange-d text-white font-bold text-[14px] flex items-center justify-center hover:bg-orange transition-colors"
              >
                {initial}
              </Link>
            ) : (
              <Link
                href={loginUrl}
                className="border border-[#C9CDD3] rounded-[5px] px-4 py-[9px] text-[13.5px] font-bold text-ink hover:border-purple hover:text-purple hover:bg-tint transition-all ml-1"
              >
                {loginText}
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink hover:text-purple rounded-md focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line bg-white px-6 py-4 shadow-lg space-y-3">
            <div className="flex items-center bg-[#F6F7F8] border border-line rounded-[6px] px-3 py-2 mb-3">
              <span className="text-muted text-sm mr-2">&#128269;</span>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent border-0 outline-none text-[13.5px] w-full"
              />
            </div>
            {(() => {
              const activeNavLabel = getActiveNavLabel(pathname)
              return navItems.map((item: any, idx: number) => {
                if (item.hasDropdown) {
                  return (
                    <div key={idx} className="border-t border-line pt-2">
                      <span className="font-bold text-[13px] text-muted uppercase">{item.label}</span>
                      {item.dropdownItems?.map((dropItem: any, dropIdx: number) => {
                        const isDropActive = isUrlActive(dropItem.url)
                        return (
                          <Link
                            key={dropIdx}
                            href={dropItem.url || '#'}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-1 pl-3 text-[13.5px] transition-colors ${
                              isDropActive ? 'text-purple font-bold' : 'text-ink hover:text-purple'
                            }`}
                          >
                            {dropItem.label}
                          </Link>
                        )
                      })}
                    </div>
                  )
                }
                const isActive = item.label === activeNavLabel
                return (
                  <Link
                    key={idx}
                    href={item.url || '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-semibold text-[14px] py-1 transition-colors ${
                      isActive ? 'text-purple font-bold' : 'text-ink hover:text-purple'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })
            })()}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-[#F4F4F6] text-ink text-[13.5px] font-bold py-2 rounded-[5px] flex items-center justify-center gap-2 hover:text-purple"
              >
                <span>&#128722; Cart</span>
                {isHydrated && itemCount > 0 && (
                  <span className="bg-purple text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link
                href={buyNowUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] text-white text-[13.5px] font-extrabold py-2.5 rounded-[6px] shadow-md flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                
                <span>{buyNowText}</span>
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center border border-[#C9CDD3] text-ink text-[13.5px] font-bold py-2 rounded-[5px]"
                >
                  My Profile
                </Link>
              ) : (
                <Link
                  href={loginUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center border border-[#C9CDD3] text-ink text-[13.5px] font-bold py-2 rounded-[5px]"
                >
                  {loginText}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
