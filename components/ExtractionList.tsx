import ExtractionTile from './ExtractionTile';
import { gql } from '@apollo/client'
import { getClient } from "@/lib/client";
import Link from 'next/link'

const query = gql`
  query loadHistory {
  listRecordings (savedAfter: 0, pageSize: 20) {
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
      bean {
        id
        imageUrl
      }
    }
  }
}
`
export default async function ExtractionList({ selected }: { selected: string }) {

  const { data } = await getClient().query({
    query, context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  return <div>
    <p className='font-extrabold uppercase pb-2'>Extractions</p>
    {data.listRecordings.items.map((e: any) => <Link href={`/extraction/${e.id}`} key={e.id}><ExtractionTile recording={e} selected={selected == e.id} /></Link>)}

  </div>;
}

