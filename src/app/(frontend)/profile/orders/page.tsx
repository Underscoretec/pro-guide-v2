import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth/session'
import { getUserOrders } from '@/lib/orders/actions'
import {
  FiPackage,
  FiShoppingBag,
  FiCalendar,
  FiClock,
  FiCreditCard,
  FiTruck,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
} from 'react-icons/fi'
import { InvoiceDownloadButton } from '@/components/Orders/InvoiceDownloadButton'

export const metadata: Metadata = { title: 'My Orders | ProGuide' }

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const orders = await getUserOrders()

  return (
    <div className="bg-white rounded-[8px] shadow-sm border border-line min-h-[400px] overflow-hidden">
      <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-line bg-white">
        <div className="flex items-center gap-2.5">
          <FiPackage className="text-purple w-5 h-5" />
          <h1 className="text-[19px] sm:text-[20px] text-ink font-bold">My Orders</h1>
        </div>
        <span className="text-[12px] font-bold text-purple bg-tint px-2.5 py-0.5 rounded-full border border-purple/20">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="px-8 py-16 text-center">
          <FiShoppingBag className="w-14 h-14 text-purple/30 mx-auto mb-3" />
          <p className="text-[14px] text-muted mb-5">You haven’t placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-purple hover:bg-purple-d text-white text-[13px] font-bold px-6 py-2.5 rounded-[6px] shadow-sm hover:shadow transition-all"
          >
            <span>Start Shopping</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-line">
          {orders.map((order: any) => {
            const dateStr = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : ''
            return (
              <div key={order.id} className="p-6 sm:p-8 hover:bg-card/20 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line/60 mb-4">
                  <div>
                    <div className="font-bold text-[15px] text-ink flex items-center gap-1.5">
                      <FiPackage className="w-4 h-4 text-purple" />
                      <span>{order.orderNumber}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[12px] text-muted mt-1">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>Placed on {dateStr}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple/10 text-purple border border-purple/20">
                      <FiCreditCard className="w-3 h-3" />
                      <span>{order.paymentMethod || 'ONLINE'}</span>
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${order.orderStatus === 'pending_payment' ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-green/10 text-green border border-green/20'}`}>
                      <FiClock className="w-3 h-3" />
                      <span>{(order.orderStatus || 'pending_payment').replace(/_/g, ' ')}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4 bg-card/40 rounded-[6px] p-3.5 border border-line/50">
                  {(order.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-[13.5px]">
                      <span className="text-ink font-medium flex items-center gap-2">
                        <FiCheckCircle className="w-3.5 h-3.5 text-purple shrink-0" />
                        <span>{item.productName}</span>
                        <span className="text-muted text-[12px]">× {item.quantity}</span>
                      </span>
                      <span className="font-bold text-ink">
                        Rs{' '}
                        {(item.totalPrice || 0).toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[13px]">
                  <div className="inline-flex items-center gap-1.5 text-muted text-[12.5px]">
                    <FiTruck className="w-4 h-4 text-purple shrink-0" />
                    <span>
                      Shipping to:{' '}
                      <strong className="text-ink font-semibold">
                        {order.shippingAddress?.fullName}
                      </strong>
                      {order.shippingAddress?.city ? `, ${order.shippingAddress.city}` : ''}
                    </span>
                  </div>
                  <div className="font-extrabold text-[15.5px] text-purple-d">
                    Total: Rs{' '}
                    {(order.pricing?.totalAmount || 0).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3 border-t border-line/60">
                  <div className="flex items-center gap-2.5">
                    <InvoiceDownloadButton order={order} />
                    <Link
                      href={`/api/orders/${order.id || order.orderNumber}/invoice`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-purple hover:text-purple-d hover:bg-tint px-3 py-1.5 rounded-[5px] border border-purple/20 transition-all"
                    >
                      <FiFileText className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </Link>
                  </div>
                  <span className="text-[11.5px] text-muted">
                    GST Tax Invoice
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
