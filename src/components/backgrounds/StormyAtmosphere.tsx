import React from 'react';
import { useCurrentFrame } from 'remotion';

export const StormyAtmosphere: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020617 0%, #0F172A 45%, #1E293B 80%, #0B1120 100%)',
      }}
    >
      {/* Breakthrough Light Ray from behind the clouds */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '55%',
          transform: 'translateX(-50%) rotate(18deg)',
          width: 220,
          height: 1000,
          background: 'linear-gradient(180deg, rgba(251, 146, 60, 0.22) 0%, rgba(253, 224, 71, 0.08) 50%, transparent 95%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* SVG Layered Smooth Bezier Storm Clouds & Wet Horizon */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cloudFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1120" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cloudFore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="wetGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="30%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* High Rolling Storm Cloud Bank: Smooth Bezier C Bulges */}
        <path
          d="M 0 0 L 1920 0 L 1920 320 C 1700 360, 1500 280, 1300 340 C 1100 400, 900 310, 700 360 C 500 410, 300 300, 0 350 Z"
          fill="url(#cloudFar)"
        />

        {/* Mid Lower Storm Cloud Bulges */}
        <path
          d="M 0 0 L 1920 0 L 1920 220 C 1650 260, 1420 180, 1200 240 C 980 300, 750 210, 520 260 C 300 310, 120 230, 0 280 Z"
          fill="url(#cloudFore)"
          opacity="0.85"
        />

        {/* Wet Reflective Smooth Curved Ground Plane */}
        <path
          d="M 0 810 C 480 770, 1020 830, 1500 785 C 1720 765, 1850 790, 1920 780 L 1920 1080 L 0 1080 Z"
          fill="url(#wetGround)"
        />

        {/* Curved Ground Horizon Water Glint */}
        <path
          d="M 0 810 C 480 770, 1020 830, 1500 785 C 1720 765, 1850 790, 1920 780"
          stroke="rgba(249, 115, 22, 0.4)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Rain Streaks - Angled and animated dynamically */}
        {Array.from({ length: 32 }).map((_, i) => {
          const rx = ((i * 63 + frame * 18) % 1920);
          const ry = ((i * 37 + frame * 32) % 650) + 150;
          return (
            <line
              key={i}
              x1={rx}
              y1={ry}
              x2={rx - 12}
              y2={ry + 42}
              stroke="rgba(148, 163, 184, 0.28)"
              strokeWidth={i % 3 === 0 ? 2 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Puddle reflections on ground */}
        {[
          { cx: 450, cy: 920, rx: 120, ry: 18 },
          { cx: 960, cy: 890, rx: 180, ry: 24 },
          { cx: 1480, cy: 950, rx: 140, ry: 20 },
        ].map((p, idx) => (
          <ellipse
            key={idx}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill="rgba(56, 189, 248, 0.12)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
};

