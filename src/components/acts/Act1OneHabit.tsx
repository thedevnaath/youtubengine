import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GreenFieldDawn } from '../backgrounds/GreenFieldDawn';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import { GroundContactShadow } from '../character/ContextualProps';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { ListTodo, Calendar, AlarmClock } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act1OneHabit: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Defined Floor Y on lush green path
  const floorY = 825;
  const stickmanScale = 1.08;

  // Camera Motion Graphics:
  // f0 - f95: Wide tracking shot smoothly following the stickman
  // f95 - f280: Medium shot framing stickman on left and frameless callouts on right
  const camProgress = interpolate(frame, [0, 95, 260], [0, 0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1.0, 1.12]);
  const camPanY = interpolate(camProgress, [0, 1], [0, -20]);

  // Stickman X translation during walk (f0 to f95)
  const walkProgress = interpolate(frame, [0, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stickmanX = interpolate(walkProgress, [0, 1], [400, 620]);

  // Stickman pose determination
  let action: StickmanAction = 'walk';
  let pointAt: { x: number; y: number } | null = null;
  let lookAt: { x: number; y: number } | null = null;

  if (frame >= 284) {
    action = 'idle';
  } else if (frame >= 250) {
    action = 'idea';
    lookAt = { x: 960, y: 400 };
  } else if (frame >= 220) {
    action = 'shrug';
    lookAt = { x: 1320, y: 640 };
  } else if (frame >= 160) {
    action = 'explain';
    pointAt = { x: 1320, y: 500 };
    lookAt = { x: 1320, y: 500 };
  } else if (frame >= 95) {
    action = 'explain';
    pointAt = { x: 1320, y: 360 };
    lookAt = { x: 1320, y: 360 };
  } else {
    action = 'walk';
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#0F172A',
      }}
    >
      {/* 2D Camera Rig Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${camScale}) translateY(${camPanY}px)`,
          transformOrigin: '700px 580px',
          willChange: 'transform',
        }}
      >
        {/* Layer 1: Curved Organic Dawn Background */}
        <GreenFieldDawn />

        {/* Layer 2: Stickman & Contact Shadow in SVG World Space */}
        <svg
          viewBox="0 0 1920 1080"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            zIndex: 15,
          }}
        >
          {/* Universal Contact Shadow under feet */}
          <GroundContactShadow
            cx={stickmanX}
            cy={floorY + 4}
            rx={36 * stickmanScale}
            ry={8 * stickmanScale}
            opacity={0.35}
          />

          {/* Locked Character Engine StickmanIK */}
          <StickmanIK
            x={stickmanX}
            y={floorY}
            scale={stickmanScale}
            action={action}
            pointAt={pointAt}
            lookAt={lookAt}
            flipX={false}
          />
        </svg>

        {/* Layer 3: In-World Frameless Typography & Metaphors (Zero pill boxes, Zero borders) */}
        {/* Beat 1 In-Scene Frameless Bold Typography (f10 - f85) */}
        {frame >= 10 && frame < 90 && (
          <div
            style={{
              position: 'absolute',
              left: 1100,
              top: 360,
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 62,
                fontWeight: 900,
                color: '#FF6B00',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textShadow: '0 0 35px rgba(255, 107, 0, 0.4)',
              }}
            >
              ONE HABIT
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 40,
                fontWeight: 800,
                color: '#FFFFFF',
                marginTop: 6,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 15px rgba(0,0,0,0.8)',
              }}
            >
              Changes Everything
            </span>
          </div>
        )}

        {/* 1. "Not five habits" (f104) */}
        <IconBadge
          icon={ListTodo}
          label="5 HABITS"
          sublabel="Overwhelming Complexity"
          color="#38BDF8"
          frame={frame}
          fps={fps}
          popFrame={104}
          strikeFrame={126}
          size={56}
          x={1320}
          y={360}
        />

        {/* 2. "not a 30-day challenge" (f164) */}
        <IconBadge
          icon={Calendar}
          label="30-DAY CHALLENGE"
          sublabel="Temporary Sprint"
          color="#F87171"
          frame={frame}
          fps={fps}
          popFrame={164}
          strikeFrame={185}
          size={56}
          x={1320}
          y={500}
        />

        {/* 3. "not waking up at four in the morning" (f220) */}
        <IconBadge
          icon={AlarmClock}
          label="4:00 AM WAKE UP"
          sublabel="Unrealistic Burnout"
          color="#FBBF24"
          frame={frame}
          fps={fps}
          popFrame={220}
          strikeFrame={245}
          size={56}
          x={1320}
          y={640}
        />
      </div>

      {/* Kinetic Typography Punch-in for Beat 04 (f284 - f340) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={284}
        durationInFrames={56}
        badge="THE CORE TRUTH"
        words={[
          { text: 'JUST', delay: 0 },
          { text: 'ONE', delay: 4, highlight: true },
          { text: 'HABIT', delay: 8 },
        ]}
        subtext="It's not the one you think."
        bgColor="#070B14"
      />
    </div>
  );
};
