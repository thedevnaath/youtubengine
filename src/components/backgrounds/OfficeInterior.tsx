import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const OfficeInterior: React.FC = () => {
  const frame = useCurrentFrame();

  // Screen glow subtle flicker and warm pendant lamp swing
  const screenFlicker = Math.sin(frame * 0.4) * 0.03 + 0.97;
  const lampDrift = Math.sin((frame * 2 * Math.PI) / 120) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0F172A 0%, #090D16 100%)',
      }}
    >
      {/* Wooden Slats Accent Wall */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: '45%',
          bottom: 280,
          display: 'flex',
          gap: 16,
          paddingLeft: 60,
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: '100%',
              background: 'linear-gradient(180deg, #334155 0%, #1E293B 100%)',
              borderRadius: 3,
            }}
          />
        ))}
      </div>

      {/* Large Studio Window on the Right overlooking City */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 80,
          width: 580,
          height: 520,
          borderRadius: 24,
          border: '8px solid #1E293B',
          background: 'linear-gradient(180deg, #020617 0%, #0F172A 70%, #1E1B4B 100%)',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 20px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* City skyline silhouettes inside window */}
        <svg
          viewBox="0 0 580 520"
          style={{ position: 'absolute', bottom: 0, width: '100%' }}
        >
          {/* Distant Towers */}
          <rect x="40" y="220" width="70" height="300" fill="#090D16" />
          <rect x="130" y="160" width="90" height="360" fill="#0C1322" />
          <rect x="240" y="280" width="60" height="240" fill="#090D16" />
          <rect x="320" y="190" width="100" height="330" fill="#0C1322" />
          <rect x="440" y="240" width="80" height="280" fill="#090D16" />

          {/* Glowing Windows */}
          {[
            { x: 150, y: 190 }, { x: 170, y: 190 }, { x: 190, y: 190 },
            { x: 150, y: 220 }, { x: 190, y: 220 },
            { x: 340, y: 230 }, { x: 370, y: 230 }, { x: 400, y: 230 },
            { x: 340, y: 260 }, { x: 370, y: 260 },
            { x: 60, y: 250 }, { x: 80, y: 280 },
          ].map((w, idx) => (
            <rect
              key={idx}
              x={w.x}
              y={w.y}
              width="8"
              height="10"
              fill={idx % 2 === 0 ? '#FDE047' : '#38BDF8'}
              opacity={0.7}
            />
          ))}

          {/* Window pane divider grid */}
          <line x1="290" y1="0" x2="290" y2="520" stroke="#1E293B" strokeWidth="6" />
          <line x1="0" y1="260" x2="580" y2="260" stroke="#1E293B" strokeWidth="6" />
        </svg>
      </div>

      {/* Warm Hanging Pendant Lamp */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 560 + lampDrift,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ width: 2, height: 180, backgroundColor: '#475569' }} />
        <div
          style={{
            width: 70,
            height: 40,
            background: 'linear-gradient(180deg, #1E293B 0%, #F97316 100%)',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            borderRadius: '4px 4px 0 0',
          }}
        />
        {/* Spotlight cone illuminating workspace */}
        <div
          style={{
            position: 'absolute',
            top: 220,
            width: 480,
            height: 600,
            background: 'radial-gradient(ellipse at top, rgba(251, 146, 60, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
            transform: 'translateX(-50%)',
            left: 35,
          }}
        />
      </div>

      {/* Desk Surface (Isometric Minimalist Block) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
          borderTop: '4px solid #334155',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Desk mat */}
        <div
          style={{
            position: 'absolute',
            top: 25,
            left: '25%',
            width: 700,
            height: 140,
            borderRadius: 16,
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
          }}
        />

        {/* Ultrawide Monitor Stand & Screen */}
        <div
          style={{
            position: 'absolute',
            top: -190,
            left: '28%',
            width: 580,
            height: 240,
            borderRadius: 14,
            backgroundColor: '#020617',
            border: '4px solid #334155',
            boxShadow: `0 0 35px rgba(56, 189, 248, ${0.18 * screenFlicker}), 0 20px 40px rgba(0,0,0,0.7)`,
            overflow: 'hidden',
          }}
        >
          {/* Active Screen Code / Output Dashboard Graphic */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            </div>
            {/* Glowing editor lines */}
            {[75, 45, 90, 60, 80, 50, 70].map((width, idx) => (
              <div
                key={idx}
                style={{
                  height: 8,
                  width: `${width}%`,
                  borderRadius: 4,
                  backgroundColor: idx === 2 ? '#38BDF8' : idx === 4 ? '#F97316' : '#334155',
                  marginBottom: 10,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

