interface IconProps {
  size?: number;
}

export const SolidIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Solid"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export const LiquidIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Liquid"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

export const GasIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Gas"
  >
    <path d="M17.7 7.7a7.5 7.5 0 1 0-10.6 10.6" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 3l3 3" />
    <path d="M18 18l3 3" />
  </svg>
);

export const PrimordialIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Primordial"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export const FromDecayIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="From Decay"
  >
    <path d="M19 15A8 8 0 1 0 15 19" />
    <circle cx="19" cy="19" r="2" />
  </svg>
);

export const SyntheticIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Synthetic"
  >
    <path d="M9 3h6" />
    <path d="M10 3v7.4L6 18a2 2 0 0 0 1.7 3h8.6a2 2 0 0 0 1.7-3l-4-7.6V3" />
    <path d="M7 17h10" />
  </svg>
);

export const RadioactiveIcon = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="var(--color-radioactive)"
    stroke="var(--color-radioactive)"
    role="img"
    aria-label="Radioactive"
  >
    <circle cx="12" cy="12" r="11" fill="none" strokeWidth="1.5" />
    <path
      d="M10.25 8.97 A3.5 3.5 0 0 1 13.75 8.97 L16.5 4.21 A9 9 0 0 0 7.5 4.21 Z"
      stroke="none"
    />
    <path
      d="M15.5 12 A3.5 3.5 0 0 1 13.75 15.03 L16.5 19.79 A9 9 0 0 0 21 12 Z"
      stroke="none"
    />
    <path
      d="M10.25 15.03 A3.5 3.5 0 0 1 8.5 12 L3 12 A9 9 0 0 0 7.5 19.79 Z"
      stroke="none"
    />
    <circle cx="12" cy="12" r="2" stroke="none" />
  </svg>
);
