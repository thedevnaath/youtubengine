import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { OutputArena } from '../backgrounds/OutputArena';
import { Stickman } from '../character/Stickman';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { FileText, Dumbbell, Target, PhoneCall, Video, Lightbulb } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act3OutputShowcase: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle camera drift and scale
  const camProgress = interpolate(frame, [0, durationInFrames], [0, 1]);
  const camScale = interpolate(camProgress, [0, 1], [1.0, 1.05]);

  // Stickman in center of the arena - firmly grounded on platform (feet at Y=840)
  const stickmanX = 960;
  const stickmanY = 670;

  // Stickman dynamic pointing targets matching the 6 output items
  let pose: 'shrug' | 'point' | 'idle' = 'shrug';
  let pointTarget = { x: 580, y: 320 };

  if (frame >= 280) {
    pose = 'idle';
  } else if (frame >= 240) {
    pose = 'point';
    pointTarget = { x: 1320, y: 730 }; // Idea executed (lower right)
  } else if (frame >= 200) {
    pose = 'point';
    pointTarget = { x: 1440, y: 530 }; // Video edited (mid right)
  } else if (frame >= 160) {
    pose = 'point';
    pointTarget = { x: 1340, y: 320 }; // Sales call (upper right)
  } else if (frame >= 126) {
    pose = 'point';
    pointTarget = { x: 600, y: 730 }; // Skill practiced (lower left)
  } else if (frame >= 90) {
    pose = 'point';
    pointTarget = { x: 480, y: 530 }; // Workout done (mid left)
  } else if (frame >= 50) {
    pose = 'point';
    pointTarget = { x: 580, y: 320 }; // Page written (upper left)
  } else {
    pose = 'shrug';
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#090D16',
      }}
    >
      {/* 2D Camera Rig Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${camScale})`,
          transformOrigin: '960px 540px',
          willChange: 'transform',
        }}
      >
        {/* Output Arena Background */}
        <OutputArena />

        {/* Flat Matte Tangerine Stickman in Center */}
        <Stickman
          pose={pose}
          frame={frame}
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

        {/* 6 Tangible Output Badges - Spatial Symmetry strictly within 1600x900 safe bounds */}
        {/* Item 1: Page Written (f54) */}
        <IconBadge
          icon={FileText}
          label="1 PAGE WRITTEN"
          sublabel="Manuscript Progress"
          color="#38BDF8"
          frame={frame}
          fps={fps}
          popFrame={54}
          size={48}
          x={580}
          y={320}
        />

        {/* Item 2: Workout Done (f90) */}
        <IconBadge
          icon={Dumbbell}
          label="1 WORKOUT DONE"
          sublabel="Physical Discipline"
          color="#34D399"
          frame={frame}
          fps={fps}
          popFrame={90}
          size={48}
          x={480}
          y={530}
        />

        {/* Item 3: Skill Practiced (f126) */}
        <IconBadge
          icon={Target}
          label="1 SKILL PRACTICED"
          sublabel="Deliberate Mastery"
          color="#FBBF24"
          frame={frame}
          fps={fps}
          popFrame={126}
          size={48}
          x={600}
          y={730}
        />

        {/* Item 4: Sales Call Made (f160) */}
        <IconBadge
          icon={PhoneCall}
          label="1 SALES CALL"
          sublabel="Commercial Courage"
          color="#F472B6"
          frame={frame}
          fps={fps}
          popFrame={160}
          size={48}
          x={1340}
          y={320}
        />

        {/* Item 5: Video Edited (f200) */}
        <IconBadge
          icon={Video}
          label="1 VIDEO EDITED"
          sublabel="Creative Output"
          color="#A78BFA"
          frame={frame}
          fps={fps}
          popFrame={200}
          size={48}
          x={1440}
          y={530}
        />

        {/* Item 6: Idea Executed (f240) */}
        <IconBadge
          icon={Lightbulb}
          label="1 IDEA EXECUTED"
          sublabel="Action Over Analysis"
          color="#FF6B00"
          frame={frame}
          fps={fps}
          popFrame={240}
          size={48}
          x={1320}
          y={730}
        />
      </div>

      {/* Kinetic Typography Punch-in for Beat 13 (f285 - f385) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={285}
        durationInFrames={100}
        badge="THE GOLDEN THRESHOLD"
        words={[
          { text: 'SMALL', delay: 0 },
          { text: 'IS', delay: 3 },
          { text: 'FINE', delay: 6, color: '#38BDF8' },
          { text: '—', delay: 9 },
          { text: 'ZERO', delay: 12, color: '#EF4444', highlight: true },
          { text: 'IS', delay: 15 },
          { text: 'NOT', delay: 18, color: '#EF4444', highlight: true },
        ]}
        subtext="Any forward momentum counts. Inertia is the enemy."
        bgColor="#070B14"
      />
    </div>
  );
};
