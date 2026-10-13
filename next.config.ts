import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
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
      {
        source: '/products.html',
        destination: '/products',
      },
      {
        source: '/terms-and-condition',
        destination: '/terms&conditions',
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms&conditions',
      },
      {
        source: '/privacy-statement',
        destination: '/privacy-policy',
      },
      {
        source: '/cancellation-policy',
        destination: '/refund-policy',
      },
      {
        source: '/cancellation-and-return-policy',
        destination: '/refund-policy',
      },
      {
        source: '/:path*.html',
        destination: '/:path*',
      },
    ]
  },
}

export default withPayload(nextConfig)
