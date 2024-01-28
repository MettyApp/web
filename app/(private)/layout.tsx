export const dynamic = "force-dynamic";

import '../globals.css'
import type { Metadata } from 'next'
import Spacer from '@/components/Spacer'
import Image from "next/image"
import SessionAvatar from '@/components/SessionAvatar'
import Link from 'next/link'


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

    <div className="flex flex-col md:flex-row max-h-screen max-w-full min-h-screen min-w-screen overflow-auto xl:overflow-hidden min-w-0">
      <div className="flex flex-row md:flex-col items-center px-2 md:px-0 md:my-2">
        <Link href="/extraction"><Image
          src="/logo.svg"
          alt=""
          className="m-4"
          unoptimized
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
    </div>
  );
}
