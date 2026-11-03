import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DawnHorizon } from '../backgrounds/DawnHorizon';
import { Stickman } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import { X, Sparkles, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneOneHabit: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Synchronized to audio timestamps:
  // 0.0s (f0): Title
  // 3.54s (f106): "not five habits"
  // 5.2s (f155): "not a thirty-day challenge"
  // 7.26s (f218): "not waking up at four in the morning"
  // 8.12s (f244): "just one"
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const card1Spring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 120 },
  });

  const card2Spring = spring({
    frame: frame - 145,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 120 },
  });

  const card3Spring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 120 },
  });

  const heroSpring = spring({
    frame: frame - 240,
    fps,
    config: { damping: 10, mass: 0.8, stiffness: 140 },
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="zoom-in" durationInFrames={durationInFrames} intensity={1.1}>
        <DawnHorizon />

        {/* Content Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '80px 120px',
            zIndex: 10,
          }}
        >
          {/* Left Side: Punchy Typography & Habit Cross-outs */}
          <div style={{ maxWidth: 960, zIndex: 12 }}>
            {/* Pill Tag */}
            <div
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 20px',
                borderRadius: 9999,
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                border: '1px solid rgba(249, 115, 22, 0.45)',
                color: '#FB923C',
                fontSize: 22,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 24,
              }}
            >
              <Sparkles size={22} color="#FB923C" />
              The Keystone Principle
            </div>

            {/* Main Punchy Hook Headline */}
            <h1
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                margin: 0,
                marginBottom: 36,
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              You’re <span style={{ color: '#FF6B00' }}>One Habit Away</span> From Changing Everything
            </h1>

            {/* Crossed-out False Myths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Myth 1: Not 5 habits */}
              <div
                style={{
                  opacity: Math.max(0, card1Spring),
                  transform: `translateX(${interpolate(card1Spring, [0, 1], [-40, 0])}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: 620,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={22} color="#EF4444" strokeWidth={3} />
                </div>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#94A3B8',
                    textDecoration: 'line-through',
                    textDecorationColor: '#EF4444',
                    textDecorationThickness: '3px',
                  }}
                >
                  Not Five Complex Habits
                </span>
              </div>

              {/* Myth 2: Not a 30-day challenge */}
              <div
                style={{
                  opacity: Math.max(0, card2Spring),
                  transform: `translateX(${interpolate(card2Spring, [0, 1], [-40, 0])}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: 620,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Calendar size={22} color="#EF4444" strokeWidth={2.5} />
                </div>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#94A3B8',
                    textDecoration: 'line-through',
                    textDecorationColor: '#EF4444',
                    textDecorationThickness: '3px',
                  }}
                >
                  Not a 30-Day Sprint Challenge
                </span>
              </div>

              {/* Myth 3: Not waking up at 4am */}
              <div
                style={{
                  opacity: Math.max(0, card3Spring),
                  transform: `translateX(${interpolate(card3Spring, [0, 1], [-40, 0])}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: 620,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Clock size={22} color="#EF4444" strokeWidth={2.5} />
                </div>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#94A3B8',
                    textDecoration: 'line-through',
                    textDecorationColor: '#EF4444',
                    textDecorationThickness: '3px',
                  }}
                >
                  Not Waking Up at 4:00 AM
                </span>
              </div>

              {/* The Reveal: Just ONE */}
              <div
                style={{
                  opacity: Math.max(0, heroSpring),
                  transform: `scale(${interpolate(heroSpring, [0, 1], [0.8, 1])})`,
                  marginTop: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '18px 36px',
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(234, 88, 12, 0.45) 100%)',
                  border: '2px solid #FF6B00',
                  boxShadow: '0 10px 30px rgba(249, 115, 22, 0.35)',
                  maxWidth: 620,
                }}
              >
                <CheckCircle2 size={38} color="#FF6B00" strokeWidth={3} />
                <div>
                  <span style={{ fontSize: 36, fontWeight: 900, color: '#FFFFFF' }}>
                    JUST ONE.
                  </span>
                  <span style={{ display: 'block', fontSize: 22, fontWeight: 600, color: '#FED7AA' }}>
                    (And it is NOT the one you think)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Tangerine Stickman Pondering in 'thinking' pose */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              height: '100%',
              paddingBottom: 40,
              zIndex: 15,
            }}
          >
            <Stickman
              pose={frame > 240 ? 'pointing' : 'thinking'}
              scale={1.5}
              color="#FF6B00"
            />
          </div>
        </div>
      </CameraRig>
    </div>
  );
};
