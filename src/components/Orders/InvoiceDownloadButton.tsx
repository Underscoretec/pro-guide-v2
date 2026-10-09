'use client'

import React, { useState } from 'react'
import { FiDownload } from 'react-icons/fi'

interface InvoiceDownloadButtonProps {
  order: any
  className?: string
  label?: string
}

export const InvoiceDownloadButton: React.FC<InvoiceDownloadButtonProps> = ({
  order,
  className,
  label = 'Download Invoice',
}) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isDownloading) return
    setIsDownloading(true)

    try {
      const orderId = order.id || order.orderNumber
      const filename = `Tax Invoice - INV-${order.orderNumber || order.id}.pdf`
      const downloadUrl = `/api/orders/${encodeURIComponent(orderId)}/invoice?download=pdf`

      // Fetch the binary PDF blob
      const res = await fetch(downloadUrl)
      if (!res.ok) {
        throw new Error(`Failed to download invoice (${res.status})`)
      }

      const blob = await res.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      // Trigger standard browser download
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl)
      }, 1000)
    } catch (error) {
      console.error('Direct download failed, opening invoice stream:', error)
      const orderId = order.id || order.orderNumber
      window.location.href = `/api/orders/${encodeURIComponent(orderId)}/invoice?download=pdf`
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
      }, 600)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      title="Download PDF Invoice"
      className={
        className ||
        'inline-flex items-center gap-1.5 bg-purple hover:bg-purple-d text-white text-[12px] font-bold px-3 py-1.5 rounded-[5px] shadow-xs hover:shadow transition-all disabled:opacity-60 cursor-pointer'
      }
    >
      {isDownloading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <FiDownload className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}

export default InvoiceDownloadButton
