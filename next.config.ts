import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/resources.html',
        destination: '/resources',
      },
      {
        source: '/contact.html',
        destination: '/contact',
      },
      {
        source: '/customized-model.html',
        destination: '/customized-model',
      },
    ]
  },
}

export default withPayload(nextConfig)
