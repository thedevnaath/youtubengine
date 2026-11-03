import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CompoundingArena } from '../backgrounds/CompoundingArena';
import { Stickman } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import { Award, Sparkles } from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneOneYearVolume: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exactly synchronized to measured word timestamps:
  // Relative f40 (93.5s): "if you do this for one year"
  // Relative f129 (96.5s): "completely different" -> skyscraper peak
  // Relative f205 (99.0s): "Not because of motivation, but because of volume"
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const bar1Spring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  const bar2Spring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 80 },
  });

  const punchSpring = spring({
    frame: frame - 195,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 140 },
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="zoom-in" durationInFrames={durationInFrames} intensity={1.08}>
        <CompoundingArena />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 100px 90px 100px',
            zIndex: 10,
          }}
        >
          {/* Header */}
          <div>
            <div
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 18px',
                borderRadius: 9999,
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38BDF8',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              <Award size={20} color="#38BDF8" />
              The 1-Year Horizon
            </div>

            <h1
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [35, 0])}px)`,
                fontSize: 58,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Your Life Will Look <span style={{ color: '#FF6B00' }}>Completely Different</span>
            </h1>
          </div>

          {/* Comparison Bar Visual */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 80,
              paddingLeft: 60,
              height: 480,
            }}
          >
            {/* Bar 1: Motivation */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 220,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: interpolate(bar1Spring, [0, 1], [0, 110]),
                  borderRadius: '16px 16px 0 0',
                  backgroundColor: 'rgba(239, 68, 68, 0.35)',
                  border: '2px solid rgba(239, 68, 68, 0.7)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 800, color: '#F87171' }}>~15%</span>
              </div>
              <div
                style={{
                  marginTop: 16,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#94A3B8',
                }}
              >
                Motivation Alone
                <span style={{ display: 'block', fontSize: 16, color: '#64748B' }}>
                  (Sporadic & Fleeting)
                </span>
              </div>
            </div>

            {/* Bar 2: The 365 Days Volume Skyscraper */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 320,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: interpolate(bar2Spring, [0, 1], [0, 420]),
                  borderRadius: '24px 24px 0 0',
                  background: 'linear-gradient(180deg, #FF6B00 0%, #EA580C 50%, #9A3412 100%)',
                  boxShadow: '0 0 50px rgba(255, 107, 0, 0.45)',
                  border: '3px solid #FFA040',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px 20px',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={26} color="#FFFFFF" />
                  <span style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF' }}>
                    365 OUTPUTS
                  </span>
                </div>
                <span style={{ fontSize: 48, fontWeight: 900, color: '#FFFFFF' }}>
                  100%
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#FED7AA' }}>
                  Unfair Advantage
                </span>
              </div>
              <div
                style={{
                  marginTop: 16,
                  textAlign: 'center',
                  fontSize: 26,
                  fontWeight: 900,
                  color: '#FFFFFF',
                }}
              >
                Daily Volume
                <span style={{ display: 'block', fontSize: 18, color: '#FF6B00', fontWeight: 700 }}>
                  (The True Compounding Engine)
                </span>
              </div>
            </div>

            {/* Punchy Punch Card on the Right */}
            <div
              style={{
                opacity: Math.max(0, punchSpring),
                transform: `scale(${interpolate(punchSpring, [0, 1], [0.85, 1])})`,
                maxWidth: 480,
                padding: '28px 36px',
                borderRadius: 24,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '2px solid #FF6B00',
                boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 34,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                }}
              >
                NOT BECAUSE OF MOTIVATION.{' '}
                <span style={{ color: '#FF6B00' }}>BECAUSE OF VOLUME.</span>
              </h2>
              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  fontSize: 22,
                  color: '#FED7AA',
                  lineHeight: 1.4,
                  fontWeight: 600,
                }}
              >
                Show up 365 consecutive days. Output changes your market position forever.
              </p>
            </div>
          </div>
        </div>

        {/* Character in Celebrating Pose standing near the towering stack */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            zIndex: 15,
          }}
        >
          <Stickman pose="celebrating" scale={1.4} color="#FF6B00" />
        </div>
      </CameraRig>
    </div>
  );
};
