import React from 'react';
import { useCurrentFrame } from 'remotion';

export const OutputGridBg: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #0A0F1D 0%, #0F172A 60%, #172554 100%)',
      }}
    >
      {/* Clean Blueprint Dot Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(56, 189, 248, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px',
          opacity: 0.85,
        }}
      />

      {/* Subtle Circular Radial Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Blueprint Construction Lines */}
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
        <line
          x1="120"
          y1="180"
          x2="1800"
          y2="180"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="120"
          y1="900"
          x2="1800"
          y2="900"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="260"
          y1="80"
          x2="260"
          y2="1000"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <line
          x1="1660"
          y1="80"
          x2="1660"
          y2="1000"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />

        {/* Blueprint corner crosshairs */}
        {[
          { x: 120, y: 180 },
          { x: 1800, y: 180 },
          { x: 120, y: 900 },
          { x: 1800, y: 900 },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={4} fill="#38BDF8" opacity={0.6} />
            <line x1={pt.x - 12} y1={pt.y} x2={pt.x + 12} y2={pt.y} stroke="#38BDF8" opacity={0.4} />
            <line x1={pt.x} y1={pt.y - 12} x2={pt.x} y2={pt.y + 12} stroke="#38BDF8" opacity={0.4} />
          </g>
        ))}
      </svg>
    </div>
  );
};

