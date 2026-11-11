import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SummitPanorama } from '../backgrounds/SummitPanorama';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import { GroundContactShadow } from '../character/ContextualProps';
import { LiveBarVolume } from '../visuals/LiveBarVolume';
import { IconBadge } from '../visuals/IconBadge';
import { Zap, Layers } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act6OneYearVolume: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 810;
  const stickmanScale = 1.08;
  const stickmanX = 560;

  // Majestic Camera Zoom-Out into Wide Summit Shot
  const camProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1.08, 1.0]);
  const camPanX = interpolate(camProgress, [0, 1], [-20, 0]);

  // Stickman pose logic:
  // f0 - f180: explain / look at volume
  // f181 - f240: point at volume
  // f240+: celebrate
  let action: StickmanAction = 'explain';
  let pointAt: { x: number; y: number } | null = null;
  let lookAt: { x: number; y: number } | null = null;

  if (frame >= 240) {
    action = 'celebrate';
    lookAt = { x: 1250, y: 350 };
  } else if (frame >= 180) {
    action = 'explain';
    pointAt = { x: 1250, y: 380 };
    lookAt = { x: 1250, y: 380 };
  } else {
    action = 'explain';
    lookAt = { x: 1250, y: 450 };
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
          transform: `scale(${camScale}) translate(${camPanX}px, 0px)`,
          transformOrigin: '960px 540px',
          willChange: 'transform',
        }}
      >
        {/* Layer 1: Layered Smooth Curved Summit Panorama */}
        <SummitPanorama />

        {/* Layer 2: Props & StickmanIK in SVG Space */}
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
            rx={38 * stickmanScale}
            ry={8 * stickmanScale}
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

        {/* Dynamic Live Bar Volume Skyscraper (f25 to f260) */}
        <LiveBarVolume
          frame={frame}
          fps={fps}
          startFrame={25}
          durationInFrames={220}
          x={1200}
          y={780}
        />

        {/* Frameless In-World Typography (f0 - f180) */}
        {frame < 180 && (
          <div
            style={{
              position: 'absolute',
              left: 1100,
              top: 220,
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
              zIndex: 25,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 58,
                fontWeight: 900,
                color: '#FF6B00',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textShadow: '0 0 35px rgba(255, 107, 0, 0.45)',
              }}
            >
              1 YEAR LATER
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 32,
                fontWeight: 800,
                color: '#FFFFFF',
                marginTop: 6,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              A Completely Different Life
            </span>
          </div>
        )}

        {/* "Not because of motivation" (f181 - f240) */}
        {frame >= 181 && frame < 240 && (
          <IconBadge
            icon={Zap}
            label="NOT MOTIVATION"
            sublabel="Unreliable Fuel"
            color="#94A3B8"
            frame={frame}
            fps={fps}
            popFrame={181}
            strikeFrame={198}
            size={56}
            x={1260}
            y={240}
          />
        )}

        {/* "Because of volume" (f240+) */}
        {frame >= 240 && (
          <IconBadge
            icon={Layers}
            label="BECAUSE OF VOLUME"
            sublabel="365 Unstoppable Units"
            color="#FF6B00"
            frame={frame}
            fps={fps}
            popFrame={240}
            size={64}
            x={1280}
            y={240}
          />
        )}
      </div>
    </div>
  );
};
