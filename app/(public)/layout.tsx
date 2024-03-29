import type { Metadata } from 'next'
import '../globals.css'
import Image from "next/image"

export const metadata: Metadata = {
  title: 'Fugue Login',
  description: 'Fugue login page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex w-full min-h-screen h-full bg-black bg-[url('/banner.jpg')] bg-cover bg-bottom items-center lg:items-start justify-center flex-col">
      <div className='flex justify-center py-4 w-full sm:w-auto bg-white sm:rounded-3xl lg:flex-1 flex-col lg:rounded-none lg:justify-center px-16 lg:w-2/6'>
        <div className='flex justify-center items-center mb-8'>
          <div className='rounded-full flex justify-center items-center p-4'>
            <div className='relative h-8 w-10 mt-1'>
              <Image
                alt=""
                src={"/logo_black.svg"}
                fill
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 justify-center '>
          {children}
        </div>
      </div>
    </div>
  );
}
