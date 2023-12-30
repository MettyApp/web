import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Spacer from '@/components/Spacer'
import Image from 'next/image'
import SessionAvatar from '@/components/SessionAvatar'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fugue',
  description: 'Your coffee companion',
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
        <div className="flex flex-col md:flex-row max-h-screen max-w-full min-h-screen min-w-screen overflow-auto min-w-0">
          <div className="flex flex-row md:flex-col min-w-0 items-center">
            <Link href="/extraction"><Image
              src="/logo.svg"
              alt=""
              className="m-4"
              width={logoSize}
              height={logoSize}
            />
            </Link>
            <Spacer />
            <SessionAvatar />
          </div>
          <div className="flex flex-1 min-w-0">
            {children}
          </div>
        </div></body>
    </html>
  )
}
