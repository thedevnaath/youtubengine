import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface DawnHorizonProps {
  intensity?: number;
}

export const DawnHorizon: React.FC<DawnHorizonProps> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();

  // Subtle sun pulsation and floating mist drift
  const sunPulse = Math.sin((frame * 2 * Math.PI) / 90) * 8;
  const mistShift = (frame * 0.4) % 1920;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0B1120 0%, #1E1B4B 45%, #4C1D95 70%, #9A3412 92%, #EA580C 100%)',
      }}
    >
      {/* Stars in upper sky */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {[
          { cx: 200, cy: 120, r: 1.5, o: 0.7 },
          { cx: 450, cy: 80, r: 2, o: 0.8 },
          { cx: 780, cy: 160, r: 1.2, o: 0.5 },
          { cx: 1100, cy: 100, r: 1.8, o: 0.9 },
          { cx: 1420, cy: 140, r: 1.5, o: 0.6 },
          { cx: 1680, cy: 70, r: 2.2, o: 0.75 },
          { cx: 1820, cy: 190, r: 1.3, o: 0.4 },
          { cx: 320, cy: 220, r: 1.4, o: 0.6 },
          { cx: 920, cy: 60, r: 1.6, o: 0.85 },
          { cx: 1250, cy: 210, r: 1.5, o: 0.55 },
        ].map((star, i) => {
          const twinkle = (Math.sin((frame + i * 20) / 15) + 1) / 2;
          return (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#FFFFFF"
              opacity={star.o * (0.4 + twinkle * 0.6)}
            />
          );
        })}
      </svg>

      {/* Sun on Horizon */}
      <div
        style={{
          position: 'absolute',
          bottom: 310,
          left: '50%',
          transform: `translateX(-50%) translateY(${sunPulse}px)`,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FDBA74 0%, #FB923C 40%, rgba(249, 115, 22, 0.4) 70%, transparent 100%)',
          filter: 'blur(6px)',
          boxShadow: '0 0 100px 40px rgba(251, 146, 60, 0.4)',
        }}
      />

      {/* Horizon Vector Layers */}
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
          <linearGradient id="farMountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#431407" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#18181B" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="midMountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#271510" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="foreHillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>
        </defs>

        {/* Far Distant Mountain Ridges */}
        <path
          d="M0 680 L220 540 L480 620 L760 490 L1020 590 L1340 470 L1620 580 L1920 510 L1920 1080 L0 1080 Z"
          fill="url(#farMountainGrad)"
        />

        {/* Mid-ground Mountain Ridges with Sharp Peaks */}
        <path
          d="M0 750 L340 610 L680 730 L940 580 L1260 710 L1580 570 L1920 690 L1920 1080 L0 1080 Z"
          fill="url(#midMountainGrad)"
        />

        {/* Minimalist Pine Tree Silhouettes on Ridge */}
        {[180, 240, 560, 620, 880, 1140, 1420, 1500, 1780].map((tx, idx) => (
          <polygon
            key={idx}
            points={`${tx},710 ${tx - 12},740 ${tx + 12},740`}
            fill="#120D1C"
          />
        ))}

        {/* Foreground Smooth Rolling Hill */}
        <path
          d="M0 860 Q420 780 960 840 T1920 830 L1920 1080 L0 1080 Z"
          fill="url(#foreHillGrad)"
        />

        {/* Subtle Path / Leading Line */}
        <path
          d="M960 840 Q1060 930 1140 1080"
          stroke="rgba(249, 115, 22, 0.25)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Floating Morning Mist Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: -200 + mistShift * 0.2,
          width: '140%',
          height: 120,
          background: 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.14) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

