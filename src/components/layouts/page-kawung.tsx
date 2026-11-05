import { KawungShape } from '@/components/assets/shapes/misc';

export function PageKawung() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden select-none [view-transition-name:page-kawung]"
      aria-hidden="true"
    >
      <KawungShape className="absolute top-0 left-1/2 size-[min(640px,120vw)] -translate-x-1/2 -translate-y-[62%] text-[#b9b9b2] opacity-60 [--kawung-ring:var(--color-xghoststroke)] [--kawung-stroke:var(--color-xghoststroke)] motion-safe:animate-[spin-clockwise_30s_linear_infinite]" />
    </div>
  );
}
