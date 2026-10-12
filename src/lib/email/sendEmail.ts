import { SendEmailCommand } from '@aws-sdk/client-ses'

import { logger } from '@/lib/logger'
import {
  buildEmailVerificationTemplate,
  buildPasswordResetTemplate,
  buildPaymentFailureTemplate,
  buildPaymentSuccessTemplate,
  buildPhoneVerificationTemplate,
  buildWelcomeTemplate,
} from './templates'
import { getSesFromAddress, sesClient } from './sesClient'
import type {
  EmailTemplateType,
  SendEmailOptions,
  SendTransactionalEmailOptions,
  TransactionalEmailData,
} from './types'

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const recipients = Array.isArray(options.to) ? options.to : [options.to]
  const ccRecipients = options.cc
    ? (Array.isArray(options.cc) ? options.cc : [options.cc]).filter(Boolean)
    : undefined
  const bccRecipients = options.bcc
    ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]).filter(Boolean)
    : undefined
  const from = getSesFromAddress()
  const region = process.env.AWS_REGION || 'ap-south-1'

  logger.email.info('SES send triggered', {
    from,
    to: recipients,
    cc: ccRecipients && ccRecipients.length > 0 ? ccRecipients : undefined,
    bcc: bccRecipients && bccRecipients.length > 0 ? bccRecipients : undefined,
    subject: options.subject,
    region,
    replyTo: options.replyTo || null,
  })

  const command = new SendEmailCommand({
    Source: from,
    Destination: {
      ToAddresses: recipients,
      ...(ccRecipients && ccRecipients.length > 0 ? { CcAddresses: ccRecipients } : {}),
      ...(bccRecipients && bccRecipients.length > 0 ? { BccAddresses: bccRecipients } : {}),
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: options.subject,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: options.html,
        },
        ...(options.text
          ? {
            Text: {
              Charset: 'UTF-8',
              Data: options.text,
            },
          }
          : {}),
      },
    },
    ...(options.replyTo ? { ReplyToAddresses: [options.replyTo] } : {}),
  })

  try {
    const result = await sesClient.send(command)

    logger.email.info('SES send succeeded', {
      to: recipients,
      cc: ccRecipients && ccRecipients.length > 0 ? ccRecipients : undefined,
      bcc: bccRecipients && bccRecipients.length > 0 ? bccRecipients : undefined,
      subject: options.subject,
      messageId: result.MessageId || null,
      requestId: result.$metadata?.requestId || null,
      httpStatusCode: result.$metadata?.httpStatusCode || null,
    })
  } catch (error) {
    logger.email.error('SES send failed', {
      to: recipients,
      cc: ccRecipients && ccRecipients.length > 0 ? ccRecipients : undefined,
      bcc: bccRecipients && bccRecipients.length > 0 ? bccRecipients : undefined,
      subject: options.subject,
      region,
      error: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : undefined,
    })
    throw error
  }
}

export async function sendTransactionalEmail<T extends EmailTemplateType>(
  type: T,
  to: string,
  data: TransactionalEmailData[T],
  options?: SendTransactionalEmailOptions,
): Promise<void> {
  logger.email.info('Transactional email requested', { type, to, cc: options?.cc })

  let emailContent: { subject: string; html: string; text: string }

  switch (type) {
    case 'email-verification':
      emailContent = buildEmailVerificationTemplate(data as TransactionalEmailData['email-verification'])
      break
    case 'phone-verification':
      emailContent = buildPhoneVerificationTemplate(data as TransactionalEmailData['phone-verification'])
      break
    case 'welcome':
      emailContent = buildWelcomeTemplate(data as TransactionalEmailData['welcome'])
      break
    case 'payment-success':
      emailContent = buildPaymentSuccessTemplate(data as TransactionalEmailData['payment-success'])
      break
    case 'payment-failure':
      emailContent = buildPaymentFailureTemplate(data as TransactionalEmailData['payment-failure'])
      break
    case 'password-reset':
      emailContent = buildPasswordResetTemplate(data as TransactionalEmailData['password-reset'])
      break
    default:
      throw new Error(`Unsupported email template type: ${type}`)
  }

  await sendEmail({
    to,
    cc: options?.cc,
    bcc: options?.bcc,
    replyTo: options?.replyTo,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
  })
}

export async function sendEmailVerificationOtp(
  to: string,
  otp: string,
  fullName?: string,
): Promise<void> {
  await sendTransactionalEmail('email-verification', to, {
    otp,
    fullName,
    expiryMinutes: 30,
  })
}

export async function sendPhoneVerificationOtp(
  to: string,
  otp: string,
  fullName?: string,
  phoneNumber?: string,
): Promise<void> {
  await sendTransactionalEmail('phone-verification', to, {
    otp,
    fullName,
    phoneNumber,
    expiryMinutes: 10,
  })
}

export async function sendWelcomeEmail(to: string, fullName: string): Promise<void> {
  await sendTransactionalEmail('welcome', to, { fullName })
}

export async function sendPaymentSuccessEmail(
  to: string,
  data: TransactionalEmailData['payment-success'],
  options?: SendTransactionalEmailOptions,
): Promise<void> {
  const adminEmail = process.env.NEXT_PUBLIC_PAYMENT_CONFIRMATION_MAIL
  const ccList: string[] = []

  if (adminEmail) {
    const parsed = adminEmail
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
    ccList.push(...parsed)
  }

  if (options?.cc) {
    const extraCc = Array.isArray(options.cc) ? options.cc : [options.cc]
    ccList.push(
      ...extraCc
        .map((e) => e.trim())
        .filter(Boolean),
    )
  }

  const uniqueCc = Array.from(new Set(ccList))

  await sendTransactionalEmail('payment-success', to, data, {
    ...options,
    cc: uniqueCc.length > 0 ? uniqueCc : undefined,
  })
}

export async function sendPaymentFailureEmail(
  to: string,
  data: TransactionalEmailData['payment-failure'],
): Promise<void> {
  await sendTransactionalEmail('payment-failure', to, data)
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  fullName?: string,
): Promise<void> {
  await sendTransactionalEmail('password-reset', to, {
    resetUrl,
    fullName,
    expiryMinutes: 60,
  })
}
