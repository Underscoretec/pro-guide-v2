'use client'

import React from 'react'

export const CoverImageNoticeCard: React.FC = () => {
  return (
    <div style={{ paddingTop: '8px', paddingBottom: '8px', fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
          3. Cover image
        </span>
        <span
          style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '3px',
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            border: '1px solid #FECACA',
          }}
        >
          Required
        </span>
      </div>
      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
        Uses the image field above, shown on the workshop card and the video player poster.
      </p>
    </div>
  )
}
export default CoverImageNoticeCard

