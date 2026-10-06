import React from 'react'
import type { Metadata, Viewport } from 'next'
import '../globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { getHeader, getFooter } from '@/lib/payload/globals'
import { getCurrentUser } from '@/lib/auth/session'

export const viewport: Viewport = {
  themeColor: '#4A148C',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Otolaryngology Head & Neck 3D Simulation Models | ProGuide',
  description:
    'ProGuide by KnowledgeBridge International: 3D temporal bone, paranasal sinus and larynx simulation models, hands-on ENT workshops and training courses.',
  icons: {
    icon: '/images/favicon.svg',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [header, footer, user] = await Promise.all([
    getHeader(),
    getFooter(),
    getCurrentUser(),
  ])

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans text-ink bg-white min-h-screen flex flex-col">
        <Header data={header} user={user ? { fullName: user.fullName, email: user.email } : null} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  )
}
