import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Spacer from '@/components/Spacer'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metty',
  description: 'Coffee log companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const logoSize = 36;
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col md:flex-row max-h-screen max-w-full overflow-auto min-w-0">
          <div className="flex flex-col min-w-0">
            <Image
              src="/logo.svg"
              alt="Metty Logo"
              className="m-4"
              width={logoSize}
              height={logoSize}
            />
            <Spacer />
          </div>
          <div className="flex flex-1 min-w-0">
            {children}
          </div>
        </main></body>
    </html>
  )
}
