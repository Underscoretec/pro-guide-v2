import React from 'react'
import Link from 'next/link'
import { roboto } from '@/font'

const ShippingPolicy = () => {
  return (
    <div className={`${roboto.className} bg-[#F8F8FA] min-h-screen flex flex-col`}>
      {/* Hero Banner Section */}
      <div className="phero" style={{ padding: '18px 0' }}>
        <div className="wrap max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="crumb text-xs text-[#D9BEE6] mb-1">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>{' '}
            / <span className="text-white font-medium">Shipping Policy</span>
          </div>
          <h1 className="text-[clamp(22px,2.6vw,30px)] font-bold text-white leading-tight">
            SHIPPING POLICY
          </h1>
          <p className="text-[#E4D3EC] max-w-[820px] mt-1 text-[13.5px] sm:text-[14px]">
            Please review our shipping guidelines, processing timelines, and domestic & international delivery estimates.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex-1 w-full">
        <div className="bg-white border border-[#E3E5E9] rounded-sm p-4 sm:p-6 md:p-7 shadow-xs space-y-4 text-[#374151]">
          {/* Order Processing */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              ORDER PROCESSING
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              All orders are processed within 20-30 business days (excluding weekends and holidays) after
              receiving your order confirmation email. You will receive another notification when your order
              has shipped.
            </p>
          </div>

          {/* Domestic Shipping Rates and Estimates */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              Domestic Shipping Rates and Estimates
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>
          </div>

          {/* Local Delivery */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              Local delivery
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              We do not offer Local delivery.
            </p>
          </div>

          {/* International Shipping */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              International Shipping
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              We offer international shipping to countries where FedEx, UPS, and Indian postal services are
              available.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              Your order may be subject to import duties and taxes (including VAT), which are incurred once a
              shipment reaches your destination country.{' '}
              <span className="font-bold text-ink">KnowledgeBridge International Private Limited</span> is
              not responsible for these charges if they are applied and are your responsibility as the customer.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ShippingPolicy
