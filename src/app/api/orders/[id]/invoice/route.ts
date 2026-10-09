import { NextRequest, NextResponse } from 'next/server'
import { getOrderForInvoice, generateInvoiceHtml } from '@/lib/orders/invoice'
import { generateInvoicePdfBuffer } from '@/lib/orders/invoice-pdf'
import { getCurrentUser } from '@/lib/auth/session'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    if (!id) {
      return new NextResponse('Order ID is required', { status: 400 })
    }

    const user = await getCurrentUser()
    if (!user) {
      // Redirect to sign in with return url
      const signinUrl = new URL('/sign-in', request.url)
      signinUrl.searchParams.set('redirect', `/api/orders/${id}/invoice`)
      return NextResponse.redirect(signinUrl)
    }

    const order = await getOrderForInvoice(id)
    if (!order) {
      return new NextResponse('Order not found or access denied', { status: 404 })
    }

    const searchParams = request.nextUrl.searchParams
    const isPdfDownload =
      searchParams.get('download') === 'pdf' || searchParams.get('format') === 'pdf'
    const invoiceNumber = order.orderNumber || order.id || id

    // If PDF download requested, stream binary PDF
    if (isPdfDownload) {
      const pdfBuffer = generateInvoicePdfBuffer(order)
      return new NextResponse(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="Tax Invoice - INV-${invoiceNumber}.pdf"`,
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      })
    }

    const isAutoPrint = searchParams.get('download') === 'true'
    const html = generateInvoiceHtml(order, {
      autoPrint: isAutoPrint,
      showActions: true,
    })

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Content-Disposition': `inline; filename="Tax_Invoice_${invoiceNumber}.html"`,
      },
    })
  } catch (error: any) {
    console.error('Failed to generate invoice:', error)
    return new NextResponse('Failed to generate invoice', { status: 500 })
  }
}
