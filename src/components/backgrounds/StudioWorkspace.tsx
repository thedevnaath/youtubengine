import React from 'react';

interface StudioWorkspaceProps {
  layer?: 'bg' | 'fg' | 'both';
  style?: React.CSSProperties;
}

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({ layer = 'both', style = {} }) => {
  const showBg = layer === 'bg' || layer === 'both';
  const defaultZIndex = layer === 'fg' ? 18 : layer === 'bg' ? 5 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: defaultZIndex,
        ...style,
      }}
    >
      {/* BACKGROUND LAYER */}
      {showBg && (
        <>
          {/* Wall background gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #0B1120 0%, #0F172A 50%, #1E293B 100%)',
            }}
          />

          {/* Studio Window with Rounded Arch on the Right */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              right: 120,
              width: 520,
              height: 480,
              borderRadius: '260px 260px 24px 24px', // arched top
              backgroundColor: '#020617',
              border: '6px solid #334155',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.8), 0 20px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* City skyline silhouettes inside window with curved roofs and lit windows */}
            <svg viewBox="0 0 520 480" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
              <path d="M 0 320 C 140 300, 320 330, 520 310 L 520 480 L 0 480 Z" fill="#0A0F1D" />
              <rect x="40" y="220" width="70" height="260" rx="8" fill="#0F172A" />
              <rect x="130" y="160" width="90" height="320" rx="10" fill="#1E293B" />
              <rect x="240" y="270" width="70" height="210" rx="6" fill="#0F172A" />
              <rect x="330" y="190" width="100" height="290" rx="10" fill="#1E293B" />
              <rect x="450" y="240" width="60" height="240" rx="6" fill="#0F172A" />

              {/* Lit window squares */}
              {[
                { x: 150, y: 190 }, { x: 180, y: 190 },
                { x: 150, y: 220 }, { x: 180, y: 220 },
                { x: 350, y: 230 }, { x: 380, y: 230 },
                { x: 60, y: 250 }, { x: 80, y: 280 },
              ].map((w, idx) => (
                <rect
                  key={idx}
                  x={w.x}
                  y={w.y}
                  width="10"
                  height="12"
                  rx="2"
                  fill={idx % 2 === 0 ? '#FDE047' : '#38BDF8'}
                  opacity={0.65}
                />
              ))}
            </svg>
          </div>

          {/* Acoustic Wooden Wall Slats with rounded pill shapes */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 60,
              display: 'flex',
              gap: 20,
              opacity: 0.35,
              pointerEvents: 'none',
            }}
          >
            {Array.from({ length: 22 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 440,
                  borderRadius: 8,
                  background: 'linear-gradient(180deg, #334155 0%, #1E293B 100%)',
                }}
              />
            ))}
          </div>

          {/* Warm Pendant Lamp casting a soft spotlight */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 650,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <div style={{ width: 3, height: 160, backgroundColor: '#475569' }} />
            <div
              style={{
                width: 76,
                height: 38,
                borderRadius: '16px 16px 4px 4px',
                backgroundColor: '#1E293B',
                border: '2px solid #475569',
              }}
            />
            {/* Soft radial cone */}
            <div
              style={{
                position: 'absolute',
                top: 190,
                width: 500,
                height: 600,
                background: 'radial-gradient(ellipse at top, rgba(251, 146, 60, 0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
                transform: 'translateX(-50%)',
                left: 38,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
