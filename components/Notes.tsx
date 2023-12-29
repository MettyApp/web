import AddNoteForm from './AddNoteForm';
import RatingBar from './RatingBar';

export default function Notes({ recording }: { recording: any }) {
  return (<div className='xl:pl-4 py-2 min-w-0 xl:w-96'>
    <p className='font-extrabold uppercase'>Notes</p>
    <div className='flex flex-col pt-4 min-w-0'>
      {recording.degustations.map((e: any) => (
        <div key={e.id} className='flex flex-row'>
          <div className='border-2 rounded-full overflow-hidden w-14 h-14 bg-white pr-4' />
          <div className='flex-1 pl-4'>
            <RatingBar rating={e.rating} />
            <p>{e.notes}</p>
          </div>
        </div>
      ))}
      <AddNoteForm recordingId={recording.id} />
    </div>
  </div>);
}