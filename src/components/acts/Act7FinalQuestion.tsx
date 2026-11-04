import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SummitPanorama } from '../backgrounds/SummitPanorama';
import { Stickman } from '../character/Stickman';
import { KineticBurst } from '../visuals/KineticBurst';

interface ActProps {
  durationInFrames: number;
}

export const Act7FinalQuestion: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cinematic Camera Zoom In towards Stickman
  const camProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1.0, 1.12]);

  // Stickman in center of the frame (feet at Y=810)
  const stickmanX = 960;
  const stickmanY = 640;

  // Stickman pose:
  // f0 - f75: idle
  // f75+: pointing directly at the camera/viewer
  let pose: 'idle' | 'point' = 'idle';
  let pointTarget = { x: 960, y: 280 };

  if (frame >= 75) {
    pose = 'point';
  } else {
    pose = 'idle';
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
        {/* Summit Panorama */}
        <SummitPanorama />

        {/* Flat Matte Tangerine Stickman */}
        <Stickman
          pose={pose}
          frame={frame}
          pointTarget={pointTarget}
          scale={1.15}
          style={{
            position: 'absolute',
            left: stickmanX,
            top: stickmanY,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        />
      </div>

      {/* Grand Call-To-Action Kinetic Typography (f80 - f195) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={80}
        durationInFrames={115}
        badge="YOUR TURN"
        words={[
          { text: 'WHAT', delay: 0 },
          { text: 'IS', delay: 3 },
          { text: 'YOUR', delay: 6 },
          { text: 'DAILY', delay: 9, highlight: true },
          { text: 'OUTPUT?', delay: 12, highlight: true },
        ]}
        subtext="Pick one unit today. Write it down. Never break the chain."
        bgColor="#070B14"
      />
    </div>
  );
};
