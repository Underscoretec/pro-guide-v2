import React from 'react'
import Link from 'next/link'
import { roboto } from '@/font'

const RefundPolicy = () => {
  return (
    <div className={`${roboto.className} bg-[#F8F8FA] min-h-screen flex flex-col`}>
      {/* Hero Banner Section */}
      <div className="phero" style={{ padding: '18px 0' }}>
        <div className="wrap max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="crumb text-xs text-[#D9BEE6] mb-1">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>{' '}
            / <span className="text-white font-medium">Cancellation and Return Policy</span>
          </div>
          <h1 className="text-[clamp(22px,2.6vw,30px)] font-bold text-white leading-tight">
            CANCELLATION, REFUND AND RETURN POLICY
          </h1>
          <p className="text-[#E4D3EC] max-w-[820px] mt-1 text-[13.5px] sm:text-[14px]">
            Please review our cancellation, refund, and return guidelines for orders placed on ProGuide.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex-1 w-full">
        <div className="bg-white border border-[#E3E5E9] rounded-sm p-4 sm:p-6 md:p-7 shadow-xs space-y-4 text-[#374151]">
          {/* No cancellation or return policy */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              No cancellation or return policy
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              Thank you for your purchase. We hope you are happy with your purchase. However, please note that all
              sales are final. Once an order is placed and payment is processed, we do not offer cancellations,
              refunds, or returns on any of our products or services under normal circumstances.
            </p>
          </div>

          {/* Contact Support */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              Contact Us
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              If you have any questions or queries about your order, please contact our support team at{' '}
              <a
                href="mailto:skills@knowledgebridgeint.com"
                className="text-purple hover:underline font-semibold"
              >
                skills@knowledgebridgeint.com
              </a>{' '}
              or call{' '}
              <a href="tel:+912245360000" className="text-purple hover:underline font-semibold">
                +91-22-45360000
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export { RefundPolicy, RefundPolicy as CancellationPolicy }
export default RefundPolicy
