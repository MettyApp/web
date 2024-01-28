import type { Metadata } from 'next'
import '../../globals.css'


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
    <div className="flex-1 flex bg-[url('/banner.jpg')] bg-cover bg-bottom items-center md:items-start justify-center flex-col">
      <div className='flex flex-1 w-full justify-center md:py-4 bg-white flex-col md:rounded-none md:flex md:justify-center px-2 lg:w-1/2 xl:w-2/6'>
        <div className='flex flex-col flex-1 md:justify-center my-8'>
          {children}
        </div>
      </div>
    </div>

  )
}
