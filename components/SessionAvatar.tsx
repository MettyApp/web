import { getSession } from '@/lib/session';
import Link from 'next/link';

export default async function SessionAvatar() {
  const session = await getSession();
  if (session !== undefined) {
    return <Link href="/profile">
      <div className='rounded-full border-white border w-12 h-12 m-4 text-white uppercase text-2xl flex justify-center items-center'>
        {(await session?.username())?.charAt(0)}
      </div>
    </Link>;
  } else {
    return <div />
  }
}
