import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { StormyHorizon } from '../backgrounds/StormyHorizon';
import { Stickman } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import { Smartphone, RotateCcw, ShieldCheck, Flame } from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneConsumptionTrap: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exactly synchronized to measured word timestamps:
  // Relative f95 (75.90s): "infinite consumption"
  // Relative f148-f265 (77.66s-81.56s): "scrolling, watching, learning, saving posts, planning, restarting"
  // Relative f348 (84.30s): "THE ONE RULE: NO DAY WITHOUT OUTPUT"
  // Relative f479 (88.70s): "EVEN ON BAD DAYS. ESPECIALLY ON BAD DAYS."
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const trapWords = [
    { word: 'Scrolling', delay: 140 },
    { word: 'Watching', delay: 165 },
    { word: 'Learning', delay: 175 },
    { word: 'Saving Posts', delay: 195 },
    { word: 'Planning', delay: 220 },
    { word: 'Restarting', delay: 255 },
  ];

  const ruleSpring = spring({
    frame: frame - 330,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 120 },
  });

  const badDaySpring = spring({
    frame: frame - 470,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 140 },
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="pan-left" durationInFrames={durationInFrames} intensity={1.06}>
        <StormyHorizon />

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
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.45)',
                color: '#F87171',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              <Smartphone size={20} color="#F87171" />
              Not A Lack Of Talent
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
              The Real Enemy: <span style={{ color: '#EF4444' }}>Infinite Consumption</span>
            </h1>
          </div>

          {/* Loop of Consumption Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, maxWidth: 950 }}>
            {trapWords.map((item, i) => {
              const wordSpring = spring({
                frame: frame - item.delay,
                fps,
                config: { damping: 12, mass: 0.6, stiffness: 140 },
              });

              return (
                <div
                  key={i}
                  style={{
                    opacity: Math.max(0, wordSpring),
                    transform: `scale(${interpolate(wordSpring, [0, 1], [0.8, 1])})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 24px',
                    borderRadius: 16,
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#94A3B8',
                    fontSize: 22,
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <RotateCcw size={18} color="#EF4444" />
                  <span style={{ textDecoration: 'line-through', textDecorationColor: '#EF4444' }}>
                    {item.word}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Breakthrough Commandment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 950 }}>
            <div
              style={{
                opacity: Math.max(0, ruleSpring),
                transform: `translateY(${interpolate(ruleSpring, [0, 1], [40, 0])}px)`,
                padding: '24px 36px',
                borderRadius: 24,
                background:
                  'linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)',
                border: '2px solid #FF6B00',
                boxShadow: '0 20px 50px rgba(249, 115, 22, 0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                <ShieldCheck size={32} color="#FF6B00" strokeWidth={2.5} />
                <span style={{ fontSize: 34, fontWeight: 900, color: '#FFFFFF' }}>
                  THE ONE RULE: NO DAY WITHOUT OUTPUT
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 22, color: '#FED7AA', fontWeight: 600 }}>
                You don’t need more information. You need daily relentless execution.
              </p>
            </div>

            {/* Bad Days Badge */}
            <div
              style={{
                opacity: Math.max(0, badDaySpring),
                transform: `scale(${interpolate(badDaySpring, [0, 1], [0.85, 1])})`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 30px',
                borderRadius: 9999,
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                border: '1.5px solid #FF6B00',
                width: 'fit-content',
              }}
            >
              <Flame size={24} color="#FF6B00" />
              <span style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF' }}>
                Even on bad days.{' '}
                <span style={{ color: '#FF6B00', textTransform: 'uppercase' }}>
                  Especially on bad days.
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Stickman Pushing Through Storm on Right */}
        <div
          style={{
            position: 'absolute',
            bottom: 45,
            right: 180,
            zIndex: 15,
          }}
        >
          <Stickman pose="pushing" scale={1.4} color="#FF6B00" />
        </div>
      </CameraRig>
    </div>
  );
};
