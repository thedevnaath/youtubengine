import React from 'react';
import { useCurrentFrame } from 'remotion';

export const StormyHorizon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #090D16 0%, #111827 50%, #1F2937 100%)',
      }}
    >
      {/* Rain streaks */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 45 }).map((_, i) => {
          const speed = 18 + (i % 5) * 4;
          const rx = (i * 47 + frame * 3) % 1920;
          const ry = ((i * 31 + frame * speed) % 1200) - 100;
          return (
            <line
              key={i}
              x1={rx}
              y1={ry}
              x2={rx - 15}
              y2={ry + 45}
              stroke="rgba(148, 163, 184, 0.28)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Cloud Layers */}
      <svg
        viewBox="0 0 1920 400"
        style={{ position: 'absolute', top: 0, width: '100%', opacity: 0.8 }}
      >
        <path
          d="M0 120 Q 300 40 600 130 T 1200 90 T 1800 140 L 1920 120 L 1920 0 L 0 0 Z"
          fill="#0B0F19"
        />
        <path
          d="M0 180 Q 400 110 800 190 T 1500 130 L 1920 180 L 1920 0 L 0 0 Z"
          fill="#111827"
          opacity="0.6"
        />
      </svg>

      {/* Dramatic Breakthrough Light Ray (Hope / Discipline) */}
      <div
        style={{
          position: 'absolute',
          top: -50,
          left: '52%',
          width: 320,
          height: 1000,
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(251, 146, 60, 0.08) 50%, transparent 80%)',
          transform: 'rotate(-20deg)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ground surface */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 240,
          background: 'linear-gradient(180deg, #111827 0%, #030712 100%)',
          borderTop: '2px solid rgba(75, 85, 99, 0.4)',
        }}
      />
    </div>
  );
};

