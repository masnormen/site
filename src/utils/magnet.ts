const PULL = 0.4;
const TILT_DEG_PER_PX = 0.4;
const EASE = 0.09;

type Drift = { x: number; y: number; targetX: number; targetY: number };

/**
 * Lets `[data-magnet]` elements drift their inner SVG toward the cursor while hovered, easing every frame so it trails
 * softly and settles back on leave. Mouse only, skipped under reduced motion.
 */
export function installMagnet() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const drifts = new Map<HTMLElement, Drift>();
  let active: HTMLElement | null = null;
  let frame = 0;

  const tick = () => {
    frame = 0;
    for (const [element, drift] of drifts) {
      drift.x += (drift.targetX - drift.x) * EASE;
      drift.y += (drift.targetY - drift.y) * EASE;
      const settled = Math.abs(drift.targetX - drift.x) < 0.05 && Math.abs(drift.targetY - drift.y) < 0.05;
      if (settled && drift.targetX === 0 && drift.targetY === 0) {
        element.style.removeProperty('--magnet-x');
        element.style.removeProperty('--magnet-y');
        element.style.removeProperty('--magnet-r');
        drifts.delete(element);
        continue;
      }
      element.style.setProperty('--magnet-x', `${drift.x}px`);
      element.style.setProperty('--magnet-y', `${drift.y}px`);
      element.style.setProperty('--magnet-r', `${drift.x * TILT_DEG_PER_PX}deg`);
    }
    if (drifts.size) frame = requestAnimationFrame(tick);
  };

  const aim = (element: HTMLElement, targetX: number, targetY: number) => {
    const drift = drifts.get(element) ?? { x: 0, y: 0, targetX: 0, targetY: 0 };
    drift.targetX = targetX;
    drift.targetY = targetY;
    drifts.set(element, drift);
    frame ||= requestAnimationFrame(tick);
  };

  const release = () => {
    if (active) aim(active, 0, 0);
    active = null;
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-magnet]') : null;
      if (target !== active) release();
      if (!target) return;
      active = target;
      const rect = target.getBoundingClientRect();
      aim(
        target,
        (event.clientX - rect.left - rect.width / 2) * PULL,
        (event.clientY - rect.top - rect.height / 2) * PULL,
      );
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', release);
}
