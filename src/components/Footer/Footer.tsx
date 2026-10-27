import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { roboto } from '@/font'

interface FooterProps {
  footer?: any
}

export const Footer: React.FC<FooterProps> = ({ footer }) => {
  const logoSrc = footer?.logo?.url || footer?.logoUrl || '/images/logo_white.svg'

  const quickLinksTitle = footer?.quickLinksTitle || 'Quick Links'
  const defaultQuickLinks = [
    { label: 'Buy Now', url: '/products' },
    { label: 'Cart', url: '/cart' },
    { label: 'Resources', url: '/resources' },
    { label: 'Get Your Own Customized Model', url: '/customized-model' },
    { label: 'Login/Register', url: '/sign-in' },
  ]
  const rawQuickLinks = footer?.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : defaultQuickLinks
  const quickLinks = rawQuickLinks.map((item: any) => {
    const labelLower = item.label?.toLowerCase() || ''
    if (labelLower.includes('login') || labelLower.includes('register')) {
      return { ...item, url: '/sign-in' }
    }
    return item
  })

  const indianTitle = footer?.indianQuery?.title || 'Contacts for Indian Queries'
  const indianName = footer?.indianQuery?.name || 'Shelly Sequeira'
  const indianEmail = footer?.indianQuery?.email || 'shelly@knowledgebridgeint.com'
  const indianPhone = footer?.indianQuery?.phone || '9220522294'

  const intlTitle = footer?.internationalQuery?.title || 'Contacts for International Queries'
  const intlName = footer?.internationalQuery?.name || 'Shashikumar Sambhoo'
  const intlEmail = footer?.internationalQuery?.email || 'svs@knowledgebridgeint.com'
  const intlPhone = footer?.internationalQuery?.phone || '+971 507863903 | +91 9820454543'

  const addressTitle = footer?.address?.title || 'Address'
  const addressText =
    footer?.address?.text ||
    '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East). Mumbai-400059, Maharashtra, India'

  const aboutText =
    footer?.about ||
    'ProGuide is dedicated to equipping individuals, businesses, and organizations with the skills needed for the future by providing accessible and affordable high-quality education. Through collaborations with leading institutions and industry experts, ProGuide offers a wide range of courses, certifications, and professional programs designed to enhance career growth and business success.'

  const defaultLegalLinks = [
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Terms and Condition', url: '/terms&conditions' },
    { label: 'Shipping Policy', url: '/shipping-policy' },
    { label: 'Cancellation and Return Policy', url: '/refund-policy' },
  ]
  const rawLegalLinks = footer?.legalLinks && footer.legalLinks.length > 0 ? footer.legalLinks : defaultLegalLinks
  const legalLinks = rawLegalLinks
    .map((item: any) => {
      const labelLower = item.label?.toLowerCase() || ''
      if (labelLower.includes('privacy')) {
        return { label: 'Privacy Policy', url: '/privacy-policy' }
      }
      if (labelLower.includes('terms')) {
        return { label: 'Terms and Condition', url: '/terms&conditions' }
      }
      if (labelLower.includes('shipping')) {
        return { label: 'Shipping Policy', url: '/shipping-policy' }
      }
      if (labelLower.includes('cancel') || labelLower.includes('return') || labelLower.includes('refund')) {
        return { label: 'Cancellation and Return Policy', url: '/refund-policy' }
      }
      if (item.url?.startsWith('/')) {
        return item
      }
      return null
    })
    .filter(Boolean)

  const copyrightText =
    footer?.copyright ||
    '© 2026. All Rights Reserved · 3D simulation models by OSSA PLUS SIMULATION LLP — ossaplussim.com'

  const defaultSocialLinks = [
    { platform: 'facebook', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'youtube', url: '#' },
  ]
  const socialLinks = footer?.socialLinks && footer.socialLinks.length > 0 ? footer.socialLinks : defaultSocialLinks

  const getSocialIcon = (platform: string) => {
    const p = platform?.toLowerCase()
    if (p === 'facebook' || p === 'f') return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    )
    if (p === 'instagram') return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
    if (p === 'linkedin' || p === 'in') return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
    if (p === 'youtube' || p === '►') return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    )
    // fallback
    return <span className="text-[11px] font-bold">{platform}</span>
  }

  return (
    <footer className={`${roboto.className} bg-[#4A148C] text-[#E3D7F2] text-[13.5px] mt-10`}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-[34px] py-[44px] pb-[26px]">
          {/* Col 1: Quick Links */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              {quickLinksTitle}
            </h4>
            <div className="space-y-[3px]">
              {quickLinks.map((item: any, idx: number) => {
                const isCart = item.label?.toLowerCase() === 'cart'
                const href = isCart ? '/cart' : item.url || '#'
                return (
                  <Link
                    key={idx}
                    href={href}
                    className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Col 2: Indian Queries */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              {indianTitle}
            </h4>
            <p className="leading-relaxed">
              <strong className="text-white font-bold">{indianName}</strong>
              <br />
              Email :{' '}
              <a
                href={`mailto:${indianEmail}`}
                className="inline text-[#E7D8EE] hover:text-white hover:underline"
              >
                {indianEmail}
              </a>
              <br />
              Mobile : {indianPhone}
            </p>
          </div>

          {/* Col 3: International Queries */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              {intlTitle}
            </h4>
            <p className="leading-relaxed">
              <strong className="text-white font-bold">{intlName}</strong>
              <br />
              Email:{' '}
              <a
                href={`mailto:${intlEmail}`}
                className="inline text-[#E7D8EE] hover:text-white hover:underline"
              >
                {intlEmail}
              </a>
              <br />
              Mobile : {intlPhone}
            </p>
          </div>

          {/* Col 4: Address */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              {addressTitle}
            </h4>
            <p className="leading-relaxed">
              {addressText}
            </p>
          </div>
        </div>

        {/* Brand Row */}
        <div className="border-t border-white/25 py-5 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[26px] items-center">
          <div className="shrink-0">
            <Image
              src={logoSrc}
              alt="ProGuide"
              width={152}
              height={44}
              unoptimized
              className="h-[44px] w-auto block"
            />
          </div>
          <div className="text-[12.5px] text-[#D9C4E3] leading-[1.6]">
            {aboutText}
          </div>
        </div>

        {/* Legal & Social Row */}
        <div className="border-t border-white/25 py-[14px] pb-[22px] text-center text-[12.5px] text-[#D9C4E3]">
          <div className="space-x-2">
            {legalLinks.map((item: any, idx: number) => {
              const isInternal = item.url && item.url.startsWith('/')
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>|</span>}
                  {isInternal ? (
                    <Link
                      href={item.url}
                      className="text-white hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline"
                    >
                      {item.label}
                    </a>
                  )}
                </React.Fragment>
              )
            })}
          </div>

          <div className="mt-2">
            {copyrightText.split(/(ossa\.sudors\.in|ossaplussim\.com)/i).map((part: string, i: number) =>
              i % 2 === 1 ? (
                <a
                  key={i}
                  href="https://ossaplussim.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  ossaplussim.com
                </a>
              ) : (
                part
              ),
            )}
          </div>

          <div className="flex gap-2.5 justify-center mt-[12px]">
            {socialLinks.map((soc: any, idx: number) => (
              <a
                key={idx}
                href={soc.url || '#'}
                aria-label={soc.platform}
                className="w-[34px] h-[34px] rounded-md bg-white/15 text-white flex items-center justify-center transition-all duration-200 hover:bg-white/35 hover:scale-110 hover:shadow-lg"
              >
                {getSocialIcon(soc.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
