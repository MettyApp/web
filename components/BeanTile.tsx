import Image from 'next/image';

export default function BeanTile({ recording }: { recording: any; }) {
  const date = new Date(recording.savedAt);

  return <div className='flex flex-col'>
    <div className='flex flex-row py-2'>
      <div className='border-2 rounded-full overflow-hidden w-14 h-14 bg-white'>
        <Image
          src={recording.bean.imageUrl ?? '/logo.svg'}
          alt="Metty Logo"
          objectFit="cover"
          width={56}
          height={56} />
      </div>
      <div className='flex flex-col px-2'>
        <p className='font-black text-2xl'>{recording.bean.name}</p>
        <p className='font-light text-sm capitalize'>{recording.bean.roaster} - {(recording.bean.origin ?? []).join(', ').toLowerCase()}</p>
      </div>
    </div>
    <p className='font-light text-sm capitalize'>{date.toLocaleString()}</p>
  </div>;
}
