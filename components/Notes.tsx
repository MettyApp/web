import Image from 'next/image';
import AddNoteForm from './AddNoteForm';
import RatingBar from './RatingBar';

function Degustation({ degustation }: { degustation: any }) {
  return (
    <div className='flex flex-col gap-y-4'>
      {degustation.medias.length > 0 && <div className='aspect-video relative'>
        {degustation.medias.map((url: string) => {
          return <Image className='rounded-2xl'
            style={{ objectFit: "cover" }}
            key={url} fill src={url} alt='' />;
        })}
      </div>}
      <div className='flex flex-row gap-x-4'>
        <div className='border rounded-full overflow-hidden w-14 h-14 bg-white' />
        <div className='flex flex-1 flex-col gap-y-2'>
          <div className='flex-1'>
            <RatingBar rating={degustation.rating} />
            <p>{degustation.notes}</p>
          </div>
        </div>
      </div>
    </div>);
}

export default function Notes({ recording }: { recording: any }) {
  return (<div className='xl:pl-4 py-2 min-w-0 xl:w-96'>
    <p className='font-extrabold uppercase'>Notes</p>
    <div className='flex flex-col pt-4 min-w-0'>
      <div className='grid grid-flow-col auto-cols-fr'>
        {recording.notes &&
          <p>{recording.notes}</p>
        }
      </div>
      <AddNoteForm recordingId={recording.id} />
    </div>
  </div>);
}