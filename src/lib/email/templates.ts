import type {
  EmailVerificationTemplateData,
  PasswordResetTemplateData,
  PaymentFailureTemplateData,
  PaymentSuccessTemplateData,
  PhoneVerificationTemplateData,
  WelcomeTemplateData,
} from './types'

const BRAND_NAME = 'ProGuide'
const BRAND_COLOR = '#7c6a46'

function layout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${BRAND_NAME}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fa;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND_COLOR};padding:20px 24px;color:#ffffff;font-size:20px;font-weight:700;">
                ${BRAND_NAME}
              </td>
            </tr>
            <tr>
              <td style="padding:28px 24px;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;background:#fafafa;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
                This is an automated message from ${BRAND_NAME}. Please do not reply to this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim()
}

function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`
}

function formatPurchaseType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export function buildEmailVerificationTemplate(data: EmailVerificationTemplateData): {
  subject: string
  html: string
  text: string
} {
  const greeting = data.fullName ? `Hello ${data.fullName},` : 'Hello,'
  const expiryMinutes = data.expiryMinutes ?? 10

  const subject = `${BRAND_NAME} - Email Verification Code`
  const text = `${greeting}\n\nYour verification code is: ${data.otp}\n\nThis code expires in ${expiryMinutes} minutes.\n\nIf you did not request this code, you can ignore this email.`
  const html = layout(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Use the verification code below to complete your email verification:
    </p>
    <div style="margin:0 0 20px;padding:16px;background:#f7f3ec;border:1px dashed ${BRAND_COLOR};border-radius:8px;text-align:center;">
      <span style="font-size:28px;font-weight:700;letter-spacing:6px;color:${BRAND_COLOR};">${data.otp}</span>
    </div>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">
      This code expires in ${expiryMinutes} minutes. If you did not request this code, you can safely ignore this email.
    </p>
  `)

  return { subject, html, text }
}

export function buildPhoneVerificationTemplate(data: PhoneVerificationTemplateData): {
  subject: string
  html: string
  text: string
} {
  const greeting = data.fullName ? `Hello ${data.fullName},` : 'Hello,'
  const expiryMinutes = data.expiryMinutes ?? 10
  const phoneLabel = data.phoneNumber ? ` for ${data.phoneNumber}` : ''

  const subject = `${BRAND_NAME} - Phone Verification Code`
  const text = `${greeting}\n\nYour phone verification code${phoneLabel} is: ${data.otp}\n\nThis code expires in ${expiryMinutes} minutes.`
  const html = layout(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Use the verification code below to verify your phone number${phoneLabel}:
    </p>
    <div style="margin:0 0 20px;padding:16px;background:#f7f3ec;border:1px dashed ${BRAND_COLOR};border-radius:8px;text-align:center;">
      <span style="font-size:28px;font-weight:700;letter-spacing:6px;color:${BRAND_COLOR};">${data.otp}</span>
    </div>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">
      This code expires in ${expiryMinutes} minutes.
    </p>
  `)

  return { subject, html, text }
}

export function buildWelcomeTemplate(data: WelcomeTemplateData): {
  subject: string
  html: string
  text: string
} {
  const loginUrl = data.loginUrl || `${process.env.SERVER_URL || ''}/login`
  const subject = `Welcome to ${BRAND_NAME}`
  const text = `Hello ${data.fullName},\n\nWelcome to ${BRAND_NAME}! Your account has been verified successfully.\n\nSign in here: ${loginUrl}`
  const html = layout(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hello ${data.fullName},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Welcome to ${BRAND_NAME}. Your account is now verified and ready to use.
    </p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
      You can sign in to access books, manage your profile, and view your order history.
    </p>
    <a href="${loginUrl}" style="display:inline-block;padding:12px 20px;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
      Sign In
    </a>
  `)

  return { subject, html, text }
}

export function buildPaymentSuccessTemplate(data: PaymentSuccessTemplateData): {
  subject: string
  html: string
  text: string
} {
  const profileUrl = data.profileUrl || `${process.env.SERVER_URL || ''}/profile#history`
  const invoiceUrl = data.invoiceUrl || (data.orderId ? `${process.env.SERVER_URL || ''}/api/orders/${data.orderId}/invoice` : null)
  const subject = `${BRAND_NAME} - Payment Successful & Tax Invoice`
  const text = `Hello ${data.fullName},\n\nYour payment for "${data.bookTitle}" (${formatPurchaseType(data.purchaseType)}) was successful.\nAmount: ${formatCurrency(data.amount)}\n${invoiceUrl ? `Tax Invoice: ${invoiceUrl}\n` : ''}\nView your orders: ${profileUrl}`
  const html = layout(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hello ${data.fullName},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Your payment was processed successfully. Thank you for your purchase. Your official Tax Invoice is attached/available below.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 20px;border:1px solid #e5e7eb;border-radius:8px;">
      <tr>
        <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #e5e7eb;"><strong>Book</strong></td>
        <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #e5e7eb;">${data.bookTitle}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #e5e7eb;"><strong>Format</strong></td>
        <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #e5e7eb;">${formatPurchaseType(data.purchaseType)}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:14px;"><strong>Amount Paid</strong></td>
        <td style="padding:12px 16px;font-size:14px;">${formatCurrency(data.amount)}</td>
      </tr>
    </table>
    <div style="margin-top:20px;display:flex;gap:12px;">
      ${
        invoiceUrl
          ? `<a href="${invoiceUrl}" style="display:inline-block;padding:12px 20px;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;margin-right:10px;">
              📄 Download Tax Invoice
            </a>`
          : ''
      }
      <a href="${profileUrl}" style="display:inline-block;padding:12px 20px;background:#f3f4f6;color:#374151;text-decoration:none;border-radius:8px;font-weight:600;">
        View Order History
      </a>
    </div>
  `)

  return { subject, html, text }
}

export function buildPaymentFailureTemplate(data: PaymentFailureTemplateData): {
  subject: string
  html: string
  text: string
} {
  const retryUrl = data.retryUrl || `${process.env.SERVER_URL || ''}/`
  const reason = data.reason || 'The payment could not be completed.'
  const subject = `${BRAND_NAME} - Payment Failed`
  const text = `Hello ${data.fullName},\n\nYour payment for "${data.bookTitle}" could not be completed.\nReason: ${reason}\n\nTry again: ${retryUrl}`
  const html = layout(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hello ${data.fullName},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      We were unable to process your payment for <strong>${data.bookTitle}</strong>.
    </p>
    <p style="margin:0 0 16px;padding:12px 16px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:14px;color:#991b1b;">
      ${reason}
    </p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#6b7280;">
      Format: ${formatPurchaseType(data.purchaseType)} | Amount: ${formatCurrency(data.amount)}
    </p>
    <a href="${retryUrl}" style="display:inline-block;padding:12px 20px;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
      Try Again
    </a>
  `)

  return { subject, html, text }
}

export function buildPasswordResetTemplate(data: PasswordResetTemplateData): {
  subject: string
  html: string
  text: string
} {
  const greeting = data.fullName ? `Hello ${data.fullName},` : 'Hello,'
  const expiryMinutes = data.expiryMinutes || 60
  const subject = `${BRAND_NAME} - Password Reset Request`
  const text = `${greeting}\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n${data.resetUrl}\n\nThis link will expire in ${expiryMinutes} minutes. If you did not request this, please ignore this email.`
  const html = layout(`
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      We received a request to reset your password for your <strong>${BRAND_NAME}</strong> account.
    </p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
      Click the button below to choose a new password:
    </p>
    <div style="margin:0 0 24px;text-align:center;">
      <a href="${data.resetUrl}" style="display:inline-block;padding:12px 24px;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
        Reset Password
      </a>
    </div>
    <p style="margin:0 0 12px;font-size:13px;line-height:1.5;color:#6b7280;">
      This link will expire in ${expiryMinutes} minutes.
    </p>
    <p style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;">
      If you did not request a password reset, you can safely ignore this email.
    </p>
  `)

  return { subject, html, text }
}
