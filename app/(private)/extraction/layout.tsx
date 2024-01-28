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
    <div className='bg-white/95 flex flex-1'>
      <div className='hidden lg:flex overflow-y-auto py-4 px-2'>
        <Suspense fallback={<PingLoader />}>
          <ExtractionList />
        </Suspense>
      </div>
      <div className="bg-white flex-1">
        <div className='flex xl:flex-row flex-colmin-w-0 md:overflow-y-auto xl:overflow-y-hidden h-full py-4 px-2'>
          <div className='xl:overflow-y-auto flex-1'>
            <div id="menu" className='absolute target:visible target:flex invisible overflow-hidden hidden top-0 bottom-0 left-0 right-0 bg-black bg-opacity-0 ease-in-out target:bg-opacity-80 z-10 max-h-screen max-w-full target:flex-col target:md:flex-row '>
              <div className='relative md:left-20 left-0 top-20 md:top-0 py-4 px-6 flex flex-col md:rounded-r-md bg-white gap-y-4 overflow-y-auto '>
                <div className='h-6 w-6'><a href="#"><XMarkIcon /></a></div>
                <div className="flex-1 flex-col ">
                  <Suspense fallback={<PingLoader />}>
                    <ExtractionList />
                  </Suspense>
                </div>
              </div>
              <a href="#" className='flex-1' />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>)
}