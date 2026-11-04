import React from 'react';

export const OutputArena: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(155deg, #090D16 0%, #0F172A 60%, #172554 100%)',
      }}
    >
      {/* Concentric Architectural Floor Arcs */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {[200, 380, 560, 740, 920].map((r, i) => (
          <path
            key={i}
            d={`M ${960 - r} 1080 C ${960 - r * 0.7} ${1080 - r * 0.45}, ${960 + r * 0.7} ${1080 - r * 0.45}, ${960 + r} 1080`}
            fill="none"
            stroke="rgba(56, 189, 248, 0.12)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        ))}

        {/* Ambient perspective lines converging to horizon */}
        <line x1="200" y1="1080" x2="960" y2="700" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
        <line x1="1720" y1="1080" x2="960" y2="700" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
        <line x1="600" y1="1080" x2="960" y2="700" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
        <line x1="1320" y1="1080" x2="960" y2="700" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />

        {/* Curved Ground Platform */}
        <path
          d="M 160 840 C 600 800, 1320 800, 1760 840 L 1760 1080 L 160 1080 Z"
          fill="rgba(15, 23, 42, 0.85)"
        />
        <path
          d="M 160 840 C 600 800, 1320 800, 1760 840"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Ambient Lighting Blooms */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
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
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

