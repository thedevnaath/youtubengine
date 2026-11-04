import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { StudioWorkspace } from '../backgrounds/StudioWorkspace';
import { Stickman } from '../character/Stickman';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { BatteryCharging, BatteryWarning, Settings, Smartphone, Sparkles } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act2MotivationTrap: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic Camera Movement:
  // Starts with medium shot on workspace desk
  // Moves in tighter when motivation fails and stickman slumps (f120 - f180)
  // Pulls back smoothly when keystone gear appears (f180 - f310)
  const zoomProgress = interpolate(frame, [100, 160, 240], [0, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(zoomProgress, [0, 1], [1.02, 1.16]);
  const camX = interpolate(zoomProgress, [0, 1], [0, -30]);

  // Stickman position seated in chair behind desk (pelvis at Y=720, behind Y=740 desk)
  const stickmanX = 1060;
  const stickmanY = 660;

  // Stickman pose logic
  let pose: 'sit' | 'slump' | 'point' | 'idle' = 'sit';
  let pointTarget = { x: 740, y: 380 };

  if (frame >= 400) {
    pose = 'sit'; // working focused at desk
  } else if (frame >= 180) {
    pose = 'point';
    pointTarget = { x: 740, y: 380 }; // pointing at golden keystone gear
  } else if (frame >= 125) {
    pose = 'slump'; // slumped over desk
  } else {
    pose = 'sit';
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#0B1120',
      }}
    >
      {/* 2D Camera Rig Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${camScale}) translate(${camX}px, 0px)`,
          transformOrigin: '960px 600px',
          willChange: 'transform',
        }}
      >
        {/* Layer 1: Background Studio Wall, Window, Slats, Lamp, and Chair */}
        <StudioWorkspace layer="bg" />

        {/* Layer 2: Flat Matte Tangerine Stickman Seated in Chair */}
        <Stickman
          pose={pose}
          frame={frame}
          pointTarget={pointTarget}
          scale={0.95}
          style={{
            position: 'absolute',
            left: stickmanX,
            top: stickmanY,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        />

        {/* Layer 3: Foreground Desk Surface & Screen (Naturally occluding legs) */}
        <StudioWorkspace layer="fg" />

        {/* Layer 4: Floating Icon Badges & Metaphors */}
        {/* 1. Motivation Battery (f20 - f125) */}
        {frame < 180 && (
          <IconBadge
            icon={frame >= 125 ? BatteryWarning : BatteryCharging}
            label={frame >= 125 ? 'MOTIVATION DRAIN' : '+MOTIVATION'}
            sublabel={frame >= 125 ? 'Fleeting & Unreliable' : 'Temporary Boost'}
            color={frame >= 125 ? '#EF4444' : '#38BDF8'}
            frame={frame}
            fps={fps}
            popFrame={20}
            strikeFrame={frame >= 125 ? 125 : undefined}
            size={52}
            x={760}
            y={430}
          />
        )}

        {/* 2. Floating Golden Keystone Gear (f180 - f310) */}
        {frame >= 180 && frame < 320 && (
          <IconBadge
            icon={Settings}
            label="KEYSTONE HABIT"
            sublabel="Controls All Other Habits"
            color="#FF6B00"
            frame={frame}
            fps={fps}
            popFrame={180}
            size={58}
            x={740}
            y={380}
          />
        )}

        {/* 3. Daily Output Comparison: Not Consume, Produce (f400 - f580) */}
        {frame >= 400 && (
          <>
            <IconBadge
              icon={Smartphone}
              label="CONSUME"
              sublabel="Passive Scrolling"
              color="#94A3B8"
              frame={frame}
              fps={fps}
              popFrame={410}
              strikeFrame={435}
              size={50}
              x={620}
              y={380}
            />

            <IconBadge
              icon={Sparkles}
              label="PRODUCE"
              sublabel="Tangible Creation"
              color="#FF6B00"
              frame={frame}
              fps={fps}
              popFrame={435}
              checkFrame={455}
              size={54}
              x={1300}
              y={380}
            />
          </>
        )}
      </div>

      {/* Kinetic Typography Punch-in for Beat 08 (f310 - f400) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={310}
        durationInFrames={85}
        badge="THE KEYSTONE"
        words={[
          { text: 'DAILY', delay: 0 },
          { text: 'NON-NEGOTIABLE', delay: 5, highlight: true },
          { text: 'OUTPUT', delay: 10 },
        ]}
        subtext="Every single day. Not consume — produce."
        bgColor="#070B14"
      />
    </div>
  );
};
