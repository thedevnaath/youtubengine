import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { OutputGridBg } from '../backgrounds/OutputGridBg';
import { Stickman, StickmanPose } from '../character/Stickman';
import { CameraRig } from '../CameraRig';
import {
  FileText,
  Dumbbell,
  Brain,
  PhoneCall,
  Video,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface SceneProps {
  durationInFrames: number;
}

export const SceneOutputShowcase: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // Exactly synchronized to measured word timestamps:
  // Relative 56 (32.66s): "one page"
  // Relative 86 (33.68s): "one workout"
  // Relative 117 (34.70s): "one skill"
  // Relative 159 (36.10s): "one sales call"
  // Relative 201 (37.50s): "one video"
  // Relative 239 (38.78s): "one idea"
  // Relative 330 (41.84s): "zero is not"
  const cards = [
    {
      id: 1,
      title: '1 Page Written',
      subtitle: 'Code, prose, article, or documentation',
      icon: FileText,
      delay: 50,
      color: '#38BDF8',
    },
    {
      id: 2,
      title: '1 Workout Done',
      subtitle: 'Push-ups, run, lift, or stretch',
      icon: Dumbbell,
      delay: 82,
      color: '#FB923C',
    },
    {
      id: 3,
      title: '1 Skill Practiced',
      subtitle: 'Instrument, craft, prompt, or language',
      icon: Brain,
      delay: 114,
      color: '#A855F7',
    },
    {
      id: 4,
      title: '1 Sales Call Made',
      subtitle: 'Pitch, client outreach, or prospect email',
      icon: PhoneCall,
      delay: 154,
      color: '#34D399',
    },
    {
      id: 5,
      title: '1 Video Edited',
      subtitle: 'Clip rendered, audio tuned, or scene staged',
      icon: Video,
      delay: 196,
      color: '#F43F5E',
    },
    {
      id: 6,
      title: '1 Idea Executed',
      subtitle: 'Prototype shipped, experiment completed',
      icon: Lightbulb,
      delay: 234,
      color: '#FBBF24',
    },
  ];

  const bannerSpring = spring({
    frame: frame - 320,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 120 },
  });

  // Dynamic stickman pose according to spoken item
  let stickmanPose: StickmanPose = 'working';
  if (frame > 75 && frame <= 140) stickmanPose = 'lifting';
  else if (frame > 140 && frame <= 240) stickmanPose = 'pointing';
  else if (frame > 240) stickmanPose = 'celebrating';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraRig move="dramatic-push" durationInFrames={durationInFrames} intensity={1.05}>
        <OutputGridBg />

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
              <CheckCircle2 size={20} color="#38BDF8" />
              Concrete Units of Production
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
              What Counts As <span style={{ color: '#FF6B00' }}>Output?</span>
            </h1>
          </div>

          {/* Center 6-Grid Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 22,
              maxWidth: 1350,
            }}
          >
            {cards.map((card) => {
              const cardSpring = spring({
                frame: frame - card.delay,
                fps,
                config: { damping: 12, mass: 0.7, stiffness: 120 },
              });
              const IconComp = card.icon;

              return (
                <div
                  key={card.id}
                  style={{
                    opacity: Math.max(0, cardSpring),
                    transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
                    padding: '20px 24px',
                    borderRadius: 20,
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    border: `1.5px solid ${card.color}40`,
                    boxShadow: `0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px ${card.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      backgroundColor: `${card.color}20`,
                      border: `1px solid ${card.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={30} color={card.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: 4,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 16, color: '#94A3B8', fontWeight: 500 }}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Punchy Banner */}
          <div
            style={{
              opacity: Math.max(0, bannerSpring),
              transform: `scale(${interpolate(bannerSpring, [0, 1], [0.85, 1])})`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 20,
              padding: '16px 36px',
              borderRadius: 20,
              background: 'linear-gradient(90deg, #1E1B4B 0%, #0F172A 100%)',
              border: '2px solid #FF6B00',
              boxShadow: '0 15px 40px rgba(255, 107, 0, 0.3)',
              width: 'fit-content',
            }}
          >
            <AlertTriangle size={32} color="#FF6B00" strokeWidth={2.5} />
            <span style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF' }}>
              <span style={{ color: '#38BDF8' }}>SMALL IS FINE</span> — BUT{' '}
              <span style={{ color: '#EF4444', textDecoration: 'underline' }}>
                ZERO IS NOT.
              </span>
            </span>
          </div>
        </div>

        {/* Character on the right */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            zIndex: 15,
          }}
        >
          <Stickman pose={stickmanPose} scale={1.4} color="#FF6B00" />
        </div>
      </CameraRig>
    </div>
  );
};
