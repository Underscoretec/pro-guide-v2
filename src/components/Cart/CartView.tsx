'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export const CartView: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    gst,
    total,
    clearCart,
    isHydrated,
  } = useCart()

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    address: '',
    notes: '',
  })

  const formatPrice = (amount: number) => {
    return `Rs ${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderSubmitted(true)
    setTimeout(() => {
      // Clear after submission
      // clearCart()
    }, 2000)
  }

  return (
    <div className="bg-white min-h-[70vh] py-10 md:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-[26px] md:text-[30px] font-bold text-ink tracking-tight mb-8 uppercase">
          CART
        </h1>

        {/* 3-Step Stepper Header */}
        <div className="relative mb-10 pb-4 border-b border-[#E5E7EB]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 - Active */}
            <div className="relative pb-3">
              <div className="font-bold text-[13px] md:text-[14px] text-ink uppercase tracking-wider">
                01 SHOPPING BAG
              </div>
              <div className="text-[12px] md:text-[12.5px] text-muted mt-0.5">
                Manage Your Items List
              </div>
              {/* Active Dark Indicator Underline */}
              <div className="absolute left-0 bottom-[-17px] w-full h-[2.5px] bg-ink" />
            </div>

            {/* Step 2 */}
            <Link href="/checkout" className="relative pb-3 block group">
              <div className="font-semibold text-[13px] md:text-[14px] text-[#4B5563] uppercase tracking-wider group-hover:text-purple transition-colors">
                02 SHIPPING AND CHECKOUT
              </div>
              <div className="text-[12px] md:text-[12.5px] text-muted mt-0.5">
                Checkout Your Items List
              </div>
            </Link>

            {/* Step 3 */}
            <div className="relative pb-3">
              <div className="font-semibold text-[13px] md:text-[14px] text-[#4B5563] uppercase tracking-wider">
                03 CONFIRMATION
              </div>
              <div className="text-[12px] md:text-[12.5px] text-muted mt-0.5">
                Review And Submit Your Order
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {isHydrated && items.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#D1D5DB] rounded-[8px] my-6">
            <div className="text-[48px] mb-3 text-muted">&#128722;</div>
            <h2 className="text-[20px] font-bold text-ink mb-2">
              Your shopping bag is empty
            </h2>
            <p className="text-muted text-[14px] max-w-[420px] mx-auto mb-6">
              Looks like you haven&apos;t added any simulation models to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#4A148C] hover:bg-[#3B0D70] text-white px-6 py-3 rounded-[4px] font-bold text-[13px] uppercase tracking-wider transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Main 2-Column Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Section: Shopping Bag Table (lg:col-span-8) */}
            <div className="lg:col-span-8">
              {/* Desktop Table Headers */}
              <div className="hidden md:grid grid-cols-12 pb-3.5 border-b border-[#E5E7EB] text-[12px] font-bold text-[#4B5563] uppercase tracking-wider">
                <div className="col-span-5">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-3 text-center">QUANTITY</div>
                <div className="col-span-2 text-right pr-6">SUBTOTAL</div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E5E7EB]">
                {items.map((item) => {
                  const lineTotal = (item.price || 0) * (item.quantity || 1)
                  return (
                    <div
                      key={item.id}
                      className="py-5 md:py-6 grid grid-cols-1 md:grid-cols-12 items-center gap-4"
                    >
                      {/* Product Column */}
                      <div className="md:col-span-5 flex items-center gap-4">
                        <div className="relative w-[84px] h-[84px] md:w-[92px] md:h-[92px] bg-[#F4F4F6] shrink-0 rounded-[2px] overflow-hidden border border-[#EBEBEF]">
                          <Image
                            src={item.imageUrl || '/images/prod1.jpg'}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="min-w-0 pr-2">
                          <h3 className="text-[14px] md:text-[15px] font-semibold text-ink leading-snug">
                            {item.name}
                          </h3>
                          <div className="md:hidden text-[13px] text-muted mt-1">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>

                      {/* Price Column */}
                      <div className="hidden md:block md:col-span-2 text-center text-[13.5px] text-[#6B7280]">
                        {formatPrice(item.price)}
                      </div>

                      {/* Quantity Column */}
                      <div className="md:col-span-3 flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-[12px] font-bold text-muted uppercase">
                          Qty:
                        </span>
                        <div className="flex items-center border border-[#D1D5DB] rounded-[3px] bg-white h-[36px] w-[96px] justify-between px-2.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-[#6B7280] hover:text-ink text-[16px] font-semibold leading-none cursor-pointer w-5 text-center transition-colors"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            &minus;
                          </button>
                          <span className="text-[13.5px] font-semibold text-ink select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-[#6B7280] hover:text-ink text-[16px] font-semibold leading-none cursor-pointer w-5 text-center transition-colors"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            &#43;
                          </button>
                        </div>

                        {/* Mobile subtotal and delete */}
                        <div className="md:hidden flex items-center gap-3">
                          <span className="text-[14px] font-bold text-ink">
                            {formatPrice(lineTotal)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#9CA3AF] hover:text-[#EF4444] text-[20px] leading-none cursor-pointer p-1"
                            aria-label={`Remove ${item.name}`}
                          >
                            &times;
                          </button>
                        </div>
                      </div>

                      {/* Subtotal & Remove Column (Desktop) */}
                      <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4 pr-1">
                        <span className="text-[14px] font-bold text-ink whitespace-nowrap">
                          {formatPrice(lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9CA3AF] hover:text-[#EF4444] text-[20px] leading-none transition-colors cursor-pointer p-1"
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Actions row: Continue Shopping & Clear Bag */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB]">
                <Link
                  href="/products"
                  className="text-[13px] font-semibold text-purple hover:text-purple-d flex items-center gap-1.5 transition-colors"
                >
                  &larr; Continue Shopping
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[12.5px] text-muted hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Right Section: Cart Totals Box (lg:col-span-4) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="border border-[#E5E7EB] rounded-[4px] p-6 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                <h2 className="text-[13.5px] font-bold text-ink uppercase tracking-wider mb-5 pb-3 border-b border-[#E5E7EB]">
                  CART TOTALS
                </h2>

                <div className="space-y-3.5 text-[13px]">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <span className="font-semibold text-[#4B5563] uppercase tracking-wide text-[12px]">
                      SUBTOTAL
                    </span>
                    <span className="font-medium text-ink">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <span className="font-semibold text-[#4B5563] uppercase tracking-wide text-[12px]">
                      SHIPPING
                    </span>
                    <span className="font-medium text-ink">
                      {formatPrice(shipping)}
                    </span>
                  </div>

                  {/* GST (18%) */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <span className="font-semibold text-[#4B5563] uppercase tracking-wide text-[12px]">
                      GST (18%)
                    </span>
                    <span className="font-medium text-ink">
                      {formatPrice(gst)}
                    </span>
                  </div>

                  {/* Grand Total */}
                  <div className="flex items-center justify-between pt-1 pb-1 text-[13.5px]">
                    <span className="font-bold text-ink uppercase tracking-wide">
                      TOTAL
                    </span>
                    <span className="font-bold text-ink text-[15px]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <Link
                href="/checkout"
                className="mt-4 w-full bg-[#4A148C] hover:bg-[#3B0D70] active:scale-[0.99] text-white py-3.5 px-6 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center block"
              >
                PROCEED TO CHECKOUT
              </Link>

              <div className="mt-3.5 text-center text-muted text-[11.5px] flex items-center justify-center gap-1.5">
                <span>&#128274; Secure checkout powered by OSSA+ ProGuide</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal / Drawer */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-[8px] max-w-[540px] w-full p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setCheckoutModalOpen(false)
                setOrderSubmitted(false)
              }}
              className="absolute top-4 right-4 text-muted hover:text-ink text-2xl font-light cursor-pointer"
            >
              &times;
            </button>

            {orderSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto text-2xl mb-4 font-bold">
                  ✓
                </div>
                <h3 className="text-[20px] font-bold text-ink mb-2">
                  Enquiry / Order Received!
                </h3>
                <p className="text-muted text-[13.5px] mb-6 leading-relaxed">
                  Thank you, <strong>{formData.name || 'Doctor'}</strong>. Our simulation
                  specialist will reach out with the formal institutional quotation and
                  dispatch details within 2 hours.
                </p>
                <div className="bg-[#F8F9FA] border border-line rounded-[6px] p-4 text-left text-[12.5px] space-y-1 mb-6">
                  <div><strong>Total Amount:</strong> {formatPrice(total)}</div>
                  <div><strong>Items:</strong> {items.map((i) => `${i.name} (×${i.quantity})`).join(', ')}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutModalOpen(false)
                    setOrderSubmitted(false)
                  }}
                  className="bg-[#4A148C] hover:bg-[#3B0D70] text-white px-6 py-2.5 rounded-[4px] font-bold text-[13px] uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-[18px] font-bold text-ink mb-1 uppercase tracking-wide">
                  Complete Your Order Details
                </h3>
                <p className="text-muted text-[12.5px] mb-5">
                  Confirm your shipping and billing details to proceed with dispatch or direct institutional invoicing.
                </p>

                <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[12px] font-semibold text-ink uppercase tracking-wider mb-1">
                      Full Name / Doctor Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-line rounded-[4px] px-3 py-2 text-[13.5px] focus:outline-none focus:border-purple"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-ink uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="doctor@hospital.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-line rounded-[4px] px-3 py-2 text-[13.5px] focus:outline-none focus:border-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-ink uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-line rounded-[4px] px-3 py-2 text-[13.5px] focus:outline-none focus:border-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-ink uppercase tracking-wider mb-1">
                      Hospital / Institution / Department
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dept of ENT, AIIMS / Medical College"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full border border-line rounded-[4px] px-3 py-2 text-[13.5px] focus:outline-none focus:border-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-ink uppercase tracking-wider mb-1">
                      Shipping / Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Complete hospital or clinic shipping address with PIN code"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full border border-line rounded-[4px] px-3 py-2 text-[13.5px] focus:outline-none focus:border-purple"
                    />
                  </div>

                  <div className="pt-2 border-t border-line flex items-center justify-between">
                    <div>
                      <span className="text-[11.5px] text-muted block">Total to Pay / Invoice:</span>
                      <span className="text-[16px] font-bold text-ink">{formatPrice(total)}</span>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#4A148C] hover:bg-[#3B0D70] text-white px-6 py-2.5 rounded-[4px] font-bold text-[13px] uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Submit Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CartView
