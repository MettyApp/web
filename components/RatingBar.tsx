import { StarIcon } from '@heroicons/react/24/solid';

export default function RatingBar({ rating, onClick }: { rating: number, onClick?: (v: number) => void }) {
  const max = 5;
  const value = Math.min(rating, max);
  const elt = new Array(max).fill(undefined).map((v, idx) => idx < value).map((v, idx) => {
    const str = v ? 'fill-black stroke-white' : 'fill-white stroke-black';
    const className = `${str} w-4 h-4`;
    return <StarIcon onClick={!!onClick ? () => onClick(idx + 1) : undefined} className={className} key={idx} />;
  });
  return (<div className='flex flex-row w-fit'>{elt}</div>)
}
