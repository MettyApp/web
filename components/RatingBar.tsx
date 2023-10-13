import { StarIcon } from '@heroicons/react/24/solid';

export default function RatingBar({ rating }: { rating: number }) {
  const max = 5;
  const value = Math.min(rating, max);
  const elt = new Array(max).fill(undefined).map((v, idx) => idx < value).map((v, idx) => {
    const str = v ? 'fill-black' : 'fill-white';
    const className = `${str} w-4 h-4 stroke-black`;
    return <StarIcon className={className} key={idx} />;
  });
  return (<div className='flex flex-row'>{elt}</div>)
}
