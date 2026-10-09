/**
 * Pure functions for invoice templating and formatting (No server/Payload imports)
 * Safe to import in both Client and Server Components.
 */

/**
 * Convert number to words in Indian numbering system (INR)
 * e.g., 6356.07 -> "Six Thousand Three Hundred Fifty Six Rupees and Seven Paise Only"
 */
export function numberToWordsINR(amount: number): string {
  const units = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ]
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  function convertLessThanOneThousand(n: number): string {
    if (n === 0) return ''
    let str = ''
    if (n >= 100) {
      str += units[Math.floor(n / 100)] + ' Hundred '
      n %= 100
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + ' '
      n %= 10
    }
    if (n > 0) {
      str += units[n] + ' '
    }
    return str.trim()
  }

  function convertNumber(num: number): string {
    if (num === 0) return 'Zero'
    let words = ''
    const crore = Math.floor(num / 10000000)
    num %= 10000000
    const lakh = Math.floor(num / 100000)
    num %= 100000
    const thousand = Math.floor(num / 1000)
    num %= 1000
    const remainder = num

    if (crore > 0) words += convertLessThanOneThousand(crore) + ' Crore '
    if (lakh > 0) words += convertLessThanOneThousand(lakh) + ' Lakh '
    if (thousand > 0) words += convertLessThanOneThousand(thousand) + ' Thousand '
    if (remainder > 0) words += convertLessThanOneThousand(remainder) + ' '
    return words.trim()
  }

  const rounded = Number(amount || 0).toFixed(2)
  const [rupeePart, paisePart] = rounded.split('.')
  const rupeeVal = parseInt(rupeePart, 10)
  const paiseVal = parseInt(paisePart, 10)

  let result = convertNumber(rupeeVal) + ' Rupees'
  if (paiseVal > 0) {
    result += ' and ' + convertLessThanOneThousand(paiseVal) + ' Paise'
  }
  return result + ' Only'
}

/**
 * Format Indian Rupee currency (e.g. ₹5,985.00)
 */
export function formatINR(amount: number): string {
  return `₹${Number(amount || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Format date in Indian style (DD/MM/YYYY, hh:mm a)
 * e.g., 31/08/2026, 05:11 pm
 */
export function formatInvoiceDate(dateInput?: string | Date | null): string {
  if (!dateInput) return ''
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12
  const formattedHours = String(hours).padStart(2, '0')

  return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${ampm}`
}

/**
 * HTML escaper for preventing XSS in generated HTML
 */
export function escapeHtml(str: any): string {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Prepare normalized invoice data from an Order object
 */
export function normalizeInvoiceData(order: any) {
  const invoiceNo = order.orderNumber || order.id || 'N/A'
  const invoiceDate = formatInvoiceDate(order.createdAt || new Date())

  // Payment status
  const rawPaymentStatus = order.paymentStatus || 'pending'
  const paymentStatus =
    rawPaymentStatus.toLowerCase() === 'paid'
      ? 'PAID'
      : rawPaymentStatus.toUpperCase()

  // Payment method
  let paymentMethod = 'Online (Razorpay)'
  if (order.paymentMethod === 'COD') {
    paymentMethod = 'Cash on Delivery (COD)'
  } else if (order.paymentMethod === 'ONLINE') {
    paymentMethod = 'Online (Razorpay)'
  } else if (order.paymentMethod === 'BANK_TRANSFER') {
    paymentMethod = 'Bank Transfer'
  } else if (order.paymentMethod) {
    paymentMethod = String(order.paymentMethod)
  }

  // Billing details
  const billing = order.billingAddress || order.shippingAddress || {}
  const billName = billing.fullName || order.user?.fullName || order.user?.name || 'Customer'

  const addressParts = [
    billing.addressLine1,
    billing.addressLine2,
    [billing.city, billing.state, billing.postalCode].filter(Boolean).join(', '),
    billing.country || 'India',
  ].filter(Boolean)
  const address = addressParts.join(', ') || 'N/A'

  // Items & pricing
  const items = (order.items || []).map((item: any) => {
    const qty = Number(item.quantity || 1)
    const unitPrice = Number(item.unitPrice || 0)
    const totalPrice = Number(item.totalPrice || unitPrice * qty)
    return {
      name: item.productName || item.product?.title || 'Product',
      quantity: qty,
      unitPrice,
      totalPrice,
    }
  })

  const rawSubtotal = items.reduce((acc: number, it: any) => acc + it.totalPrice, 0)
  const subtotal = Number(order.pricing?.subtotal ?? rawSubtotal)
  const discount = Number(order.pricing?.discount ?? 0)
  const taxableSubtotal = Math.max(0, subtotal - discount)

  const taxAmount = Number(
    order.pricing?.taxAmount ??
      (order.pricing?.totalAmount ? order.pricing.totalAmount - taxableSubtotal : Math.round(taxableSubtotal * 0.18))
  )
  const totalAmount = Number(order.pricing?.totalAmount ?? (taxableSubtotal + taxAmount))

  // Discount percentage label if discount exists
  let discountLabel = 'Less: Discounts'
  if (discount > 0 && subtotal > 0) {
    const percent = Math.round((discount / subtotal) * 100)
    if (percent > 0) {
      discountLabel = `Less: Discounts @${percent}%`
    }
  }

  // Transaction ref
  const transactionRef =
    order.payment ||
    (order.paymentMethod === 'COD' ? `COD-${invoiceNo}` : `REF-${invoiceNo}`)

  const amountInWords = numberToWordsINR(totalAmount)

  return {
    invoiceNo,
    invoiceDate,
    paymentStatus,
    paymentMethod,
    billName,
    address,
    gstin: 'N/A',
    items,
    subtotal,
    discount,
    discountLabel,
    taxableSubtotal,
    taxAmount,
    totalAmount,
    transactionRef,
    amountInWords,
  }
}

/**
 * Generate standalone HTML for invoice card
 */
export function generateInvoiceCardHtml(order: any): string {
  const data = normalizeInvoiceData(order)

  const itemsHtml = data.items
    .map(
      (item: any) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td class="center">${escapeHtml(item.quantity)}</td>
          <td class="right">${formatINR(item.totalPrice)}</td>
        </tr>`
    )
    .join('')

  const discountRowHtml =
    data.discount > 0
      ? `
        <tr>
          <td colspan="2">${escapeHtml(data.discountLabel)}</td>
          <td class="right">${formatINR(data.discount)}</td>
        </tr>`
      : ''

  const subtotalRowHtml = `
        <tr>
          <td colspan="2"><strong>Subtotal</strong></td>
          <td class="right"><strong>${formatINR(data.taxableSubtotal)}</strong></td>
        </tr>`

  const taxRowHtml =
    data.taxAmount > 0
      ? `
        <tr>
          <td colspan="2">IGST @ 18%</td>
          <td class="right">${formatINR(data.taxAmount)}</td>
        </tr>`
      : ''

  return `
  <div class="invoice-card" id="invoice">
    <!-- Header -->
    <div class="header">
      <h1>TAX INVOICE</h1>
      <div class="company-title">KNOWLEDGEBRIDGE INTERNATIONAL PRIVATE LIMITED</div>
      <div class="company-sub">506, Centre Point, J.B. Nagar, Andheri East, Mumbai – 400059, Maharashtra, India</div>
      <div class="company-sub"><strong>GSTIN:</strong> 27AAJCK8712H1ZA | <strong>PAN:</strong> AAJCK8712H</div>
      <div class="company-sub"><strong>Email:</strong> projects@knowledgebridgeint.com | <strong>Phone:</strong> +91 7208061448</div>
    </div>

    <hr class="divider" />

    <!-- Details Section -->
    <div class="details-grid">
      <div class="details-box">
        <h3>INVOICE DETAILS</h3>
        <table class="info-table">
          <tr>
            <td class="label">Invoice No</td>
            <td class="value">${escapeHtml(data.invoiceNo)}</td>
          </tr>
          <tr>
            <td class="label">Invoice Date</td>
            <td class="value">${escapeHtml(data.invoiceDate)}</td>
          </tr>
          <tr>
            <td class="label">Payment Status</td>
            <td class="value">${escapeHtml(data.paymentStatus)}</td>
          </tr>
          <tr>
            <td class="label">Payment Method</td>
            <td class="value">${escapeHtml(data.paymentMethod)}</td>
          </tr>
        </table>
      </div>

      <div class="details-box">
        <h3>BILLING DETAILS</h3>
        <table class="info-table">
          <tr>
            <td class="label">Bill Name</td>
            <td class="value">${escapeHtml(data.billName)}</td>
          </tr>
          <tr>
            <td class="label">Address</td>
            <td class="value">${escapeHtml(data.address)}</td>
          </tr>
          <tr>
            <td class="label">GSTIN</td>
            <td class="value">${escapeHtml(data.gstin)}</td>
          </tr>
        </table>
      </div>
    </div>

    <hr class="divider" />

    <!-- Payment / Purchase Details Table -->
    <div class="section-title">PAYMENT / PURCHASE DETAILS</div>
    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="center" style="width: 80px;">Qty.</th>
          <th class="right" style="width: 140px;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
        ${discountRowHtml}
        ${subtotalRowHtml}
        ${taxRowHtml}
        <tr class="total-row">
          <td colspan="2">TOTAL PAID</td>
          <td class="right">${formatINR(data.totalAmount)}</td>
        </tr>
      </tbody>
    </table>

    <!-- Reference ID -->
    <div class="ref-info">
      <div><strong>Transaction Reference ID:</strong> ${escapeHtml(data.transactionRef)}</div>
      <div><strong>Amount Paid:</strong> ${formatINR(data.totalAmount)}</div>
    </div>

    <hr class="divider" />

    <!-- Footer Notes -->
    <div class="footer-note">
      <p><strong>Amount in Words:</strong> ${escapeHtml(data.amountInWords)}</p>
      <p style="margin-top: 8px;"><strong>Thank you for your business.</strong></p>
      <p class="sign-off">This is a computer-generated invoice and does not require a physical signature.</p>
    </div>
  </div>`
}

/**
 * Generate full HTML document for the invoice page
 */
export function generateInvoiceHtml(
  order: any,
  options?: { autoPrint?: boolean; showActions?: boolean }
): string {
  const data = normalizeInvoiceData(order)
  const cardHtml = generateInvoiceCardHtml(order)
  const autoPrint = Boolean(options?.autoPrint)
  const showActions = options?.showActions ?? true

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tax Invoice - INV-${escapeHtml(data.invoiceNo)}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background-color: #f8fafc;
      color: #0f172a;
      padding: 30px 15px;
      font-size: 13px;
      line-height: 1.5;
    }
    .action-bar {
      max-width: 800px;
      margin: 0 auto 20px auto;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background-color: #5E007B;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s ease;
    }
    .btn:hover {
      background-color: #48005e;
    }
    .btn-secondary {
      background-color: #e2e8f0;
      color: #334155;
    }
    .btn-secondary:hover {
      background-color: #cbd5e1;
    }
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 40px 48px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #000000;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .company-title {
      font-size: 13px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .company-sub {
      font-size: 12px;
      color: #334155;
      margin-bottom: 4px;
    }
    .divider {
      border: none;
      border-top: 1px solid #cbd5e1;
      margin: 20px 0;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    .details-box h3 {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #000000;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .info-table td {
      border: 1px solid #000000;
      padding: 6px 10px;
    }
    .info-table td.label {
      font-weight: 700;
      width: 38%;
      background-color: #ffffff;
      color: #000000;
    }
    .info-table td.value {
      color: #000000;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #000000;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 12px;
    }
    .items-table th, .items-table td {
      border: 1px solid #000000;
      padding: 8px 12px;
      color: #000000;
    }
    .items-table th {
      font-weight: 700;
      text-align: left;
      background-color: #ffffff;
    }
    .items-table th.center, .items-table td.center {
      text-align: center;
    }
    .items-table th.right, .items-table td.right {
      text-align: right;
    }
    .items-table tr.total-row td {
      font-weight: 800;
    }
    .ref-info {
      margin-top: 16px;
      font-size: 12px;
      color: #000000;
      line-height: 1.6;
    }
    .ref-info strong {
      font-weight: 700;
    }
    .footer-note {
      margin-top: 24px;
      font-size: 12px;
      color: #000000;
      line-height: 1.6;
    }
    .footer-note p {
      margin-bottom: 4px;
    }
    .footer-note p.sign-off {
      margin-top: 12px;
      font-style: italic;
      color: #475569;
    }
    @media print {
      body {
        background-color: #ffffff;
        padding: 0;
      }
      .action-bar {
        display: none !important;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>

  ${
    showActions
      ? `<div class="action-bar">
    <a href="/profile/orders" class="btn btn-secondary">
      &larr; Back to Orders
    </a>
    <button onclick="window.print()" class="btn btn-secondary">
      &#128424; Print / Save as PDF
    </button>
    <a href="/api/orders/${encodeURIComponent(data.invoiceNo)}/invoice?download=pdf" class="btn" download="Tax Invoice - INV-${escapeHtml(data.invoiceNo)}.pdf">
      &#11015;&#65039; Download PDF
    </a>
  </div>`
      : ''
  }

  ${cardHtml}

  <script>
    ${autoPrint ? `window.addEventListener('load', function() { window.print(); });` : ''}
  </script>
</body>
</html>`
}
