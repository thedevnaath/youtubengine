import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CompoundingArena } from '../backgrounds/CompoundingArena';
import { Stickman, StickmanPose } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import {
  Sun,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Zap,
} from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneFourPillars: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exactly synchronized to measured word timestamps:
  // Relative f84 (global 1398 / 46.60s): "First, it kills overthinking"
  // Relative f257 (global 1571 / 52.36s): "Second, it builds proof"
  // Relative f443 (global 1757 / 58.58s): "Third, it compounds"
  // Relative f626 (global 1940 / 64.68s): "And fourth, it rewires your identity"
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const p1Spring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const p2Spring = spring({
    frame: frame - 245,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const p3Spring = spring({
    frame: frame - 430,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const p4Spring = spring({
    frame: frame - 615,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  // Dynamic character posture through the 4 stages
  let stickmanPose: StickmanPose = 'thinking';
  if (frame > 245 && frame <= 430) stickmanPose = 'pointing';
  else if (frame > 430 && frame <= 615) stickmanPose = 'pushing';
  else if (frame > 615) stickmanPose = 'celebrating';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="zoom-out" durationInFrames={durationInFrames} intensity={1.08}>
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
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                border: '1px solid rgba(249, 115, 22, 0.45)',
                color: '#FB923C',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              <Zap size={20} color="#FB923C" />
              The 4 Pillars of Transformation
            </div>

            <h1
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [35, 0])}px)`,
                fontSize: 56,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Why Daily Output <span style={{ color: '#FF6B00' }}>Changes Everything</span>
            </h1>
          </div>

          {/* 4 Pillars Grid (2x2) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              maxWidth: 1380,
            }}
          >
            {/* Pillar 1: Kills Overthinking */}
            <div
              style={{
                opacity: Math.max(0, p1Spring),
                transform: `translateY(${interpolate(p1Spring, [0, 1], [35, 0])}px)`,
                padding: '24px 28px',
                borderRadius: 22,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sun size={24} color="#38BDF8" />
                </div>
                <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
                  1. Kills Overthinking
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 20, color: '#94A3B8', lineHeight: 1.4 }}>
                Stop planning your life at <span style={{ color: '#EF4444' }}>2:00 AM</span> — start
                building it at <span style={{ color: '#38BDF8', fontWeight: 700 }}>2:00 PM</span>.
              </p>
            </div>

            {/* Pillar 2: Builds Proof */}
            <div
              style={{
                opacity: Math.max(0, p2Spring),
                transform: `translateY(${interpolate(p2Spring, [0, 1], [35, 0])}px)`,
                padding: '24px 28px',
                borderRadius: 22,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(52, 211, 153, 0.4)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: 'rgba(52, 211, 153, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldCheck size={26} color="#34D399" />
                </div>
                <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
                  2. Builds Real Proof
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 20, color: '#94A3B8', lineHeight: 1.4 }}>
                Confidence does not come from affirmations. It comes from{' '}
                <span style={{ color: '#34D399', fontWeight: 700 }}>undeniable evidence</span>.
              </p>
            </div>

            {/* Pillar 3: Compounds */}
            <div
              style={{
                opacity: Math.max(0, p3Spring),
                transform: `translateY(${interpolate(p3Spring, [0, 1], [35, 0])}px)`,
                padding: '24px 28px',
                borderRadius: 22,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(249, 115, 22, 0.4)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: 'rgba(249, 115, 22, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUp size={26} color="#FB923C" />
                </div>
                <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
                  3. Compounding Effect
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 20, color: '#94A3B8', lineHeight: 1.4 }}>
                <span style={{ color: '#FB923C', fontWeight: 700 }}>365 small outputs</span> create
                an impossible, unfair competitive advantage.
              </p>
            </div>

            {/* Pillar 4: Identity Shift */}
            <div
              style={{
                opacity: Math.max(0, p4Spring),
                transform: `translateY(${interpolate(p4Spring, [0, 1], [35, 0])}px)`,
                padding: '24px 28px',
                borderRadius: 22,
                background:
                  'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)',
                border: '2px solid #FF6B00',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 15px 35px rgba(249, 115, 22, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: 'rgba(249, 115, 22, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <UserCheck size={26} color="#FF6B00" />
                </div>
                <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
                  4. Rewires Your Identity
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 20, color: '#FED7AA', lineHeight: 1.4 }}>
                You stop wishing to be disciplined — you become someone who{' '}
                <span style={{ color: '#FFFFFF', fontWeight: 900 }}>produces daily</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Character on Right */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 120,
            zIndex: 15,
          }}
        >
          <Stickman pose={stickmanPose} scale={1.45} color="#FF6B00" />
        </div>
      </CameraRig>
    </div>
  );
};
