import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth/session'
import { getUserOrders } from '@/lib/orders/actions'

export const metadata: Metadata = { title: 'My Orders | ProGuide' }

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const orders = await getUserOrders()

  return (
    <div className="bg-white rounded-[6px] shadow-sm min-h-[400px]">
      <div className="flex items-center justify-between px-8 py-5 border-b border-line">
        <h1 className="text-[20px] text-ink font-semibold">My Orders</h1>
        <span className="text-[13px] text-muted">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="px-8 py-14 text-center">
          <p className="text-[14px] text-muted mb-4">You haven’t placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-block bg-[#5E007B] hover:bg-[#430D60] text-white text-[13px] font-bold px-6 py-2.5 rounded-[4px] uppercase tracking-wider transition-colors"
          >
            Start Shopping
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
              <div key={order.id} className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line/60 mb-4">
                  <div>
                    <div className="font-bold text-[15px] text-ink">{order.orderNumber}</div>
                    <div className="text-[12px] text-muted mt-0.5">Placed on {dateStr}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple/10 text-purple">
                      {order.paymentMethod || 'COD'}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {order.orderStatus || 'confirmed'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {(order.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-[13.5px]">
                      <span className="text-ink font-medium">
                        {item.productName}{' '}
                        <span className="text-muted text-[12px]">× {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-ink">
                        Rs {(item.totalPrice || 0).toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-line/60 text-[13px]">
                  <div className="text-muted text-[12px]">
                    Shipping to:{' '}
                    <span className="text-ink font-medium">
                      {order.shippingAddress?.fullName}
                    </span>
                    {order.shippingAddress?.city ? `, ${order.shippingAddress.city}` : ''}
                  </div>
                  <div className="font-bold text-[15px] text-ink">
                    Total: Rs{' '}
                    {(order.pricing?.totalAmount || 0).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
