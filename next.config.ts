import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/resources.html',
        destination: '/resources',
      },
    ]
  },
}

export default withPayload(nextConfig)
