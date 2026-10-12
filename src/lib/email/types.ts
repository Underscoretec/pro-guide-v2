export type EmailTemplateType =
  | 'email-verification'
  | 'phone-verification'
  | 'welcome'
  | 'payment-success'
  | 'payment-failure'
  | 'password-reset'

export interface SendEmailOptions {
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export interface SendTransactionalEmailOptions {
  cc?: string | string[]
  bcc?: string | string[]
  replyTo?: string
}

export interface EmailVerificationTemplateData {
  otp: string
  fullName?: string
  expiryMinutes?: number
}

export interface PhoneVerificationTemplateData {
  otp: string
  fullName?: string
  phoneNumber?: string
  expiryMinutes?: number
}

export interface WelcomeTemplateData {
  fullName: string
  loginUrl?: string
}

export interface PaymentSuccessTemplateData {
  fullName: string
  bookTitle: string
  purchaseType: string
  amount: number
  orderId?: string
  profileUrl?: string
  invoiceUrl?: string
}

export interface PaymentFailureTemplateData {
  fullName: string
  bookTitle: string
  purchaseType: string
  amount: number
  reason?: string
  retryUrl?: string
}

export interface PasswordResetTemplateData {
  resetUrl: string
  fullName?: string
  expiryMinutes?: number
}

export type TransactionalEmailData = {
  'email-verification': EmailVerificationTemplateData
  'phone-verification': PhoneVerificationTemplateData
  welcome: WelcomeTemplateData
  'payment-success': PaymentSuccessTemplateData
  'payment-failure': PaymentFailureTemplateData
  'password-reset': PasswordResetTemplateData
}
