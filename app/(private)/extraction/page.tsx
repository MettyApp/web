import ExtractionList from '@/components/ExtractionList';
import PingLoader from '@/components/PingLoader';
import { Suspense } from 'react';

export default function ExtractionHome() {
  return (
    <div className='flex flex-1 h-full lg:items-center lg:justify-center'>
      <p className='text-sm hidden lg:block'>
        Please select a recording.
      </p>
      <div className='flex-1 lg:hidden'>
        <Suspense fallback={<PingLoader />}>
          <ExtractionList />
        </Suspense>
      </div>
    </div>
  )
}