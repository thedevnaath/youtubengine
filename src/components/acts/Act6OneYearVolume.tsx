import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SummitPanorama } from '../backgrounds/SummitPanorama';
import { Stickman } from '../character/Stickman';
import { LiveBarVolume } from '../visuals/LiveBarVolume';
import { KineticBurst } from '../visuals/KineticBurst';

interface ActProps {
  durationInFrames: number;
}

export const Act6OneYearVolume: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Majestic Camera Zoom-Out into Wide Summit Shot
  const camProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1.08, 1.0]);
  const camX = interpolate(camProgress, [0, 1], [-30, 0]);

  // Stickman standing triumphantly on the plateau (feet at Y=810)
  const stickmanX = 580;
  const stickmanY = 640;

  // Stickman pose: idle / gesturing toward the towering volume skyscraper
  let pose: 'idle' | 'point' = 'idle';
  let pointTarget = { x: 1260, y: 380 };

  if (frame >= 40 && frame < 240) {
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
          transform: `scale(${camScale}) translate(${camX}px, 0px)`,
          transformOrigin: '960px 540px',
          willChange: 'transform',
        }}
      >
        {/* Layered Smooth Curved Summit Panorama */}
        <SummitPanorama />

        {/* Flat Matte Tangerine Stickman */}
        <Stickman
          pose={pose}
          frame={frame}
          pointTarget={pointTarget}
          scale={1.1}
          style={{
            position: 'absolute',
            left: stickmanX,
            top: stickmanY,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        />

        {/* Dynamic Live Bar Volume Skyscraper (f20 to f220) */}
        <LiveBarVolume
          frame={frame}
          fps={fps}
          startFrame={25}
          durationInFrames={160}
          x={1260}
          y={470}
        />
      </div>

      {/* Kinetic Typography Punch-in for Beat 35 (f240 - f292) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={240}
        durationInFrames={52}
        badge="THE UNFAIR ADVANTAGE"
        words={[
          { text: 'NOT', delay: 0 },
          { text: 'MOTIVATION', delay: 4 },
          { text: '—', delay: 8 },
          { text: 'VOLUME', delay: 12, highlight: true },
        ]}
        subtext="365 days of accumulated proof destroys all doubt."
        bgColor="#070B14"
      />
    </div>
  );
};
