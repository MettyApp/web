import { getClient } from '@/lib/client';
import { gql } from '@apollo/client'
import BeanTile from '@/components/BeanTile';
import DataTile from '@/components/DataTile';
import React, { Suspense } from 'react';
import ExtractionChart from '@/components/ExtractionChart';
import Notes from '@/components/Notes';
import { Bars3Icon } from '@heroicons/react/24/solid';
import PingLoader from '@/components/PingLoader';


export const revalidate = 5;
const query = gql`
query getRecording($id: String!) {
  getRecording(id: $id) {
    savedAt
    id
    bean {
      id
      name
      origin
      roaster
      imageUrl
    }
    grinder
    grinderSettings
    parameters {
      dose
      temperature
      yield
    }
    degustations {
      id
      savedAt
      notes
      rating
      author
    }
    insights {
      brewEnd
      chokeEnd
      effectiveYield
      tds
      ey
      preBrewEnd
      brewMaxFlowRate
      preBrewMaxFlowRate
    }
    samples {
      scale {
        rate
        smoothedRate
        receivedAt
        value
      }
      pump {
        rate
        smoothedRate
        receivedAt
        value
      }
    }
  }
}
`


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


  const recording = data.getRecording;
  const prebrewVol = recording.samples.pump.find((e: any) => e.receivedAt >= recording.insights.preBrewEnd) ?? { value: 0 };
  const prebrewDrop = recording.samples.scale.find((e: any) => e.receivedAt >= recording.insights.preBrewEnd) ?? { value: 0 };

  return (
    <div className='flex flex-col xl:flex-row h-full min-w-0 mx-2'>
      <a className='lg:hidden' href="#menu"><Bars3Icon className='h-6 w-6' /></a>
      <div className='flex-1 min-w-0 xl:border-r xl:overflow-scroll'>
        <div>
          <div>
            <BeanTile recording={recording} />
            <p className='font-extrabold uppercase pt-4'>Extraction</p>
            <div className='flex flex-row pt-2 min-w-0'>
              <DataTile name='duration' value={`${(recording.insights.brewEnd / 1000).toFixed(1)}s`} />
              <DataTile name={`yield (1:${(recording.insights.effectiveYield / recording.parameters.dose).toFixed(1)})`} value={`${(recording.insights.effectiveYield).toFixed(0)}g`} />
              <DataTile name='tds' value={`${(recording.insights.tds).toFixed(1)}%`} />
              <DataTile name='ey' value={`${(recording.insights.ey).toFixed(1)}%`} />
            </div>
            <div className='mr-4 flex-1 h-96'>
              <ExtractionChart recording={recording} />
            </div>
            <p className='font-extrabold uppercase pt-4'>Brew</p>
            <div className='flex flex-row pt-2 min-w-0'>
              <DataTile name='duration' value={`${((recording.insights.brewEnd - recording.insights.preBrewEnd) / 1000).toFixed(1)}s`} />
              <DataTile name='yield' value={`${(recording.samples.scale[recording.samples.scale.length - 1].value).toFixed(1)}g`} />
              <DataTile name='rate' value={`${(recording.insights.brewMaxFlowRate).toFixed(1)}g/s`} />
              <DataTile name='volume' value={`${(recording.samples.pump[recording.samples.pump.length - 1].value).toFixed(1)}ml`} />
            </div>
            <p className='font-extrabold uppercase pt-4'>Pre-Brew</p>
            <div className='flex flex-row pt-2 min-w-0'>
              <DataTile name='duration' value={`${((recording.insights.preBrewEnd) / 1000).toFixed(1)}s`} />
              <DataTile name='debit' value={`${(recording.insights.preBrewMaxFlowRate || 0).toFixed(1)}ml/s`} />
              <DataTile name='volume' value={`${(prebrewVol.value).toFixed(1)}ml`} />
              <DataTile name='dripped' value={`${(prebrewDrop.value).toFixed(1)}g`} />
            </div>
            <p className='font-extrabold uppercase pt-4'>Recipe</p>
            <div className='flex flex-row pt-2 min-w-0'>
              <DataTile name='Dose' value={`${(recording.parameters.dose).toFixed(1)}g`} />
              <DataTile name={`yield (1:${(recording.parameters.yield / recording.parameters.dose).toFixed(1)})`} value={`${(recording.parameters.yield).toFixed(0)}g`} />
              <DataTile name='Water' value={`${(recording.parameters.temperature).toFixed(0)}°C`} />
              <DataTile name='Grinder' value={`${(recording.grinderSettings).split('@')[0]}`} />
            </div>
          </div>
        </div>
      </div>
      <Notes recording={recording}></Notes>
    </div>
  );
}


