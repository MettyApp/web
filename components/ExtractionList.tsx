import ActivitySummaryTile from './ExtractionTile';
import { gql } from '@apollo/client'
import { getClient } from "@/lib/client";
import Link from 'next/link'

const query = gql`
  fragment ActivitySummaryFragment on Activity {
      id
      savedAt
      medias
      bean {
          id
          name
          imageUrl
          roaster
      }
      location {
          lat
          lon
      }
      rating {
          enjoyment
          extraction
      }
      extraction {
          recipe {
              dose
              yield
          }
      }
  }
  query loadHistory($nextToken: String) {
    listActivities (nextToken: $nextToken, pageSize: 20) {
        nextToken
        items {
          id
          sys {
              deleted
              version
          }
          ...ActivitySummaryFragment
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
      'nextToken': undefined
    },
  });
  return <div className='flex flex-col gap-y-2'>
    <Link href="/extraction" className='font-extrabold uppercase mx-4'>
      Extractions
    </Link>
    <div className='flex flex-col gap-y-1'>
      {data.listActivities.items.map((e: any) => <Link href={`/extraction/${e.id}`} key={e.id}>
        <ActivitySummaryTile activitySummary={e} />
      </Link>)}
    </div>
  </div>;
}

