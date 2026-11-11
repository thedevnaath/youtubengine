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

/**
 * Frameless Visual Bar Monument (Zero card boxes, Zero slide deck panels)
 * Contrasts tiny fleeting motivation against a towering 365-unit volume skyscraper.
 */
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
  const motivationHeight = 65;
  const volumeHeight = interpolate(progress, [0, 1], [15, maxHeight]);
  const currentCount = Math.round(progress * 365);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -100%) scale(${interpolate(popSpring, [0, 1], [0.85, 1])})`,
        opacity: interpolate(popSpring, [0, 1], [0, 1]),
        display: 'flex',
        alignItems: 'flex-end',
        gap: 50,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {/* 1. Fleeting Motivation Pillar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 140 }}>
        <div
          style={{
            width: 110,
            height: motivationHeight,
            borderRadius: '16px 16px 0 0',
            background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
            borderTop: '3px solid #EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 24, fontWeight: 900, color: '#F87171' }}>
            15%
          </span>
        </div>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            marginTop: 14,
            fontSize: 22,
            fontWeight: 800,
            color: '#94A3B8',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          Motivation
          <span style={{ display: 'block', fontSize: 15, color: '#64748B', fontWeight: 700 }}>
            Fleeting
          </span>
        </span>
      </div>

      {/* 2. Towering 365 Volume Skyscraper */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
        <div
          style={{
            width: 220,
            height: volumeHeight,
            borderRadius: '24px 24px 0 0',
            background: 'linear-gradient(180deg, #FF6B00 0%, #EA580C 40%, #C2410C 100%)',
            borderTop: '4px solid #FFA040',
            borderLeft: '2px solid rgba(255, 160, 64, 0.4)',
            borderRight: '2px solid rgba(255, 160, 64, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 16px',
            boxShadow: '0 0 55px rgba(255, 107, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Stacked lines representing 365 daily outputs */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.18) 2px, transparent 2px)',
              backgroundSize: '100% 24px',
              opacity: 0.65,
            }}
          />

          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              zIndex: 2,
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            VOLUME
          </span>

          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 60,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1,
                textShadow: '0 4px 16px rgba(0,0,0,0.8)',
              }}
            >
              {currentCount}
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 18,
                fontWeight: 800,
                color: '#FED7AA',
                marginTop: 4,
              }}
            >
              DAILY OUTPUTS
            </span>
          </div>

          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 18,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              zIndex: 2,
            }}
          >
            UNFAIR ADVANTAGE
          </span>
        </div>

        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            marginTop: 14,
            fontSize: 26,
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          365-Day Volume
          <span style={{ display: 'block', fontSize: 16, color: '#FF6B00', fontWeight: 800 }}>
            Compounded Mastery
          </span>
        </span>
      </div>
    </div>
  );
};
