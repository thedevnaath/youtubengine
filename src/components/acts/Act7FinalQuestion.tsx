import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SummitPanorama } from '../backgrounds/SummitPanorama';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import { GroundContactShadow } from '../character/ContextualProps';
import { KineticBurst } from '../visuals/KineticBurst';

interface ActProps {
  durationInFrames: number;
}

export const Act7FinalQuestion: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 810;
  const stickmanScale = 1.15;
  const stickmanX = 960;

  // Cinematic Camera Zoom In towards Stickman
  const camProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1.0, 1.14]);

  // Stickman pose:
  // f0 - f75: explain, looking straight at viewer
  // f75+: pointing forward
  let action: StickmanAction = 'explain';
  let pointAt: { x: number; y: number } | null = null;
  const lookAt = { x: 960, y: 480 };

  if (frame >= 75) {
    action = 'explain';
    pointAt = { x: 960, y: 320 };
  } else {
    action = 'explain';
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
        {/* Layer 1: Summit Panorama */}
        <SummitPanorama />

        {/* Frameless Prompt (f0 - f75) */}
        {frame < 75 && (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 54,
                fontWeight: 900,
                color: '#FF6B00',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textShadow: '0 0 40px rgba(255, 107, 0, 0.45)',
              }}
            >
              ASK YOURSELF HONESTLY.
            </span>
          </div>
        )}

        {/* Layer 2: Stickman & Contact Shadow in Center */}
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
          {/* Universal Contact Shadow */}
          <GroundContactShadow
            cx={stickmanX}
            cy={floorY + 4}
            rx={42 * stickmanScale}
            ry={9 * stickmanScale}
            opacity={0.4}
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
      </div>

      {/* Grand Call-To-Action Kinetic Typography (f80 - f195) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={80}
        durationInFrames={115}
        badge="YOUR DECISION"
        words={[
          { text: 'WHAT', delay: 0 },
          { text: 'IS', delay: 4 },
          { text: 'YOUR', delay: 8 },
          { text: 'DAILY', delay: 12 },
          { text: 'OUTPUT?', delay: 16, highlight: true },
        ]}
        subtext="Choose one habit. Produce daily. Never break the chain."
        bgColor="#070B14"
      />
    </div>
  );
};
