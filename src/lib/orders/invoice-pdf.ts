import { jsPDF } from 'jspdf'
import { normalizeInvoiceData } from './invoice-template'

/**
 * Generate binary Buffer of Tax Invoice PDF using jsPDF
 */
export function generateInvoicePdfBuffer(order: any): Buffer {
  const data = normalizeInvoiceData(order)

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  })

  const pageWidth = 595.28
  const margin = 44
  const contentWidth = pageWidth - margin * 2

  // --- Header ---
  let y = 48
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(0, 0, 0)
  doc.text('TAX INVOICE', pageWidth / 2, y, { align: 'center' })

  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('KNOWLEDGEBRIDGE INTERNATIONAL PRIVATE LIMITED', pageWidth / 2, y, { align: 'center' })

  y += 14
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(51, 65, 85)
  doc.text(
    '506, Centre Point, J.B. Nagar, Andheri East, Mumbai – 400059, Maharashtra, India',
    pageWidth / 2,
    y,
    { align: 'center' }
  )

  y += 12
  doc.text('GSTIN: 27AAJCK8712H1ZA | PAN: AAJCK8712H', pageWidth / 2, y, { align: 'center' })

  y += 12
  doc.text(
    'Email: projects@knowledgebridgeint.com | Phone: +91 7208061448',
    pageWidth / 2,
    y,
    { align: 'center' }
  )

  // --- Divider ---
  y += 16
  doc.setDrawColor(203, 213, 225)
  doc.setLineWidth(1)
  doc.line(margin, y, pageWidth - margin, y)

  // --- Details Section (2 Columns) ---
  y += 20
  const colGap = 16
  const colWidth = (contentWidth - colGap) / 2
  const col1X = margin
  const col2X = margin + colWidth + colGap

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(0, 0, 0)
  doc.text('INVOICE DETAILS', col1X, y)
  doc.text('BILLING DETAILS', col2X, y)

  y += 8
  const tableStartY = y
  const rowH = 18
  const labelW = colWidth * 0.4
  const valW = colWidth * 0.6

  doc.setDrawColor(0, 0, 0)
  doc.setLineWidth(0.75)

  // Left Table: Invoice Details
  const invRows = [
    ['Invoice No', data.invoiceNo],
    ['Invoice Date', data.invoiceDate],
    ['Payment Status', data.paymentStatus],
    ['Payment Method', data.paymentMethod],
  ]

  let curY = tableStartY
  invRows.forEach(([lbl, val]) => {
    doc.rect(col1X, curY, labelW, rowH)
    doc.rect(col1X + labelW, curY, valW, rowH)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(0, 0, 0)
    doc.text(lbl, col1X + 6, curY + 12)

    doc.setFont('helvetica', 'normal')
    doc.text(String(val), col1X + labelW + 6, curY + 12)
    curY += rowH
  })

  // Right Table: Billing Details
  let billY = tableStartY
  const billRows = [
    ['Bill Name', data.billName],
    ['Address', data.address],
    ['GSTIN', data.gstin],
  ]

  billRows.forEach(([lbl, val]) => {
    const isAddress = lbl === 'Address'
    // Calculate required height for address if wrapping
    const textLines = isAddress ? doc.splitTextToSize(String(val), valW - 12) : [String(val)]
    const dynamicH = isAddress ? Math.max(rowH * 2, textLines.length * 11 + 7) : rowH

    doc.rect(col2X, billY, labelW, dynamicH)
    doc.rect(col2X + labelW, billY, valW, dynamicH)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(0, 0, 0)
    doc.text(lbl, col2X + 6, billY + 12)

    doc.setFont('helvetica', 'normal')
    if (isAddress) {
      doc.text(textLines, col2X + labelW + 6, billY + 12)
    } else {
      doc.text(String(val), col2X + labelW + 6, billY + 12)
    }
    billY += dynamicH
  })

  y = Math.max(curY, billY) + 16

  // --- Divider ---
  doc.setDrawColor(203, 213, 225)
  doc.setLineWidth(1)
  doc.line(margin, y, pageWidth - margin, y)

  // --- Payment / Purchase Details Table ---
  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(0, 0, 0)
  doc.text('PAYMENT / PURCHASE DETAILS', margin, y)

  y += 10
  const qtyW = 55
  const amtW = 95
  const descW = contentWidth - qtyW - amtW

  // Header row
  doc.setDrawColor(0, 0, 0)
  doc.setLineWidth(0.75)
  doc.rect(margin, y, descW, rowH)
  doc.rect(margin + descW, y, qtyW, rowH)
  doc.rect(margin + descW + qtyW, y, amtW, rowH)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.text('Description', margin + 6, y + 12)
  doc.text('Qty.', margin + descW + qtyW / 2, y + 12, { align: 'center' })
  doc.text('Amount', margin + contentWidth - 6, y + 12, { align: 'right' })

  y += rowH

  // Items rows
  data.items.forEach((item: any) => {
    const itemLines = doc.splitTextToSize(item.name, descW - 12)
    const itemH = Math.max(rowH * 1.4, itemLines.length * 11 + 7)

    doc.rect(margin, y, descW, itemH)
    doc.rect(margin + descW, y, qtyW, itemH)
    doc.rect(margin + descW + qtyW, y, amtW, itemH)

    doc.setFont('helvetica', 'normal')
    doc.text(itemLines, margin + 6, y + 12)
    doc.text(String(item.quantity || 1), margin + descW + qtyW / 2, y + 13, { align: 'center' })
    doc.text(
      `Rs ${Number(item.totalPrice).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      margin + contentWidth - 6,
      y + 13,
      { align: 'right' }
    )
    y += itemH
  })

  // Discount row (if any)
  if (data.discount > 0) {
    doc.rect(margin, y, descW + qtyW, rowH)
    doc.rect(margin + descW + qtyW, y, amtW, rowH)
    doc.setFont('helvetica', 'normal')
    doc.text(data.discountLabel, margin + 6, y + 12)
    doc.text(
      `Rs ${Number(data.discount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      margin + contentWidth - 6,
      y + 12,
      { align: 'right' }
    )
    y += rowH
  }

  // Subtotal row
  doc.rect(margin, y, descW + qtyW, rowH)
  doc.rect(margin + descW + qtyW, y, amtW, rowH)
  doc.setFont('helvetica', 'bold')
  doc.text('Subtotal', margin + 6, y + 12)
  doc.text(
    `Rs ${Number(data.taxableSubtotal).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    margin + contentWidth - 6,
    y + 12,
    { align: 'right' }
  )
  y += rowH

  // Tax row (if any)
  if (data.taxAmount > 0) {
    doc.rect(margin, y, descW + qtyW, rowH)
    doc.rect(margin + descW + qtyW, y, amtW, rowH)
    doc.setFont('helvetica', 'normal')
    doc.text('IGST @ 18%', margin + 6, y + 12)
    doc.text(
      `Rs ${Number(data.taxAmount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      margin + contentWidth - 6,
      y + 12,
      { align: 'right' }
    )
    y += rowH
  }

  // Total row
  doc.rect(margin, y, descW + qtyW, rowH)
  doc.rect(margin + descW + qtyW, y, amtW, rowH)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL PAID', margin + 6, y + 12)
  doc.text(
    `Rs ${Number(data.totalAmount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    margin + contentWidth - 6,
    y + 12,
    { align: 'right' }
  )
  y += rowH

  // --- Reference ID & Amount Paid ---
  y += 18
  doc.setFont('helvetica', 'bold')
  doc.text('Transaction Reference ID: ', margin, y)
  doc.setFont('helvetica', 'normal')
  doc.text(String(data.transactionRef), margin + 125, y)

  y += 14
  doc.setFont('helvetica', 'bold')
  doc.text('Amount Paid: ', margin, y)
  doc.setFont('helvetica', 'normal')
  doc.text(
    `Rs ${Number(data.totalAmount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    margin + 65,
    y
  )

  // --- Divider ---
  y += 16
  doc.setDrawColor(203, 213, 225)
  doc.setLineWidth(1)
  doc.line(margin, y, pageWidth - margin, y)

  // --- Footer Notes ---
  y += 18
  doc.setFont('helvetica', 'bold')
  doc.text('Amount in Words: ', margin, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.amountInWords, margin + 85, y, { maxWidth: contentWidth - 85 })

  y += 16
  doc.setFont('helvetica', 'bold')
  doc.text('Thank you for your business.', margin, y)

  y += 14
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(71, 85, 105)
  doc.text(
    'This is a computer-generated invoice and does not require a physical signature.',
    margin,
    y
  )

  return Buffer.from(doc.output('arraybuffer'))
}
