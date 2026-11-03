import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { OfficeInterior } from '../backgrounds/OfficeInterior';
import { Stickman } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import { TrendingDown, ArrowRight, Zap, Ban, Check } from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneMotivationTrap: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Synchronized to audio timestamps:
  // Relative f84 (global 424 / 14.14s): "motivation... fails"
  // Relative f348 (global 688 / 22.92s): "daily non-negotiable output"
  // Relative f472 (global 812 / 27.06s): "produce something, not consume, produce"
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const cardLeftSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const cardRightSpring = spring({
    frame: frame - 320,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 110 },
  });

  const ruleSpring = spring({
    frame: frame - 460,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 130 },
  });

  // Stickman pose transitions from slumped to energetic working at the desk
  const stickmanPose = frame < 220 ? 'slumped' : 'working';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="pan-right" durationInFrames={durationInFrames} intensity={1.05}>
        <OfficeInterior />

        {/* Content Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '70px 100px',
            zIndex: 10,
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: 1100, marginBottom: 30 }}>
            <div
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 20px',
                borderRadius: 9999,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.45)',
                color: '#F87171',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              <TrendingDown size={20} color="#F87171" />
              The Motivation Paradox
            </div>

            <h1
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [35, 0])}px)`,
                fontSize: 60,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Motivation Usually Fails.{' '}
              <span style={{ color: '#FF6B00' }}>You Need A Keystone Habit.</span>
            </h1>
          </div>

          {/* Center Split: Consume vs Produce */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 30,
              maxWidth: 1200,
            }}
          >
            {/* The Trap: Consumption */}
            <div
              style={{
                opacity: Math.max(0, cardLeftSpring),
                transform: `scale(${interpolate(cardLeftSpring, [0, 1], [0.85, 1])})`,
                flex: 1,
                padding: '24px 30px',
                borderRadius: 24,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Ban size={28} color="#EF4444" strokeWidth={2.5} />
                <span style={{ fontSize: 28, fontWeight: 800, color: '#EF4444' }}>
                  DO NOT CONSUME
                </span>
              </div>
              <p style={{ fontSize: 22, color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                Endless tutorials, passive scrolling, reading tips without building. Leads to zero momentum.
              </p>
            </div>

            <ArrowRight size={44} color="#64748B" strokeWidth={3} />

            {/* The Real Shift: Produce */}
            <div
              style={{
                opacity: Math.max(0, cardRightSpring),
                transform: `scale(${interpolate(cardRightSpring, [0, 1], [0.85, 1])})`,
                flex: 1.2,
                padding: '26px 34px',
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(234, 88, 12, 0.4) 100%)',
                border: '2px solid #FF6B00',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 45px rgba(249, 115, 22, 0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Zap size={32} color="#FF6B00" strokeWidth={2.5} />
                <span style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>
                  DAILY NON-NEGOTIABLE OUTPUT
                </span>
              </div>
              <p style={{ fontSize: 24, color: '#FED7AA', margin: 0, lineHeight: 1.4, fontWeight: 600 }}>
                Every single day, you must ship tangible output into reality.
              </p>
            </div>
          </div>

          {/* Lower Golden Rule Badge */}
          <div
            style={{
              opacity: Math.max(0, ruleSpring),
              transform: `translateY(${interpolate(ruleSpring, [0, 1], [30, 0])}px)`,
              marginTop: 32,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 36px',
              borderRadius: 20,
              backgroundColor: 'rgba(10, 15, 29, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              width: 'fit-content',
            }}
          >
            <Check size={28} color="#38BDF8" strokeWidth={3} />
            <span style={{ fontSize: 26, fontWeight: 800, color: '#E2E8F0' }}>
              One rule that controls every other habit:{' '}
              <span style={{ color: '#38BDF8' }}>Produce Something Daily.</span>
            </span>
          </div>
        </div>

        {/* Character Seated / At Desk on Right */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 220,
            zIndex: 15,
          }}
        >
          <Stickman pose={stickmanPose} scale={1.35} color="#FF6B00" />
        </div>
      </CameraRig>
    </div>
  );
};
