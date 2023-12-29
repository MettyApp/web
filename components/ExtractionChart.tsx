"use client";
import { ResponsiveLine } from '@nivo/line'
export default function ExtractionChart({ recording }: any) {
  const data = [
    { id: 'rate', "color": "#ebde34ff", data: recording.samples.scale.map((e: any) => ({ 'x': new Date(e.receivedAt / 1000), 'y': e.smoothedRate * 10 })) },
    { id: 'weight', 'color': '#8f5522ff', data: recording.samples.scale.map((e: any) => ({ 'x': new Date(e.receivedAt / 1000), 'y': e.value })) },
    { id: 'flow', color: 'blue', data: recording.samples.pump.map((e: any) => ({ 'x': new Date(e.receivedAt / 1000), 'y': e.smoothedRate * 10 })) },
  ];

  return (<ResponsiveLine
    data={data}
    margin={{ top: 24, right: 32, bottom: 24, left: 24 }}
    colors={{ datum: 'color' }}
    xScale={{ type: 'time' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 60,
      stacked: false,
      reverse: false
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      format: (value: Date) => value.getTime(),
      legendPosition: 'middle'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: (value: number) => value / 10,
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    curve="basis"
    enableGridY={false}
    enableGridX={false}
    enablePoints={false}
    enableArea={true}
    isInteractive={false}
    animate={false}
  />);
}