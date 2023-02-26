const SVGFilters = () => (
  <>
    <svg className="invisible hidden">
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
    </svg>
    <svg className="invisible hidden">
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
    </svg>
    <svg className="invisible hidden">
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </svg>
  </>
);

export default SVGFilters;
