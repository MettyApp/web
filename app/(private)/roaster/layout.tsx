import ExtractionList from '@/components/ExtractionList'
import PingLoader from '@/components/PingLoader'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Suspense } from 'react'

export default function ExtractionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <div className="bg-white flex-1">
      <div className='flex xl:flex-row flex-colmin-w-0 md:overflow-y-auto xl:overflow-y-hidden h-full my-4 mx-2'>
        <div className='xl:overflow-y-auto flex-1'>
          {children}
        </div>
      </div>
    </div>)
}