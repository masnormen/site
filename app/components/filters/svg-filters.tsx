export function SVGFilters() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        aria-hidden
        className="invisible h-0 max-h-0 w-0 max-w-0 overflow-hidden"
      >
        <filter id="noisy">
          <feTurbulence baseFrequency="0.50" result="colorNoise" />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values=".66 .66 .66 0.4 0 .66 .66 .66 0.4 0 .66 .66 .66 0.4 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
        </filter>
        <filter id="noisier">
          <feTurbulence baseFrequency="0.50" result="colorNoise" />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values=".3 .3 .3 0.4 0 .3 .3 .3 0.4 0 .3 .3 .3 0.4 0 0 0 0 1.2 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
        </filter>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
    </>
  );
}
