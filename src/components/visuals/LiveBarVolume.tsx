import React from 'react';
import { interpolate, spring } from 'remotion';

interface LiveBarVolumeProps {
  frame: number;
  fps: number;
  startFrame: number;
  durationInFrames?: number;
  x?: number;
  y?: number;
}

export const LiveBarVolume: React.FC<LiveBarVolumeProps> = ({
  frame,
  fps,
  startFrame,
  durationInFrames = 75,
  x = 0,
  y = 0,
}) => {
  if (frame < startFrame) return null;

  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const popSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const maxHeight = 460;
  const motivationHeight = 70;
  const volumeHeight = interpolate(progress, [0, 1], [10, maxHeight]);
  const currentCount = Math.round(progress * 365);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${interpolate(popSpring, [0, 1], [0.85, 1])})`,
        opacity: interpolate(popSpring, [0, 1], [0, 1]),
        display: 'flex',
        alignItems: 'flex-end',
        gap: 60,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {/* Motivation Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 180 }}>
        <div
          style={{
            width: 140,
            height: motivationHeight,
            borderRadius: '16px 16px 0 0',
            backgroundColor: 'rgba(239, 68, 68, 0.4)',
            border: '2px solid #EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 900, color: '#F87171' }}>15%</span>
        </div>
        <span style={{ marginTop: 14, fontSize: 20, fontWeight: 800, color: '#94A3B8', textAlign: 'center' }}>
          Motivation
          <span style={{ display: 'block', fontSize: 14, color: '#64748B', fontWeight: 600 }}>
            (Fleeting)
          </span>
        </span>
      </div>

      {/* Monolithic Volume Skyscraper */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 240 }}>
        <div
          style={{
            width: 200,
            height: volumeHeight,
            borderRadius: '24px 24px 0 0',
            backgroundColor: '#FF6B00',
            border: '3px solid #FFA040',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 14px',
            boxShadow: '0 0 50px rgba(255, 107, 0, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle segmented lines for 365 daily outputs */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)',
              backgroundSize: '100% 24px',
              opacity: 0.6,
            }}
          />

          <span style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', zIndex: 2 }}>
            VOLUME
          </span>

          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
              {currentCount}
            </span>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#FED7AA' }}>
              DAILY OUTPUTS
            </span>
          </div>

          <span style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', zIndex: 2 }}>
            100% UNFAIR
          </span>
        </div>
        <span style={{ marginTop: 14, fontSize: 24, fontWeight: 900, color: '#FFFFFF', textAlign: 'center' }}>
          365-Day Volume
          <span style={{ display: 'block', fontSize: 15, color: '#FF6B00', fontWeight: 700 }}>
            (Compounded Mastery)
          </span>
        </span>
      </div>
    </div>
  );
};

