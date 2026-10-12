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
} from './sendEmail'
export {
  buildEmailVerificationTemplate,
  buildPhoneVerificationTemplate,
  buildWelcomeTemplate,
  buildPaymentSuccessTemplate,
  buildPaymentFailureTemplate,
  buildPasswordResetTemplate,
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
  TransactionalEmailData,
} from './types'
