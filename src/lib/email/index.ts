export { sesClient, getSesFromAddress } from './sesClient'
export {
  sendEmail,
  sendTransactionalEmail,
  sendEmailVerificationOtp,
  sendPhoneVerificationOtp,
  sendWelcomeEmail,
  sendPaymentSuccessEmail,
  sendPaymentFailureEmail,
  sendPasswordResetEmail,
  sendPasswordResetOtp,
} from './sendEmail'
export {
  buildEmailVerificationTemplate,
  buildPhoneVerificationTemplate,
  buildWelcomeTemplate,
  buildPaymentSuccessTemplate,
  buildPaymentFailureTemplate,
  buildPasswordResetTemplate,
  buildPasswordResetOtpTemplate,
} from './templates'
export type {
  EmailTemplateType,
  SendEmailOptions,
  SendTransactionalEmailOptions,
  EmailVerificationTemplateData,
  PhoneVerificationTemplateData,
  WelcomeTemplateData,
  PaymentSuccessTemplateData,
  PaymentFailureTemplateData,
  PasswordResetTemplateData,
  PasswordResetOtpTemplateData,
  TransactionalEmailData,
} from './types'
