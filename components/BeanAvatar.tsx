import Image from "next/image";
export default function BeanAvatar({ imageUrl, name }: { imageUrl?: string, name: string }) {
  return <div className='border-2 rounded-full overflow-hidden w-14 h-14 bg-white flex items-center justify-center'>
    {!!imageUrl ? <Image
      src={imageUrl}
      alt=""
      width={56}
      height={56}
    /> : name[0].toUpperCase()}
  </div>
}