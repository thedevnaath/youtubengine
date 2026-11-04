import React from 'react';
import { useCurrentFrame } from 'remotion';

export const SummitPanorama: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #090D16 0%, #1E1B4B 35%, #4C1D95 60%, #9A3412 85%, #EA580C 100%)',
      }}
    >
      {/* Majestic Golden Sunrise Glow on Horizon */}
      <div
        style={{
          position: 'absolute',
          bottom: 300,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 450,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.5) 0%, rgba(249, 115, 22, 0.35) 45%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* SVG Layered Mountain Ridges - 100% Smooth Bezier Curves (Never sharp triangles) */}
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
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312E81" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ridgeMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#581C87" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C2D12" />
            <stop offset="100%" stopColor="#0B1120" />
          </linearGradient>
          <linearGradient id="summitPlateau" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="15%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="mistGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(254, 215, 170, 0)" />
            <stop offset="50%" stopColor="rgba(254, 215, 170, 0.25)" />
            <stop offset="100%" stopColor="rgba(254, 215, 170, 0)" />
          </linearGradient>
        </defs>

        {/* Deep Horizon Mountain Ridge (Smooth C waves) */}
        <path
          d="M 0 540 C 280 480, 520 590, 840 510 C 1160 430, 1460 560, 1920 480 L 1920 1080 L 0 1080 Z"
          fill="url(#ridgeFar)"
        />

        {/* Rolling Mist Layer 1 */}
        <ellipse
          cx={960 + Math.sin(frame / 50) * 40}
          cy={560}
          rx={800}
          ry={55}
          fill="url(#mistGrad)"
          filter="blur(16px)"
        />

        {/* Mid-range Grand Mountain Crests (Smooth rounded arcs, no sharp points) */}
        <path
          d="M 0 640 C 350 560, 680 690, 1080 600 C 1480 510, 1720 630, 1920 580 L 1920 1080 L 0 1080 Z"
          fill="url(#ridgeMid)"
          opacity="0.95"
        />

        {/* Rolling Mist Layer 2 */}
        <ellipse
          cx={960 - Math.sin(frame / 60) * 50}
          cy={640}
          rx={900}
          ry={65}
          fill="url(#mistGrad)"
          filter="blur(20px)"
        />

        {/* Near Mountain Shoulder */}
        <path
          d="M 0 740 C 420 670, 840 760, 1260 700 C 1580 650, 1780 730, 1920 690 L 1920 1080 L 0 1080 Z"
          fill="url(#ridgeNear)"
        />

        {/* Foreground Summit Plateau / Rock Outcrop (Curved edge where stickman stands) */}
        <path
          d="M 0 810 C 460 770, 980 810, 1400 780 C 1660 760, 1820 785, 1920 775 L 1920 1080 L 0 1080 Z"
          fill="url(#summitPlateau)"
        />

        {/* Golden Plateau Rim Glint */}
        <path
          d="M 0 810 C 460 770, 980 810, 1400 780 C 1660 760, 1820 785, 1920 775"
          stroke="rgba(254, 215, 170, 0.45)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

