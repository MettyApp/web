'use client';
import { usePathname } from 'next/navigation';
import RatingBar from './RatingBar';
import BeanAvatar from './BeanAvatar';

export function timeAgo(date: string) {
  const timestamp = Date.parse(date)
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


export default function ActivitySummaryTile({ activitySummary: activity }: { activitySummary: any }) {

  const pathname = usePathname();

  const backgroundVariant = {
    'true': 'bg-black bg-opacity-10',
    'false': '',
  }

  const isSelected = pathname.includes(activity.id) ? 'true' : 'false';
  const rating = activity.rating?.enjoyment || 0;

  return (
    <div className={`${backgroundVariant[isSelected]} flex items-center flex-1 px-4 py-2 hover:bg-black active:bg-black hover:bg-opacity-5 active:bg-opacity-10 rounded-xl`}>
      {activity.bean &&
      <BeanAvatar name={activity.bean.name} imageUrl={activity.bean.imageUrl} />
      }
      <div className='flex-1 flex-col p-2'>
        {activity.extraction &&
        <p className='font-semibold'>{activity.extraction.recipe.dose}g into {activity.extraction.recipe.yield.toFixed(0)}g</p>
        }
        <p className='font-light text-xs my-1'>{timeAgo(activity.savedAt)}</p>
        <RatingBar rating={rating} />
      </div>
    </div>
  );
}
