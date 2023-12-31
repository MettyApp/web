import BeanAvatar from './BeanAvatar';

export default function BeanTile({ recording }: { recording: any; }) {
  const date = new Date(recording.savedAt);

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex flex-row'>
        <BeanAvatar name={recording.bean.name} imageUrl={recording.bean.imageUrl} />
        <div className='flex flex-col px-2'>
          <p className='font-black text-2xl'>{recording.bean.name}</p>
          <p className='font-light text-sm capitalize'>{recording.bean.roaster} - {(recording.bean.origin ?? []).join(', ').toLowerCase()}</p>
        </div>
      </div>
      <p className='font-light text-sm capitalize'>{date.toLocaleString()}</p>
    </div>
  );
}
