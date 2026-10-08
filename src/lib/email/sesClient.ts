import { SESClient } from '@aws-sdk/client-ses'

const region = process.env.AWS_REGION || 'ap-south-1'

/**
 * SES client using the AWS SDK default credential provider chain.
 * On EC2/ECS/Lambda this resolves the attached IAM role automatically.
 * Locally, use AWS_PROFILE or standard AWS credential env vars.
 */
export const sesClient = new SESClient({
  region,
})

export function getSesFromAddress(): string {
  const fromEmail = process.env.SES_FROM_EMAIL
  if (!fromEmail) {
    throw new Error('SES_FROM_EMAIL environment variable is not configured.')
  }

  const fromName = process.env.SES_FROM_NAME?.trim()
  if (fromName) {
    return `${fromName} <${fromEmail}>`
  }

  return fromEmail
}
