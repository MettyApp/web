import ExtractionList from '@/components/ExtractionList';
import PingLoader from '@/components/PingLoader';
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import { BackspaceIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon, BackwardIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Suspense } from 'react';


export const revalidate = 5;
const query = gql`
query getRoaster($id: String!) {
  getRoaster(id: $id) {
    id
    name
    beans {
      total
      items {
        id
        imageUrl
        pageUrl
        pricePerKilo
        name
        origin
        description
      }
    }
  }
}
`

export default function BeansHome({ params }: { params: { id: string } }) {
  return <Suspense fallback={<PingLoader />}><BeanList params={params} /></Suspense>
}


function BeanTile({ roaster: bean }: any) {
  return <div className='flex flex-col  justify-start rounded gap-y-2 w-80'>
    <img src={bean['imageUrl']} className='w-36 rounded-xl shadow' />
    <div className='flex flex-col gap-y-2'>
      <div>
        <a target='_blank' href={bean['pageUrl']} className='text-lg font-bold'>{bean['name']}</a>
        <p className='text-xs font-light'>{(bean['pricePerKilo']||0).toFixed(0)}€/kg - {(bean['origin'] || []).map((e: string) => e.toLowerCase()).join(', ')}</p>
      </div>
      <p>{bean['description']}</p>
    </div>
  </div>
}

async function BeanList({ params }: { params: { id: string } }) {

  const { data } = await getClient().query({
    query, variables: { id: params.id }, context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    }
  });



  return (
    <div className='flex flex-1 flex-col h-full px-4 gap-y-4'>
      <div>
        <Link href='/roaster/' className='flex-row flex gap-x-2'> <ArrowLeftIcon className='w-4' />Back to roasters</Link>
        <p className='font-extrabold uppercase'>
          Beans from {data['getRoaster']["name"]}</p>
      </div>
      <div className='flex flex-wrap gap-y-4 gap-x-8'>
        {(data['getRoaster']['beans']['items'] || []).map((bean: any) => <BeanTile key={bean["id"]} roaster={bean} />)}
      </div>
    </div>
  )
}