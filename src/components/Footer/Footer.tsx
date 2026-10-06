import React from 'react'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4A148C] text-[#E3D7F2] text-[13.5px] mt-10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.2fr_1.2fr] gap-[34px] py-[44px] pb-[26px]">
          {/* Col 1: Quick Links */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              Quick Links
            </h4>
            <div className="space-y-[3px]">
              <Link href="/products.html" className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors">
                Buy Now
              </Link>
              <a
                href="https://pro-guide.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors"
              >
                Cart
              </a>
              <Link href="/resources.html" className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors">
                Resources
              </Link>
              <Link
                href="/customized-model.html"
                className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors"
              >
                Get Your Own Customized Model
              </Link>
              <a
                href="https://pro-guide.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#E7D8EE] hover:text-white hover:underline transition-colors"
              >
                Login/Register
              </a>
            </div>
          </div>

          {/* Col 2: Indian Queries */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              Contacts for Indian Queries
            </h4>
            <p className="leading-relaxed">
              <strong className="text-white font-bold">Shelly Sequeira</strong>
              <br />
              Email :{' '}
              <a
                href="mailto:shelly@knowledgebridgeint.com"
                className="inline text-[#E7D8EE] hover:text-white hover:underline"
              >
                shelly@knowledgebridgeint.com
              </a>
              <br />
              Mobile : 9220522294
            </p>
          </div>

          {/* Col 3: International Queries */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              Contacts for International Queries
            </h4>
            <p className="leading-relaxed">
              <strong className="text-white font-bold">Shashikumar Sambhoo</strong>
              <br />
              Email:{' '}
              <a
                href="mailto:svs@knowledgebridgeint.com"
                className="inline text-[#E7D8EE] hover:text-white hover:underline"
              >
                svs@knowledgebridgeint.com
              </a>
              <br />
              Mobile : +971 507863903 | +91 9820454543
            </p>
          </div>

          {/* Col 4: Address */}
          <div>
            <h4 className="text-white text-[13px] tracking-[1.4px] uppercase mb-3 border-b-2 border-[#E67E22]/55 pb-2 font-bold">
              Address
            </h4>
            <p className="leading-relaxed">
              506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East).
              Mumbai-400059, Maharashtra, India
            </p>
          </div>
        </div>

        {/* Brand Row */}
        <div className="border-t border-white/25 py-5 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[26px] items-center">
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo_white.svg"
              alt="ProGuide"
              className="h-[44px] w-auto block"
            />
          </div>
          <div className="text-[12.5px] text-[#D9C4E3] leading-[1.6]">
            ProGuide is dedicated to equipping individuals, businesses, and organizations with the skills
            needed for the future by providing accessible and affordable high-quality education. Through collaborations with
            leading institutions and industry experts, ProGuide offers a wide range of courses, certifications, and
            professional programs designed to enhance career growth and business success.
          </div>
        </div>

        {/* Legal & Social Row */}
        <div className="border-t border-white/25 py-[14px] pb-[22px] text-center text-[12.5px] text-[#D9C4E3]">
          <div className="space-x-2">
            <a href="https://pro-guide.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="https://pro-guide.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              Terms and Condition
            </a>
            <span>|</span>
            <a href="https://pro-guide.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              Shipping Policy
            </a>
            <span>|</span>
            <a href="https://pro-guide.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              Cancellation and Return Policy
            </a>
          </div>

          <div className="mt-2">
            &copy; 2026. All Rights Reserved &middot; 3D simulation models by OSSA PLUS SIMULATION LLP —{' '}
            <a href="https://ossa.sudors.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              ossa.sudors.in
            </a>
          </div>

          <div className="flex gap-2 justify-center mt-[10px]">
            <a
              href="#"
              aria-label="Facebook"
              className="w-[30px] h-[30px] rounded-[6px] bg-white text-purple flex items-center justify-center font-bold text-[13px] hover:bg-tint transition-colors"
            >
              f
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-[30px] h-[30px] rounded-[6px] bg-white text-purple flex items-center justify-center font-bold text-[13px] hover:bg-tint transition-colors"
            >
              in
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-[30px] h-[30px] rounded-[6px] bg-white text-purple flex items-center justify-center font-bold text-[13px] hover:bg-tint transition-colors"
            >
              X
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-[30px] h-[30px] rounded-[6px] bg-white text-purple flex items-center justify-center font-bold text-[13px] hover:bg-tint transition-colors"
            >
              &#9658;
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
