'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  data?: any
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      window.location.href = '/products.html'
    }
  }

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
        { label: 'About Faculty & Training', url: '/training-courses.html' },
        { label: 'Otolaryngology Video Library', url: '/videos.html' },
        { label: 'Why 3D Simulation Models', url: '/resources' },
      ],
    },
    {
      label: 'Training Courses',
      hasDropdown: true,
      dropdownItems: [
        { label: '3D Temporal Bone', url: '#workshops' },
        { label: 'Paranasal Sinus', url: '#workshops' },
        { label: 'Microlaryngoscopy & Laser Surgeries', url: '#workshops' },
        { label: 'Types of Training Courses Conducted', url: '/training-courses.html' },
      ],
    },
    { label: 'Resources', url: '/resources' },
    { label: 'Get Your Own Customized Model', url: '/customized-model' },
    { label: 'Contact Us', url: '/contact' },
  ]

  const navItems = data?.navItems && data.navItems.length > 0 ? data.navItems : defaultNavItems

  const buyNowText = data?.buyNowButton?.text || 'Buy Now'
  const buyNowUrl = data?.buyNowButton?.url || '/products'
  const cartUrl = data?.cartUrl || 'https://pro-guide.in/'
  const loginText = data?.loginButton?.text || 'Login /Register'
  const loginUrl = '/sign-in'

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-purple-bar text-white text-center text-[13.5px] py-2 px-4 font-semibold">
        {announcementText}&nbsp;
        <Link href={announcementLinkUrl} className="!text-[#FFD9A8] underline hover:text-white transition-colors">
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
            {navItems.map((item: any, idx: number) => {
              if (item.hasDropdown) {
                const isOpen = openDropdownIndex === idx
                return (
                  <div
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdownIndex(idx)}
                    onMouseLeave={() => setOpenDropdownIndex(null)}
                  >
                    <button
                      type="button"
                      className="text-ink font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint flex items-center gap-1 transition-colors"
                    >
                      {item.label} <span className="text-[10px] text-muted">&#x25BE;</span>
                    </button>
                    <div
                      className={`absolute top-full left-0 bg-white min-w-[250px] border border-line rounded-[6px] shadow-[0_14px_34px_rgba(31,35,40,0.14)] py-[6px] z-50 transition-all duration-150 ${
                        isOpen ? 'block opacity-100' : 'hidden opacity-0'
                      }`}
                    >
                      {item.dropdownItems?.map((dropItem: any, dropIdx: number) => (
                        <Link
                          key={dropIdx}
                          href={dropItem.url || '#'}
                          className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={idx}
                  href={item.url || '/'}
                  className={`font-semibold text-[13.5px] px-[9px] py-2 rounded transition-colors ${
                    item.url === '/' || item.label === 'Home'
                      ? 'text-purple hover:bg-tint'
                      : 'text-ink hover:text-purple hover:bg-tint'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Buy Now Button */}
            <Link
              href={buyNowUrl}
              className="inline-block bg-orange text-white text-[12.5px] font-bold px-[14px] py-2 rounded-[5px] hover:bg-orange-d border border-orange hover:border-orange-d transition-all ml-1 shadow-sm"
            >
              {buyNowText}
            </Link>

            {/* Cart Icon */}
            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Cart (opens the ProGuide store)"
              className="text-[20px] px-[6px] py-1 text-ink hover:text-purple transition-colors ml-1"
            >
              &#128722;
            </a>

            {/* Login / Register */}
            <Link
              href={loginUrl}
              className="border border-[#C9CDD3] rounded-[5px] px-4 py-[9px] text-[13.5px] font-bold text-ink hover:border-purple hover:text-purple hover:bg-tint transition-all ml-1"
            >
              {loginText}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-ink hover:text-purple rounded-md focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            {navItems.map((item: any, idx: number) => {
              if (item.hasDropdown) {
                return (
                  <div key={idx} className="border-t border-line pt-2">
                    <span className="font-bold text-[13px] text-muted uppercase">{item.label}</span>
                    {item.dropdownItems?.map((dropItem: any, dropIdx: number) => (
                      <Link
                        key={dropIdx}
                        href={dropItem.url || '#'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              return (
                <Link
                  key={idx}
                  href={item.url || '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-ink font-semibold text-[14px] py-1 hover:text-purple"
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href={buyNowUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-orange text-white text-[13.5px] font-bold py-2 rounded-[5px]"
              >
                {buyNowText}
              </Link>
              <Link
                href={loginUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-center border border-[#C9CDD3] text-ink text-[13.5px] font-bold py-2 rounded-[5px]"
              >
                {loginText}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
 