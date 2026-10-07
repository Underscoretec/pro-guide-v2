import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  footer?: any
}

export const Footer: React.FC<FooterProps> = ({ footer }) => {
  const logoSrc = footer?.logo?.url || footer?.logoUrl || '/images/logo_white.svg'

  const quickLinksTitle = footer?.quickLinksTitle || 'Quick Links'
  const defaultQuickLinks = [
    { label: 'Buy Now', url: '/products.html' },
    { label: 'Cart', url: 'https://pro-guide.in/' },
    { label: 'Resources', url: '/resources' },
    { label: 'Get Your Own Customized Model', url: '/customized-model' },
    { label: 'Login/Register', url: 'https://pro-guide.in/' },
  ]
  const quickLinks = footer?.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : defaultQuickLinks

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
    { label: 'Privacy Policy', url: 'https://pro-guide.in/' },
    { label: 'Terms and Condition', url: 'https://pro-guide.in/' },
    { label: 'Shipping Policy', url: 'https://pro-guide.in/' },
    { label: 'Cancellation and Return Policy', url: 'https://pro-guide.in/' },
  ]
  const legalLinks = footer?.legalLinks && footer.legalLinks.length > 0 ? footer.legalLinks : defaultLegalLinks

  const copyrightText =
    footer?.copyright ||
    '© 2026. All Rights Reserved · 3D simulation models by OSSA PLUS SIMULATION LLP — ossa.sudors.in'

  const defaultSocialLinks = [
    { platform: 'f', url: '#' },
    { platform: 'in', url: '#' },
    { platform: 'X', url: '#' },
    { platform: '►', url: '#' },
  ]
  const socialLinks = footer?.socialLinks && footer.socialLinks.length > 0 ? footer.socialLinks : defaultSocialLinks

  return (
    <footer className="bg-[#4A148C] text-[#E3D7F2] text-[13.5px] mt-10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-[34px] py-[44px] pb-[26px]">
          {/* Col 1: Quick Links */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              {quickLinksTitle}
            </h4>
            <div className="space-y-[3px]">
              {quickLinks.map((item: any, idx: number) => (
                <Link
                  key={idx}
                  href={item.url || '#'}
                  className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors"
                >
                  {item.label}
                </Link>
              ))}
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
            {legalLinks.map((item: any, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>|</span>}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </div>

          <div className="mt-2">
            {copyrightText}
          </div>

          <div className="flex gap-2 justify-center mt-[10px]">
            {socialLinks.map((soc: any, idx: number) => (
              <a
                key={idx}
                href={soc.url || '#'}
                aria-label={soc.platform}
                className="w-[30px] h-[30px] rounded-[6px] bg-white text-purple flex items-center justify-center font-bold text-[13px] hover:bg-tint transition-colors"
              >
                {soc.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
