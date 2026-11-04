import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { StormyAtmosphere } from '../backgrounds/StormyAtmosphere';
import { Stickman } from '../character/Stickman';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { Smartphone, Tv, Bookmark, RefreshCw, AlertTriangle } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act5ConsumptionTrap: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic Camera Movement
  // Early phase: slight tension zoom into the storm
  // Late phase (marching): camera pans right to follow the stickman toward the light
  const camScale = interpolate(frame, [0, 200, 410], [1.02, 1.1, 1.05]);
  const camPanX = interpolate(frame, [410, 580], [0, -80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Marching progress in rain (local f410 to f585)
  const marchProgress = interpolate(frame, [410, 585], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Stickman grounded on wet path (feet at Y=810)
  const stickmanX = frame < 410 ? 840 : interpolate(marchProgress, [0, 1], [620, 1020]);
  const stickmanY = 640;

  // Stickman pose:
  // f0 - f140: idle / observing the trap
  // f140 - f290: push / pushing back against the consumption wave
  // f290 - f410: idle during kinetic burst
  // f410 - f585: walking / marching firmly through rain into the light beam
  let pose: 'idle' | 'push' | 'walk' = 'idle';
  if (frame >= 410) {
    pose = 'walk';
  } else if (frame >= 140 && frame < 290) {
    pose = 'push';
  } else {
    pose = 'idle';
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#020617',
      }}
    >
      {/* 2D Camera Rig Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${camScale}) translate(${camPanX}px, 0px)`,
          transformOrigin: '960px 540px',
          willChange: 'transform',
        }}
      >
        {/* Stormy Atmosphere with animated rain and breakthrough light ray */}
        <StormyAtmosphere />

        {/* Flat Matte Tangerine Stickman */}
        <Stickman
          pose={pose}
          frame={frame}
          walkProgress={marchProgress}
          scale={1.05}
          style={{
            position: 'absolute',
            left: stickmanX,
            top: stickmanY,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        />

        {/* Consumption Trap Badges (f0 - f290) */}
        {frame < 290 && (
          <>
            {/* Infinite Consumption Warning */}
            <IconBadge
              icon={Smartphone}
              label="INFINITE CONSUMPTION"
              sublabel="Scrolling Feeds & Passive Input"
              color="#F87171"
              frame={frame}
              fps={fps}
              popFrame={30}
              size={52}
              x={1240}
              y={340}
            />

            <IconBadge
              icon={Tv}
              label="PASSIVE WATCHING"
              sublabel="Illusion of Progress"
              color="#FBBF24"
              frame={frame}
              fps={fps}
              popFrame={90}
              size={50}
              x={520}
              y={380}
            />

            <IconBadge
              icon={Bookmark}
              label="SAVING POSTS"
              sublabel="Hoarding Information"
              color="#94A3B8"
              frame={frame}
              fps={fps}
              popFrame={150}
              strikeFrame={190}
              size={48}
              x={1260}
              y={520}
            />

            <IconBadge
              icon={RefreshCw}
              label="CONSTANTLY RESTARTING"
              sublabel="The Perfectionist Trap"
              color="#EF4444"
              frame={frame}
              fps={fps}
              popFrame={190}
              strikeFrame={220}
              size={48}
              x={1200}
              y={690}
            />
          </>
        )}

        {/* Resilient Marching Badge in the Light Beam (f420 - f585) */}
        {frame >= 420 && (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 32px',
              borderRadius: 9999,
              backgroundColor: 'rgba(255, 107, 0, 0.15)',
              border: '2px solid #FF6B00',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 25,
            }}
          >
            <AlertTriangle size={32} color="#FF6B00" />
            <div>
              <span style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                THE BAD DAY PROTOCOL
              </span>
              <span style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#FED7AA' }}>
                Maintain the streak when resistance is highest
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Kinetic Typography Punch-in for Beat 30 (f290 - f410) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={290}
        durationInFrames={110}
        badge="THE NON-NEGOTIABLE"
        words={[
          { text: 'NO', delay: 0 },
          { text: 'DAY', delay: 4 },
          { text: 'WITHOUT', delay: 8 },
          { text: 'OUTPUT', delay: 12, highlight: true },
        ]}
        subtext="Even on bad days. Especially on bad days."
        bgColor="#050811"
      />
    </div>
  );
};
