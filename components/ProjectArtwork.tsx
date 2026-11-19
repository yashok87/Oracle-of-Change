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
      // Suprematist Solar Eclipse & Compass (Red circle + black square + blue cross)
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1a0a08' : '#111111'} />
          <g className="origin-center transition-transform duration-300 group-hover:rotate-12">
            <rect
              x="11"
              y="11"
              width="20"
              height="20"
              transform="rotate(-14 21 21)"
              fill={isRenoir ? '#78350f' : '#2563eb'}
              opacity={isRenoir ? 0.85 : 0.9}
            />
          </g>
          <circle
            cx="28"
            cy="24"
            r="10"
            className="origin-center transition-transform duration-300 group-hover:scale-110"
            fill={isRenoir ? '#f59e0b' : '#dc2626'}
          />
          <line x1="8" y1="36" x2="40" y2="12" stroke={isRenoir ? '#fef3c7' : '#ffffff'} strokeWidth="1.75" />
          <circle cx="28" cy="24" r="2.2" fill={isRenoir ? '#1a0a08' : '#111111'} />
        </svg>
      );

    case 'dream':
      // Jungian Nocturne: Deep cobalt/indigo horizon, crescent arc, golden orb & ripples
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#14112b' : '#172554'} />
          <path
            d="M0 30 Q14 25 24 30 T48 30 L48 48 L0 48 Z"
            fill={isRenoir ? '#2e1065' : '#1e3a8a'}
          />
          <circle
            cx="24"
            cy="19"
            r="9"
            className="origin-center transition-transform duration-300 group-hover:-translate-y-0.5"
            fill={isRenoir ? '#fbbf24' : '#facc15'}
          />
          <circle cx="28" cy="17" r="7.5" fill={isRenoir ? '#14112b' : '#172554'} />
          <line x1="12" y1="35" x2="36" y2="35" stroke={isRenoir ? '#fde68a' : '#93c5fd'} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="39.5" x2="31" y2="39.5" stroke={isRenoir ? '#fde68a' : '#93c5fd'} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'marginalia':
      // Literary Codex: Open pages, ruled lines, crimson/amber marginalia ribbon
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1c0d07' : '#f4f1ea'} />
          <rect
            x="9"
            y="10"
            width="14"
            height="28"
            rx="1"
            fill={isRenoir ? '#2b160d' : '#ffffff'}
            stroke={isRenoir ? '#d97706' : '#111111'}
            strokeWidth="1.4"
          />
          <rect
            x="25"
            y="10"
            width="14"
            height="28"
            rx="1"
            fill={isRenoir ? '#2b160d' : '#ffffff'}
            stroke={isRenoir ? '#d97706' : '#111111'}
            strokeWidth="1.4"
          />
          <line x1="12.5" y1="16" x2="19.5" y2="16" stroke={isRenoir ? '#fde68a' : '#111111'} strokeWidth="1.5" />
          <line x1="12.5" y1="21" x2="19.5" y2="21" stroke={isRenoir ? '#fde68a' : '#111111'} strokeWidth="1.5" opacity="0.55" />
          <line x1="12.5" y1="26" x2="18" y2="26" stroke={isRenoir ? '#fde68a' : '#111111'} strokeWidth="1.5" opacity="0.55" />
          <line x1="28.5" y1="16" x2="35.5" y2="16" stroke={isRenoir ? '#f59e0b' : '#dc2626'} strokeWidth="2" />
          <line x1="28.5" y1="21" x2="35.5" y2="21" stroke={isRenoir ? '#fde68a' : '#111111'} strokeWidth="1.5" opacity="0.55" />
          <path
            d="M32 10 L36 10 L36 33 L34 30 L32 33 Z"
            className="transition-transform duration-300 group-hover:translate-y-0.5"
            fill={isRenoir ? '#f59e0b' : '#dc2626'}
          />
        </svg>
      );

    case 'humanism':
      // Classical Arch & Pediment: Roots of Humanism geometric temple
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1d1206' : '#efeae0'} />
          <polygon
            points="24,8 40,18 8,18"
            fill={isRenoir ? '#b45309' : '#ca8a04'}
          />
          <rect x="12" y="20" width="4.5" height="17" fill={isRenoir ? '#fef3c7' : '#111111'} />
          <rect x="21.75" y="20" width="4.5" height="17" fill={isRenoir ? '#f59e0b' : '#dc2626'} />
          <rect x="31.5" y="20" width="4.5" height="17" fill={isRenoir ? '#fef3c7' : '#111111'} />
          <rect x="9" y="37" width="30" height="3.5" fill={isRenoir ? '#d97706' : '#111111'} />
        </svg>
      );

    case 'faith':
      // Suprematist Crossed Beams / Prism
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#240909' : '#0f0f0f'} />
          <g className="origin-center transition-transform duration-300 group-hover:rotate-6">
            <rect x="21.5" y="7" width="5" height="34" fill={isRenoir ? '#fef3c7' : '#ffffff'} />
            <rect x="11" y="16.5" width="26" height="5" fill={isRenoir ? '#f59e0b' : '#dc2626'} />
          </g>
          <polygon
            points="10,39 24,25 38,39"
            fill={isRenoir ? '#d97706' : '#2563eb'}
            opacity="0.7"
          />
        </svg>
      );

    case 'hansard':
      // Acoustic Vinyl & Concentric Resonance Waves
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <rect width="48" height="48" fill={isRenoir ? '#1a0a06' : '#18181b'} />
          <circle
            cx="24"
            cy="24"
            r="15"
            fill="none"
            stroke={isRenoir ? '#92400e' : '#3f3f46'}
            strokeWidth="1.5"
          />
          <circle
            cx="24"
            cy="24"
            r="11"
            fill="none"
            stroke={isRenoir ? '#d97706' : '#71717a'}
            strokeWidth="1.2"
            strokeDasharray="18 6"
            className="origin-center transition-transform duration-500 group-hover:rotate-45"
          />
          <circle cx="24" cy="24" r="6" fill={isRenoir ? '#f59e0b' : '#dc2626'} />
          <circle cx="24" cy="24" r="1.8" fill={isRenoir ? '#1a0a06' : '#ffffff'} />
        </svg>
      );
  }
};
