import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metty Login',
  description: 'Metty login page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex bg-[url('/banner.jpg')] bg-cover bg-bottom items-center md:items-start justify-center flex-col">
      <div className='flex flex-1 w-full justify-center md:py-4 bg-white flex-col md:rounded-none md:flex md:justify-center px-16 md:w-2/6'>
        <div className='flex flex-col flex-1 md:justify-center my-8'>
          {children}
        </div>
      </div>
    </div>

  )
}
