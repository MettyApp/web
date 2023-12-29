"use client";

import { addRecordingDegustation } from '@/app/actions';
import RatingBar from './RatingBar'
import { FormEventHandler, KeyboardEventHandler, useState } from 'react';

export default function AddNoteForm({ recordingId }: { recordingId: string }) {

  const [active, setActive] = useState(false);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(3);

  const submit: FormEventHandler<HTMLFormElement> & KeyboardEventHandler<HTMLTextAreaElement> = async (e) => {
    e.preventDefault();
    await addRecordingDegustation(recordingId, notes, rating);
    setActive(false);
  };

  return <div className='flex justify-end mt-4'>
    {!active && <button onClick={() => setActive(!active)} className="font-bold text-sm text-black rounded disabled:opacity-30 hover:bg-black hover:bg-opacity-5 active:bg-black active:bg-opacity-10 px-3 py-1">
      Add a note
    </button>}
    {active &&
      <form className='flex flex-col flex-1 border rounded' onSubmit={submit}>
        <textarea autoFocus

          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && e.ctrlKey) {
              submit(e);
            }
          }} className=' bg-transparent flex m-2 resize-none outline-none' placeholder='Add your note...' />
        <div className='flex flex-row flex-1 items-center justify-between border-t px-2'>
          <RatingBar rating={rating} onClick={(v) => {
            setRating(v);
          }} />
          <div className='my-2'>
            <button onClick={() => setActive(!active)} className="font-bold mr-2 py-2 px-4 text-sm text-black rounded disabled:opacity-30 hover:bg-black hover:bg-opacity-5 active:bg-black active:bg-opacity-10">
              Cancel
            </button>
            <button disabled={notes.length <= 3} className="bg-black hover:enabled:bg-black-700 text-white font-bold py-2 px-4 rounded focus:enabled:outline-none disabled:opacity-30 hover:enabled:bg-opacity-80">
              Save
            </button>
          </div>
        </div>
      </form>}
  </div>
}
