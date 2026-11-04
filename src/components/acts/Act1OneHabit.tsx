import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GreenFieldDawn } from '../backgrounds/GreenFieldDawn';
import { Stickman } from '../character/Stickman';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { ListTodo, Calendar, AlarmClock } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act1OneHabit: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera Motion Graphics:
  // f0 - f90: Wide camera shot, stickman walking across the field
  // f90 - f300: Smooth zoom-in to Medium Shot focused on stickman and badges
  const camProgress = interpolate(frame, [0, 90, 260], [0, 0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1, 1.15]);
  const camY = interpolate(camProgress, [0, 1], [0, -30]);

  // Stickman X translation during walk (f0 to f95)
  const walkProgress = interpolate(frame, [0, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stickmanX = interpolate(walkProgress, [0, 1], [380, 680]);
  const stickmanY = 650; // Grounded on the lush green hill path (feet at Y=820)

  // Stickman pose determination:
  // f0 - f95: walking
  // f95 - f180: pointing at 5 habits (upper right)
  // f180 - f230: pointing at 30-day calendar (mid right)
  // f230 - f280: shrugging at 4am wake up
  // f280+: standing forward / kinetic punch
  let pose: 'walk' | 'point' | 'shrug' | 'idle' = 'walk';
  let pointTarget = { x: 1140, y: 360 };

  if (frame >= 280) {
    pose = 'idle';
  } else if (frame >= 230) {
    pose = 'shrug';
  } else if (frame >= 180) {
    pose = 'point';
    pointTarget = { x: 1200, y: 500 };
  } else if (frame >= 95) {
    pose = 'point';
    pointTarget = { x: 1140, y: 360 };
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
          transform: `scale(${camScale}) translateY(${camY}px)`,
          transformOrigin: '700px 550px',
          willChange: 'transform',
        }}
      >
        {/* Curved Organic Background */}
        <GreenFieldDawn />

        {/* Flat Matte Tangerine Stickman */}
        <Stickman
          pose={pose}
          frame={frame}
          walkProgress={walkProgress}
          pointTarget={pointTarget}
          scale={1.05}
          style={{
            position: 'absolute',
            left: stickmanX,
            top: stickmanY,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        />

        {/* Visual Metaphor Icon Badges */}
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
          size={52}
          x={1140}
          y={360}
        />

        {/* 2. "not a 30-day challenge" (f180) */}
        <IconBadge
          icon={Calendar}
          label="30-DAY CHALLENGE"
          sublabel="Temporary Sprint"
          color="#F87171"
          frame={frame}
          fps={fps}
          popFrame={180}
          strikeFrame={202}
          size={52}
          x={1200}
          y={500}
        />

        {/* 3. "not waking up at four in the morning" (f230) */}
        <IconBadge
          icon={AlarmClock}
          label="4:00 AM WAKE UP"
          sublabel="Unrealistic Burnout"
          color="#FBBF24"
          frame={frame}
          fps={fps}
          popFrame={230}
          strikeFrame={252}
          size={52}
          x={1160}
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
