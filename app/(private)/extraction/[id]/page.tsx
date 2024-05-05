import { getClient } from '@/lib/client';
import { gql } from '@apollo/client'
import BeanTile from '@/components/BeanTile';
import DataTile from '@/components/DataTile';
import React, { ReactNode, Suspense } from 'react';
import ExtractionChart from '@/components/ExtractionChart';
import Notes from '@/components/Notes';
import { Bars3Icon } from '@heroicons/react/24/solid';
import PingLoader from '@/components/PingLoader';


export const revalidate = 5;
const query = gql`
fragment LocationFragment on Activity {
      location {
        lat
        lon
      }
}
fragment RatingFragment on Activity {
      rating {
        enjoyment
        extraction
      }
}
fragment SampleSerieFragment on Serie {
    name
    samples {
          value
          receivedAt
          rate
    }
}
fragment BeanNameTileFragment on Bean {
    id
    name
    imageUrl
    roaster
}
query getRecording($id: String!) {
  getActivity(id: $id) {
      id
      ...LocationFragment
      notes
      medias
      savedAt
      sys {
        deleted
        lastChangedAt
        version
      }
      ...RatingFragment
      bean {
        id
        name
        imageUrl
        roaster
        ...BeanNameTileFragment
      }

      measurements {
        tds
      }
      extraction {
        series {
            ...SampleSerieFragment
            name
            samples {
                  value
                  receivedAt
                  rate
            }
        }
        recipe {
          dose
          waterComposition {
            cacl2
            khco3
            nahco3
            mgso47h2o
          }
          yield
        }
        grinder {
          burrs
          model
          gap
          rpm
        }
        equipment {
          name
          value
        }
      }
    }
}
`

function TitleRow({ title, children }: { title: string, children: Array<ReactNode> }) {
  return (<div className='flex flex-col gap-y-2'>
    <p className='font-extrabold uppercase'>{title}</p>
    <div className='flex flex-row'>
      {...children}
    </div></div>)
}


export default async function ExtractionPage({ params }: { params: { id: string } }) {
  return <Suspense fallback={<PingLoader />}><Extraction params={params} /></Suspense>
}
async function Extraction({ params }: { params: { id: string } }) {

  const { data } = await getClient().query({
    query, variables: { id: params.id }, context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    }
  });


  const recording = data.getActivity;

  return (
    <div className='flex flex-col xl:flex-row h-full px-4 gap-y-8'>
      <div className='flex-1 xl:border-r xl:pr-4 xl:mr-4 xl:overflow-y-auto flex flex-col gap-y-4'>
        <a className='lg:hidden' href="#menu"><Bars3Icon className='h-6 w-6' /></a>
        <BeanTile recording={recording} />
        <TitleRow title='Recipe'>
          <DataTile name='Dose' value={`${(recording.extraction.recipe.dose).toFixed(1)}g`} />
          <DataTile name={`yield (1:${(recording.extraction.recipe.yield / recording.extraction.recipe.dose).toFixed(1)})`} value={`${(recording.extraction.recipe.yield).toFixed(0)}g`} />
          <DataTile name='Grinder' value={`${(recording.extraction.grinder.gap)}`} />
        </TitleRow>
        <div className='h-96'>
          <ExtractionChart recording={recording} />
        </div>
      </div>
      <Notes recording={recording}></Notes>
    </div>
  );
}


