import React from 'react';
import { useCurrentFrame } from 'remotion';

export const CompoundingArena: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 30%, #172554 0%, #0B1120 50%, #030712 100%)',
      }}
    >
      {/* 3D Perspective Grid Floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-20%',
          right: '-20%',
          height: '55%',
          backgroundImage:
            'linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(65deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 30%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 30%, transparent 95%)',
        }}
      />

      {/* Illuminated Compounding Pillars in Distance */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 36,
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      >
        {[60, 95, 140, 200, 280, 390, 520].map((h, i) => {
          const glow = Math.sin((frame + i * 15) / 20) * 0.2 + 0.8;
          return (
            <div
              key={i}
              style={{
                width: 44,
                height: h,
                background: `linear-gradient(180deg, #38BDF8 0%, rgba(30, 58, 138, 0.2) 100%)`,
                borderRadius: '8px 8px 0 0',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                boxShadow: `0 0 20px rgba(56, 189, 248, ${0.4 * glow})`,
              }}
            />
          );
        })}
      </div>

      {/* Exponential Ambient Light Curve */}
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
        <path
          d="M 200 820 Q 900 800 1300 500 T 1750 150"
          stroke="rgba(249, 115, 22, 0.45)"
          strokeWidth="4"
          strokeDasharray="12 8"
          fill="none"
        />
        <path
          d="M 200 820 Q 900 800 1300 500 T 1750 150 L 1750 1080 L 200 1080 Z"
          fill="url(#exponentialGlow)"
          opacity="0.12"
        />
        <defs>
          <linearGradient id="exponentialGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Sparkles / Particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const py = ((frame * (0.8 + (i % 3) * 0.3) + i * 80) % 900);
        const px = 180 + ((i * 123) % 1550);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 900 - py,
              left: px,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#38BDF8' : '#FB923C',
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#38BDF8' : '#FB923C'}`,
              opacity: 0.6,
            }}
          />
        );
      })}
    </div>
  );
};

