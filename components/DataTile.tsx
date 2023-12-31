export default function DataTile({ name, value }: { name: String, value: String }) {
  return (<div className='flex flex-1 flex-col'>
    <p className='font-light text-sm capitalize'>{name}</p>
    <p className='font-semibold'>{value}</p>
  </div>);
}