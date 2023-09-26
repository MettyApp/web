export default function DataTile({ name, value }: { name: String, value: String }) {
  return (<div className='flex flex-col py-4 pl-0 pr-8'>
    <p className='font-light capitalize'>{name}</p>
    <p className='font-semibold'>{value}</p>
  </div>);
}