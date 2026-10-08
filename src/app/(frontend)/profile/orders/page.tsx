import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My Orders | ProGuide' }

// TODO: list real orders once an Orders collection exists.
export default function OrdersPage() {
  return (
    <div className="bg-white rounded-[6px] shadow-sm min-h-[400px]">
      <h1 className="text-[20px] text-ink px-8 py-5 border-b border-line">Orders</h1>
      <p className="px-8 py-8 text-[14px] text-muted">You haven’t placed any orders yet.</p>
    </div>
  )
}
