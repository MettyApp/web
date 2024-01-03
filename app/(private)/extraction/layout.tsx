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
      <div className='hidden lg:flex overflow-scroll p-4 lg:mx-4 lg:my-2'>
        <Suspense fallback={<PingLoader />}>
          <ExtractionList />
        </Suspense>
      </div>
      <div className="bg-white flex-1 p-4 lg:mx-4 lg:py-5">
        <div className='flex xl:flex-row flex-colmin-w-0 md:overflow-scroll xl:overflow-hidden h-full'>
          <div className='xl:overflow-scroll flex-1'>
            <div id="menu" className='absolute target:visible target:flex invisible overflow-hidden hidden top-20 md:top-0 bottom-0 md:left-20 left-0 right-0 bg-black bg-opacity-0 ease-in-out target:bg-opacity-80 z-10 max-h-screen max-w-full target:flex-col target:md:flex-row '>
              <div className='p-4 px-8 flex flex-col md:rounded-r-md bg-white gap-y-4'>
                <div className='h-6 w-6'><a href="#"><XMarkIcon /></a></div>
                <div className="flex-1 flex-col overflow-scroll">
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