import React from 'react';

export const GreenFieldDawn: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 35%, #312E81 60%, #9A3412 85%, #EA580C 100%)',
      }}
    >
      {/* Sunrise Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 240,
          left: '48%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.45) 0%, rgba(249, 115, 22, 0.25) 50%, transparent 80%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* Vector Environment - 100% Smooth Bezier Curves (No triangles) */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="farMountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E1065" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="midHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14532D" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="foreHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#052E16" />
          </linearGradient>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(253, 224, 71, 0.2)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.3)" />
          </linearGradient>
        </defs>

        {/* Far Distant Mountain Ridges: Smooth Rolling Bezier Waves */}
        <path
          d="M 0 620 C 320 540, 600 660, 960 560 C 1320 460, 1620 590, 1920 520 L 1920 1080 L 0 1080 Z"
          fill="url(#farMountain)"
        />

        {/* Mid-ground Rolling Hills (Smooth C curves) */}
        <path
          d="M 0 710 C 280 640, 640 760, 1020 680 C 1400 600, 1720 720, 1920 660 L 1920 1080 L 0 1080 Z"
          fill="url(#midHill)"
          opacity="0.9"
        />

        {/* Minimalist Rounded Foliage Trees on the Hills */}
        {[240, 520, 880, 1340, 1680].map((tx, idx) => (
          <g key={idx}>
            {/* Trunk */}
            <path
              d={`M ${tx} 700 Q ${tx + 2} 725 ${tx} 740`}
              stroke="#064E3B"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Smooth rounded tree canopy */}
            <circle cx={tx} cy={690} r={18} fill="#166534" />
            <circle cx={tx - 10} cy={696} r={14} fill="#15803D" />
            <circle cx={tx + 10} cy={696} r={14} fill="#14532D" />
          </g>
        ))}

        {/* Foreground Lush Hill (Ground Plane) */}
        <path
          d="M 0 820 C 450 780, 980 840, 1420 800 C 1680 775, 1840 810, 1920 795 L 1920 1080 L 0 1080 Z"
          fill="url(#foreHill)"
        />

        {/* Smooth Curved Walking Path */}
        <path
          d="M 0 850 C 500 810, 1020 860, 1500 825 C 1720 810, 1860 830, 1920 820"
          stroke="url(#pathGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

