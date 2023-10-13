'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import RatingBar from './RatingBar';

export function timeAgo(timestamp: number) {
  const now = new Date().getTime();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  if (secondsAgo < 60) {
    return secondsAgo + " sec ago";
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return minutesAgo + (minutesAgo === 1 ? " min" : " mins") + " ago";
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return hoursAgo + (hoursAgo === 1 ? " hour" : " hours") + " ago";
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return daysAgo + (daysAgo === 1 ? " day" : " days") + " ago";
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return monthsAgo + (monthsAgo === 1 ? " month" : " months") + " ago";
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return yearsAgo + (yearsAgo === 1 ? " year" : " years") + " ago";
  }
}


export default function ExtractionTile({ recording }: { recording: any }) {

  const pathname = usePathname();

  const backgroundVariant = {
    'true': 'bg-black bg-opacity-10',
    'false': '',
  }

  const isSelected = pathname.includes(recording.id) ? 'true' : 'false';
  const rating = recording.degustations.reduce((acc: number, cur: any) => cur.rating + acc, 0) / recording.degustations.length;


  return <div className={`${backgroundVariant[isSelected]} flex items-center my-1 px-4 p-2 hover:bg-black active:bg-black hover:bg-opacity-5 active:bg-opacity-10 rounded-xl`}>
    <div className='border-2 rounded-full overflow-hidden w-14 h-14 mr-2 bg-white'>
      <Image
        src={recording.bean.imageUrl ?? '/logo.svg'}
        alt="Metty Logo"
        objectFit="cover"
        width={56}
        height={56} />
    </div>
    <div className='flex-1 flex-col p-2'>
      <p className='font-semibold'>{recording.parameters.dose}g into {recording.insights.effectiveYield.toFixed(0)}g . {recording.parameters.temperature}°C</p>
      <p className='font-light text-xs my-1'>{(recording.insights.brewEnd / 1000).toFixed(0)}s - {recording.insights.brewMaxFlowRate.toFixed(1)} g/s - {timeAgo(recording.savedAt)}</p>
      <RatingBar rating={rating} />
    </div>
  </div>;
}
