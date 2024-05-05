"use client";
import { DatumValue } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line'

const LegendDot = ({ color }: { color: string }) => (<div className={"w-2 h-2 rounded-full " + `bg-${color}-100`} />);

export default function ExtractionChart({ recording }: any) {
  const series = recording.extraction.series
  const data = [
    { id: 'rate', "color": "#ebde34", data: series.find((e: any) => e.name == 'WEIGHT').samples.map((e: any) => ({ 'x': (e.receivedAt / 1000), 'y': e.rate * 10})) },
    { id: 'weight', "color": "#8f5522", data: series.find((e: any) => e.name == 'WEIGHT').samples.map((e: any) => ({ 'x': (e.receivedAt / 1000), 'y': e.value })) },
  ];

  const findAt = (x: DatumValue, serie: Array<any>) => {
    return serie.find((e) => e.x >= x) || serie[0];
  }

  return (<ResponsiveLine
    data={data}
    margin={{ top: 24, right: 36, bottom: 24, left: 24 }}
    colors={{ datum: 'color' }}
    xScale={{ type: 'linear' }}
    yFormat=" >-.0f"
    sliceTooltip={(input) => (
      <div className='w-40 shadow flex bg-white text-sm flex-row p-2 justify-between'>
        <div className='flex flex-col font-bold'>
          <div className='gap-x-2 items-center flex-row flex'><LegendDot color="gray" /><p>Time</p></div>
          <div className='gap-x-2 items-center flex-row flex'><LegendDot color="chartRate" /><p>Rate</p></div>
          <div className='gap-x-2 items-center flex-row flex'><LegendDot color="chartWeight" /><p>Weight</p></div>
        </div>
        <div className='flex flex-col'>
          <p>{input.slice.points[0].data.x.toString()}s</p>
          <p>{(findAt(input.slice.points[0].data.x, data[0].data).y).toFixed(1) / 10}g/s</p>
          <p>{findAt(input.slice.points[0].data.x, data[1].data).y.toFixed(1)}g</p>
        </div>
      </div>
    )}
    yScale={{
      type: 'linear',
      max: 60,
    }}
    axisRight={{
      format: (v) => v / 10,
    }}
    curve="monotoneX"
    enableGridY={false}
    enableGridX={false}
    enablePoints={false}
    enableArea={true}
    enableSlices={"x"}
  />);
}