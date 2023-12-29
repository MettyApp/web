import ExtractionList from '@/components/ExtractionList'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { Suspense } from 'react'

async function PingLoader() {
  return (
    <div className='h-full flex min-h-full min-w-0 items-center justify-center'>
      <span className="flex h-3 w-3">
        <span className="p-3 animate-ping inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
      </span>
    </div>)
}

export default function ExtractionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-white/95 flex flex-1 min-w-0'>
      <div className='hidden lg:block overflow-scroll px-2 py-4 w-80'>
        <Suspense fallback={<PingLoader />}>
          <ExtractionList />
        </Suspense>
      </div>
      <div className="bg-white flex-1">
        <div className='flex xl:flex-row flex-col px-4 py-2 min-w-0 md:overflow-scroll xl:overflow-hidden h-full'>
          <div className='xl:overflow-scroll flex-1'>
            <div id="menu" className='absolute target:visible target:flex invisible overflow-hidden hidden top-12 md:top-0 bottom-0 md:left-16 left-0 right-0 bg-black bg-opacity-0 ease-in-out target:bg-opacity-80 z-10 max-h-screen max-w-full'>
              <div className='p-4 flex flex-col rounded-e-md bg-white'>
                <div className='h-6 w-6'><a href="#"><XMarkIcon /></a></div>
                <div className="flex-1 flex-col overflow-scroll"><ExtractionList /></div>
              </div>
              <a href="#" className='flex-1' />
            </div>
            <Suspense fallback={<PingLoader />}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </div>)
}