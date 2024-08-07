import ExtractionTile from './ExtractionTile';
import { gql } from '@apollo/client'
import { getClient } from "@/lib/client";
import Link from 'next/link'

const query = gql`
  query loadHistory($beanId: String) {
  listRecordings (pageSize: 20, where: {savedAfter: 0, beanId: $beanId}) {
    total
    items {
      id
      savedAt
      parameters {
        dose
        temperature
      }
      insights {
        effectiveYield
        brewEnd
        brewMaxFlowRate
      }
      degustations {
        id
        rating
      }
      bean {
        id
        name
        imageUrl
      }
    }
  }
}
`
export default async function ExtractionList() {
  const { data } = await getClient().query({
    query, context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
    variables: {
      'beanId': undefined
    },
  });
  return <div className='flex flex-col gap-y-2'>
    <Link href="/extraction" className='font-extrabold uppercase mx-4'>
      Extractions
    </Link>
    <div className='flex flex-col gap-y-1'>
      {data.listRecordings.items.map((e: any) => <Link href={`/extraction/${e.id}`} key={e.id}>
        <ExtractionTile recording={e} />
      </Link>)}
    </div>
  </div>;
}

