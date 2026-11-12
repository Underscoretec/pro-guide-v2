'use client'

import React from 'react'

export const OfflineProcessCard: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#FBFBFC',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        fontFamily: 'inherit',
      }}
    >
      <h4
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: '#111827',
          marginTop: 0,
          marginBottom: '16px',
        }}
      >
        How an offline workshop runs
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Step 1 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            1
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
              Participant registers and pays
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              Chooses one date and one time slot, pays INR plus 18% GST (or USD outside India) on Razorpay.
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            2
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
              Confirmation email with QR pass
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              Venue, address, map link, reporting time and a personal QR code are emailed straight away.
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            3
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
              Reminder before the session
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              Email and SMS reminder 24 hours and 2 hours before the start.
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            4
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
              Check-in at the venue
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              Admin scans the QR code at the registration desk. Attendance is marked automatically.
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            5
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
              Attend and get certificate
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
              After the session, attendees get a certificate and feedback form by email.
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#6B7280',
          marginTop: '18px',
          paddingTop: '12px',
          borderTop: '1px solid #E5E7EB',
          fontStyle: 'italic',
        }}
      >
        No video or join link is needed for offline workshops.
      </div>
    </div>
  )
}
export default OfflineProcessCard

