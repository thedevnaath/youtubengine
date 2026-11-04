import React from 'react';

export const TransformationArena: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 25%, #172554 0%, #0B1120 50%, #030712 100%)',
      }}
    >
      {/* Curved Perspective Horizon */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {/* Soft curved floor horizon */}
        <path
          d="M 0 760 C 500 710, 1420 710, 1920 760 L 1920 1080 L 0 1080 Z"
          fill="#0B1120"
          opacity="0.95"
        />

        {/* Curved architectural floor rings */}
        {[100, 240, 420, 640].map((h, i) => (
          <path
            key={i}
            d={`M 0 ${760 + h * 0.4} C 600 ${740 + h * 0.3}, 1320 ${740 + h * 0.3}, 1920 ${760 + h * 0.4}`}
            fill="none"
            stroke="rgba(56, 189, 248, 0.1)"
            strokeWidth="2"
          />
        ))}

        {/* Horizon Rim Highlight */}
        <path
          d="M 0 760 C 500 710, 1420 710, 1920 760"
          stroke="rgba(255, 107, 0, 0.35)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Floating Particles/Stars */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 300,
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

