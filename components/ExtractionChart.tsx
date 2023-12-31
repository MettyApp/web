"use client";
import { DatumValue } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line'

const LegendDot = ({ color }: { color: string }) => (<div className={"w-2 h-2 rounded-full " + `bg-${color}-100`} />);

export default function ExtractionChart({ recording }: any) {
  const data = [
    { id: 'rate', "color": "#ebde34", data: recording.samples.scale.map((e: any) => ({ 'x': (e.receivedAt / 1000), 'y': e.smoothedRate * 10 })) },
    { id: 'weight', 'color': '#8f5522', data: recording.samples.scale.map((e: any) => ({ 'x': (e.receivedAt / 1000), 'y': e.value })) },
    { id: 'flow', color: '#0096c7', data: recording.samples.pump.map((e: any) => ({ 'x': (e.receivedAt / 1000), 'y': e.smoothedRate * 10 })) },
    { id: 'volume', 'color': '#0047ab', data: recording.samples.pump.map((e: any) => ({ 'x': (e.receivedAt / 1000), 'y': e.value })) },
  ];

  const findAt = (x: DatumValue, serie: Array<any>) => {
    return serie.find((e) => e.x >= x) || serie[0];
  }

  return (<ResponsiveLine
    data={data.slice(0, 3)}
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
          <div className='gap-x-2 items-center flex-row flex'><LegendDot color="chartDebit" /><p>Debit</p></div>
          <div className='gap-x-2 items-center flex-row flex'><LegendDot color="chartVolume" /><p>Volume</p></div>
        </div>
        <div className='flex flex-col'>
          <p>{input.slice.points[0].data.x.toString()}s</p>
          <p>{(findAt(input.slice.points[0].data.x, data[0].data).y / 10).toFixed(1)}g/s</p>
          <p>{findAt(input.slice.points[0].data.x, data[1].data).y.toFixed(1)}g</p>
          <p>{(findAt(input.slice.points[0].data.x, data[2].data).y / 10).toFixed(1)}ml/s</p>
          <p>{findAt(input.slice.points[0].data.x, data[3].data).y.toFixed(1)}ml</p>
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