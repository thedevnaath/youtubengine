import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DawnHorizon } from '../backgrounds/DawnHorizon';
import { Stickman } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import { HelpCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneFinalQuestion: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const questionSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 120 },
  });

  const cardSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, mass: 0.7, stiffness: 140 },
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="dramatic-push" durationInFrames={durationInFrames} intensity={1.12}>
        <DawnHorizon />

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
          {/* Left Side: The Direct Call to Action */}
          <div style={{ maxWidth: 960 }}>
            {/* Pill Tag */}
            <div
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 22px',
                borderRadius: 9999,
                backgroundColor: 'rgba(249, 115, 22, 0.25)',
                border: '1px solid rgba(249, 115, 22, 0.5)',
                color: '#FB923C',
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 26,
              }}
            >
              <Sparkles size={22} color="#FB923C" />
              Your Daily Commitment
            </div>

            {/* Prompt Subtitle */}
            <h2
              style={{
                opacity: titleSpring,
                transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
                fontSize: 36,
                fontWeight: 700,
                color: '#CBD5E1',
                margin: 0,
                marginBottom: 16,
              }}
            >
              Now ask yourself honestly...
            </h2>

            {/* Giant Punch Question */}
            <h1
              style={{
                opacity: Math.max(0, questionSpring),
                transform: `scale(${interpolate(questionSpring, [0, 1], [0.9, 1])}) translateY(${interpolate(questionSpring, [0, 1], [30, 0])}px)`,
                fontSize: 66,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: 0,
                marginBottom: 40,
                textShadow: '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              What is your daily{' '}
              <span style={{ color: '#FF6B00' }}>non-negotiable output</span> going to be?
            </h1>

            {/* Commitment Box */}
            <div
              style={{
                opacity: Math.max(0, cardSpring),
                transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '22px 36px',
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
                border: '2px solid #FF6B00',
                boxShadow: '0 20px 50px rgba(249, 115, 22, 0.35)',
                maxWidth: 720,
              }}
            >
              <CheckCircle2 size={36} color="#FF6B00" strokeWidth={2.5} />
              <div>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF' }}>
                  Define it now.
                </span>
                <span style={{ display: 'block', fontSize: 20, color: '#FED7AA', fontWeight: 600 }}>
                  One page. One workout. One call. Zero is not an option.
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Tangerine Stickman Pointing Confidently at Viewer */}
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
              pose="pointing"
              scale={1.55}
              color="#FF6B00"
            />
          </div>
        </div>
      </CameraRig>
    </div>
  );
};

