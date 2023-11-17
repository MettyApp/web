import ExtractionTile from './ExtractionTile';
import { gql } from '@apollo/client'
import { getClient } from "@/lib/client";
import Link from 'next/link'

const query = gql`
  query loadHistory {
  listRecordings (pageSize: 20, where: {savedAfter: 0}) {
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
  });
  return <div>
    <p className='font-extrabold uppercase pb-2'>Extractions</p>
    {data.listRecordings.items.map((e: any) => <Link href={`/extraction/${e.id}`} key={e.id}><ExtractionTile recording={e} /></Link>)}

  </div>;
}

