import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type CameraMove =
  | 'static'
  | 'zoom-in'
  | 'zoom-out'
  | 'pan-left'
  | 'pan-right'
  | 'dramatic-push'
  | 'subtle-drift';

interface CameraRigProps {
  children: React.ReactNode;
  move?: CameraMove;
  intensity?: number;
  durationInFrames?: number;
  style?: React.CSSProperties;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  move = 'subtle-drift',
  intensity = 1,
  durationInFrames,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames: videoDuration } = useVideoConfig();
  const totalDuration = durationInFrames || videoDuration;

  // Progress through this camera move from 0 to 1
  const progress = Math.min(1, Math.max(0, frame / Math.max(1, totalDuration)));

  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  // Organic micro handheld camera drift
  const driftX = Math.sin((frame * 2 * Math.PI) / 120) * 4 * intensity;
  const driftY = Math.cos((frame * 2 * Math.PI) / 90) * 3 * intensity;

  switch (move) {
    case 'zoom-in': {
      scale = interpolate(progress, [0, 1], [1, 1.08 * intensity]);
      break;
    }
    case 'zoom-out': {
      scale = interpolate(progress, [0, 1], [1.12 * intensity, 1]);
      break;
    }
    case 'pan-left': {
      scale = 1.05;
      translateX = interpolate(progress, [0, 1], [30 * intensity, -30 * intensity]);
      break;
    }
    case 'pan-right': {
      scale = 1.05;
      translateX = interpolate(progress, [0, 1], [-30 * intensity, 30 * intensity]);
      break;
    }
    case 'dramatic-push': {
      const pushSpring = spring({
        frame,
        fps,
        config: { damping: 16, mass: 0.9, stiffness: 80 },
      });
      scale = interpolate(pushSpring, [0, 1], [0.96, 1.14 * intensity]);
      translateY = interpolate(pushSpring, [0, 1], [20, -10]);
      break;
    }
    case 'subtle-drift':
    default: {
      scale = interpolate(progress, [0, 1], [1, 1.03 * intensity]);
      break;
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `scale(${scale}) translate(${translateX + driftX}px, ${translateY + driftY}px)`,
        transformOrigin: 'center center',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

