import ExtractionList from '@/components/ExtractionList';
import PingLoader from '@/components/PingLoader';
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { Suspense } from 'react';


export const revalidate = 5;
const query = gql`
query listRoasters {
  listRoasters {
    id
    name
    imageUrl
    beans {
      total
    }
  }
}
`

export default function CatalogHome() {
  return <Suspense fallback={<PingLoader />}><RoasterList /></Suspense>
}


function RoasterTile({ roaster }: any) {
  return <Link href={`/roaster/${roaster['id']}`} className='flex flex-col justify-end rounded gap-y-2'>
    <div className='flex flex-1 justify-center items-center w-48 bg-white rounded-xl p-4 shadow'>
      <img src={roaster['imageUrl']} className='' />
    </div>
    <div>
      <p>{roaster['name']}</p>
      <p className='text-xs font-light'>{roaster["beans"]["total"]} beans.</p>
    </div>
  </Link>
}

async function RoasterList() {

  const { data } = await getClient().query({
    query, context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    }
  });



  return (
    <div className='flex flex-1 flex-col h-full px-4 gap-y-4'>
      <p className='font-extrabold uppercase'>
        Roasters
      </p>
      <div className='flex flex-wrap gap-y-4 gap-x-8'>
        {data['listRoasters'].map((roaster: any) => <RoasterTile key={roaster["id"]} roaster={roaster} />)}
      </div>
    </div>
  )
}