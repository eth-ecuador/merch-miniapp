import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = 'https://merch-collection.vercel.app'
  
  return {
    title: 'Merch MVP - Event SBT System',
    description: 'Claim event attendance SBTs and mint premium companion NFTs on Base Sepolia.',
    openGraph: {
      title: 'Merch MVP - Event SBT System',
      description: 'Claim event attendance SBTs and mint premium companion NFTs on Base Sepolia.',
      url: appUrl,
      siteName: 'Merch MVP',
      images: [
        {
          url: `${appUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Merch MVP - Event SBT System',
      description: 'Claim event attendance SBTs and mint premium companion NFTs on Base Sepolia.',
      images: [`${appUrl}/og-image.png`],
    },
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `${appUrl}/og-image.png`,
        button: {
          title: 'Claim SBT',
          action: {
            type: 'launch_frame',
            name: 'Merch MVP',
            url: appUrl,
            splashImageUrl: `${appUrl}/splash.png`,
            splashBackgroundColor: '#0052ff',
          },
        },
      }),
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
