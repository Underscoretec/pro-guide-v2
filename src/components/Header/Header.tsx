'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(false)
  const [trainingOpen, setTrainingOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      window.location.href = '/products.html'
    }
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-purple-bar text-white text-center text-[13.5px] py-2 px-4 font-semibold">
        Unlock new opportunities by upskilling and stepping into a brighter future.&nbsp;
        <Link href="#workshops" className="text-[#FFD9A8] underline hover:text-white transition-colors">
          Explore Now!!
        </Link>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-line shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 min-h-[64px] py-2 flex items-center gap-[18px] flex-wrap justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="ProGuide"
              className="h-[50px] w-auto block"
            />
          </Link>

          {/* Search Box */}
          <div className="hidden sm:flex items-center bg-[#F6F7F8] border border-line rounded-[6px] px-3 py-2 min-w-[200px] flex-initial md:flex-[0_1_240px] gap-2">
            <span className="text-muted text-sm">&#128269;</span>
            <input
              type="text"
              placeholder="What would you like to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="bg-transparent border-0 outline-none text-[13.5px] w-full text-ink placeholder:text-muted"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto flex-wrap">
            <Link
              href="/"
              className="text-purple font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint transition-colors"
            >
              Home
            </Link>

            {/* Learning Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setLearningOpen(true)}
              onMouseLeave={() => setLearningOpen(false)}
            >
              <button
                type="button"
                className="text-ink font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint flex items-center gap-1 transition-colors"
              >
                Learning <span className="text-[10px] text-muted">&#x25BE;</span>
              </button>
              <div
                className={`absolute top-full left-0 bg-white min-w-[250px] border border-line rounded-[6px] shadow-[0_14px_34px_rgba(31,35,40,0.14)] py-[6px] z-50 transition-all duration-150 ${
                  learningOpen ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <Link
                  href="/training-courses.html"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  About Faculty &amp; Training
                </Link>
                <Link
                  href="/videos.html"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  Otolaryngology Video Library
                </Link>
                <Link
                  href="/resources.html"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  Why 3D Simulation Models
                </Link>
              </div>
            </div>

            {/* Training Courses Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setTrainingOpen(true)}
              onMouseLeave={() => setTrainingOpen(false)}
            >
              <button
                type="button"
                className="text-ink font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint flex items-center gap-1 transition-colors"
              >
                Training Courses <span className="text-[10px] text-muted">&#x25BE;</span>
              </button>
              <div
                className={`absolute top-full left-0 bg-white min-w-[260px] border border-line rounded-[6px] shadow-[0_14px_34px_rgba(31,35,40,0.14)] py-[6px] z-50 transition-all duration-150 ${
                  trainingOpen ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <Link
                  href="#workshops"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  3D Temporal Bone
                </Link>
                <Link
                  href="#workshops"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  Paranasal Sinus
                </Link>
                <Link
                  href="#workshops"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  Microlaryngoscopy &amp; Laser Surgeries
                </Link>
                <Link
                  href="/training-courses.html"
                  className="block px-4 py-[9px] text-[13.5px] text-ink hover:bg-tint hover:text-purple"
                >
                  Types of Training Courses Conducted
                </Link>
              </div>
            </div>

            <Link
              href="/resources.html"
              className="text-ink font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/customized-model.html"
              className="text-ink font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint transition-colors"
            >
              Get Your Own Customized Model
            </Link>
            <Link
              href="/contact.html"
              className="text-ink font-semibold text-[13.5px] px-[9px] py-2 rounded hover:text-purple hover:bg-tint transition-colors"
            >
              Contact Us
            </Link>

            {/* Buy Now Button */}
            <Link
              href="/products.html"
              className="inline-block bg-orange text-white text-[12.5px] font-bold px-[14px] py-2 rounded-[5px] hover:bg-orange-d border border-orange hover:border-orange-d transition-all ml-1 shadow-sm"
            >
              Buy Now
            </Link>

            {/* Cart Icon */}
            <a
              href="https://pro-guide.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="Cart (opens the ProGuide store)"
              className="text-[20px] px-[6px] py-1 text-ink hover:text-purple transition-colors ml-1"
            >
              &#128722;
            </a>

            {/* Login / Register */}
            <a
              href="https://pro-guide.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#C9CDD3] rounded-[5px] px-4 py-[9px] text-[13.5px] font-bold text-ink hover:border-purple hover:text-purple hover:bg-tint transition-all ml-1"
            >
              Login /Register
            </a>
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
                placeholder="What would you like to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent border-0 outline-none text-[13.5px] w-full"
              />
            </div>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-purple font-semibold text-[14px] py-1"
            >
              Home
            </Link>
            <div className="border-t border-line pt-2">
              <span className="font-bold text-[13px] text-muted uppercase">Learning</span>
              <Link
                href="/training-courses.html"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                About Faculty &amp; Training
              </Link>
              <Link
                href="/videos.html"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                Otolaryngology Video Library
              </Link>
              <Link
                href="/resources.html"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                Why 3D Simulation Models
              </Link>
            </div>
            <div className="border-t border-line pt-2">
              <span className="font-bold text-[13px] text-muted uppercase">Training Courses</span>
              <Link
                href="#workshops"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                3D Temporal Bone
              </Link>
              <Link
                href="#workshops"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                Paranasal Sinus
              </Link>
              <Link
                href="#workshops"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                Microlaryngoscopy &amp; Laser Surgeries
              </Link>
              <Link
                href="/training-courses.html"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-ink py-1 pl-3 text-[13.5px] hover:text-purple"
              >
                Types of Training Courses Conducted
              </Link>
            </div>
            <Link
              href="/resources.html"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ink font-semibold text-[14px] py-1 hover:text-purple"
            >
              Resources
            </Link>
            <Link
              href="/customized-model.html"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ink font-semibold text-[14px] py-1 hover:text-purple"
            >
              Get Your Own Customized Model
            </Link>
            <Link
              href="/contact.html"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ink font-semibold text-[14px] py-1 hover:text-purple"
            >
              Contact Us
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/products.html"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-orange text-white text-[13.5px] font-bold py-2 rounded-[5px]"
              >
                Buy Now
              </Link>
              <a
                href="https://pro-guide.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center border border-[#C9CDD3] text-ink text-[13.5px] font-bold py-2 rounded-[5px]"
              >
                Login /Register
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
