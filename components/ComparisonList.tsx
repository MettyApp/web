'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { timeAgo } from './ExtractionTile';



export default function ComparisonList({ recording }: { recording: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form


  return <div>
    <select id="compare-selector" defaultValue={"0"} onChange={(e) => {
      const value = e.target.value.trim();
      if (!value) {
        current.delete("compareWith");
      } else {
        current.set("compareWith", e.target.value);
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }}>
      <option value={current.get('compareWith') ?? "0"} disabled>Compare with</option>
      {recording.bean.recordings.items.filter((e: any) => e.id !== recording.id && e.parameters.dose == recording.parameters.dose).map((r: any) => Object.assign({}, r, { bean: recording.bean })).map((recording: any) =>
        <option value={recording.id} key={recording.id}>
          {recording.insights.effectiveYield.toFixed(0)}g . {(recording.insights.brewEnd / 1000).toFixed(0)}s - {recording.insights.brewMaxFlowRate.toFixed(1)} g/s - {timeAgo(recording.savedAt)} {(recording.degustations.reduce((acc: number, cur: any) => acc + cur.rating, 0) / recording.degustations.length).toString()}
        </option>)}
    </select>
  </div>
}
