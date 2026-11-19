import React from 'react';

export type ProjectArtId =
  | 'oracle'
  | 'dream'
  | 'marginalia'
  | 'humanism'
  | 'faith'
  | 'hansard';

interface ProjectArtworkProps {
  id: ProjectArtId;
  isRenoir: boolean;
}

export const ProjectArtwork: React.FC<ProjectArtworkProps> = ({ id, isRenoir }) => {
  switch (id) {
    case 'oracle':
      // Softened Suprematist Solar Eclipse & Compass
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1a0a08' : '#f3f1ec'} />
          <g className="origin-center transition-transform duration-300 group-hover:rotate-12">
            <rect
              x="12"
              y="12"
              width="18"
              height="18"
              transform="rotate(-14 21 21)"
              fill={isRenoir ? '#78350f' : '#3b82f6'}
              opacity={isRenoir ? 0.55 : 0.42}
            />
          </g>
          <circle
            cx="28"
            cy="24"
            r="9.5"
            className="origin-center transition-transform duration-300 group-hover:scale-110"
            fill={isRenoir ? '#d97706' : '#dc2626'}
            opacity={isRenoir ? 0.72 : 0.68}
          />
          <line
            x1="9"
            y1="35"
            x2="39"
            y2="13"
            stroke={isRenoir ? '#fde68a' : '#18181b'}
            strokeWidth="1.4"
            opacity="0.65"
          />
          <circle cx="28" cy="24" r="2" fill={isRenoir ? '#1a0a08' : '#faf9f6'} opacity="0.85" />
        </svg>
      );

    case 'dream':
      // Softened Jungian Nocturne: muted horizon, crescent arc & ripples
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#160d18' : '#e9edf4'} />
          <path
            d="M0 30 Q14 26 24 30 T48 30 L48 48 L0 48 Z"
            fill={isRenoir ? '#2b1838' : '#cbd5e1'}
            opacity={isRenoir ? 0.75 : 0.7}
          />
          <circle
            cx="24"
            cy="19"
            r="8.5"
            className="origin-center transition-transform duration-300 group-hover:-translate-y-0.5"
            fill={isRenoir ? '#eab308' : '#3b82f6'}
            opacity={isRenoir ? 0.72 : 0.55}
          />
          <circle cx="27.5" cy="17.2" r="7" fill={isRenoir ? '#160d18' : '#e9edf4'} />
          <line
            x1="13"
            y1="35"
            x2="35"
            y2="35"
            stroke={isRenoir ? '#fcd34d' : '#334155'}
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.55"
          />
          <line
            x1="17.5"
            y1="39.5"
            x2="30.5"
            y2="39.5"
            stroke={isRenoir ? '#fcd34d' : '#334155'}
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      );

    case 'marginalia':
      // Softened Literary Codex: parchment pages, muted ink lines & ribbon
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1c0d07' : '#f5f2eb'} />
          <rect
            x="9.5"
            y="10.5"
            width="13.5"
            height="27"
            rx="1"
            fill={isRenoir ? '#26130b' : '#ffffff'}
            stroke={isRenoir ? '#b45309' : '#27272a'}
            strokeWidth="1.2"
            opacity="0.75"
          />
          <rect
            x="25"
            y="10.5"
            width="13.5"
            height="27"
            rx="1"
            fill={isRenoir ? '#26130b' : '#ffffff'}
            stroke={isRenoir ? '#b45309' : '#27272a'}
            strokeWidth="1.2"
            opacity="0.75"
          />
          <line x1="12.5" y1="16" x2="19.5" y2="16" stroke={isRenoir ? '#fde68a' : '#27272a'} strokeWidth="1.3" opacity="0.55" />
          <line x1="12.5" y1="21" x2="19.5" y2="21" stroke={isRenoir ? '#fde68a' : '#27272a'} strokeWidth="1.3" opacity="0.35" />
          <line x1="12.5" y1="26" x2="18" y2="26" stroke={isRenoir ? '#fde68a' : '#27272a'} strokeWidth="1.3" opacity="0.35" />
          <line x1="28.5" y1="16" x2="35.5" y2="16" stroke={isRenoir ? '#f59e0b' : '#dc2626'} strokeWidth="1.6" opacity="0.7" />
          <line x1="28.5" y1="21" x2="35.5" y2="21" stroke={isRenoir ? '#fde68a' : '#27272a'} strokeWidth="1.3" opacity="0.35" />
          <path
            d="M32 10.5 L35.5 10.5 L35.5 32.5 L33.75 29.8 L32 32.5 Z"
            className="transition-transform duration-300 group-hover:translate-y-0.5"
            fill={isRenoir ? '#d97706' : '#dc2626'}
            opacity="0.68"
          />
        </svg>
      );

    case 'humanism':
      // Softened Classical Arch & Pediment
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1b1007' : '#f2efe8'} />
          <polygon
            points="24,9 39,18.5 9,18.5"
            fill={isRenoir ? '#b45309' : '#ca8a04'}
            opacity={isRenoir ? 0.7 : 0.45}
          />
          <rect x="12.5" y="20.5" width="4" height="16" fill={isRenoir ? '#fde68a' : '#27272a'} opacity="0.55" />
          <rect x="22" y="20.5" width="4" height="16" fill={isRenoir ? '#f59e0b' : '#dc2626'} opacity="0.65" />
          <rect x="31.5" y="20.5" width="4" height="16" fill={isRenoir ? '#fde68a' : '#27272a'} opacity="0.55" />
          <rect x="10" y="36.5" width="28" height="3" fill={isRenoir ? '#d97706' : '#27272a'} opacity="0.6" />
        </svg>
      );

    case 'faith':
      // Softened Suprematist Crossed Beams & Prism
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1e0908' : '#efece7'} />
          <g className="origin-center transition-transform duration-300 group-hover:rotate-6">
            <rect x="21.75" y="8" width="4.5" height="32" fill={isRenoir ? '#fef3c7' : '#27272a'} opacity="0.55" />
            <rect x="12" y="16.5" width="24" height="4.5" fill={isRenoir ? '#d97706' : '#dc2626'} opacity="0.65" />
          </g>
          <polygon
            points="11,38 24,26 37,38"
            fill={isRenoir ? '#92400e' : '#3b82f6'}
            opacity="0.38"
          />
        </svg>
      );

    case 'hansard':
      // Softened Acoustic Vinyl & Concentric Resonance Waves
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#180a07' : '#f1efeb'} />
          <circle
            cx="24"
            cy="24"
            r="14.5"
            fill="none"
            stroke={isRenoir ? '#92400e' : '#27272a'}
            strokeWidth="1.4"
            opacity="0.4"
          />
          <circle
            cx="24"
            cy="24"
            r="10.5"
            fill="none"
            stroke={isRenoir ? '#d97706' : '#3b82f6'}
            strokeWidth="1.2"
            strokeDasharray="18 6"
            opacity="0.6"
            className="origin-center transition-transform duration-500 group-hover:rotate-45"
          />
          <circle cx="24" cy="24" r="5.5" fill={isRenoir ? '#d97706' : '#dc2626'} opacity="0.68" />
          <circle cx="24" cy="24" r="1.8" fill={isRenoir ? '#180a07' : '#f1efeb'} opacity="0.9" />
        </svg>
      );
  }
};
