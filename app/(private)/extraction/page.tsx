import ExtractionList from '@/components/ExtractionList';

export default function ExtractionHome() {
  return (
    <div className='flex flex-1 h-full lg:items-center lg:justify-center'>
      <p className='text-sm hidden lg:block'>
        Please select a recording.
      </p>
      <div className='lg:hidden'><ExtractionList /></div>
    </div>
  )
}