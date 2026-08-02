import { useId } from 'react';

export default function NetflixLogo({ className = 'h-8 w-8', cutoutColor = '#141414' }) {
  const id = useId();

  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Netflix" role="img">
      <defs>
        <linearGradient id={`nf-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6121d" />
          <stop offset="0.55" stopColor="#e50914" />
          <stop offset="1" stopColor="#a50a12" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="6" fill={`url(#nf-grad-${id})`} />
      <g fill={cutoutColor}>
        <rect x="14" y="12" width="8" height="24" />
        <rect x="14" y="31" width="15" height="5" />
        <polygon points="22,12 33,12 37,36 26,36" />
        <rect x="26" y="12" width="8" height="24" />
        <rect x="19" y="12" width="15" height="5" />
      </g>
    </svg>
  );
}
