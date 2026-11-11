import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { OutputArena } from '../backgrounds/OutputArena';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import { GroundContactShadow } from '../character/ContextualProps';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { FileText, Dumbbell, Target, PhoneCall, Video, Lightbulb } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act3OutputShowcase: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 820;
  const stickmanScale = 1.05;
  const stickmanX = 960;

  // Subtle camera scale
  const camProgress = interpolate(frame, [0, durationInFrames], [0, 1]);
  const camScale = interpolate(camProgress, [0, 1], [1.0, 1.06]);

  // Dynamic stickman gestures tracking the 6 output units
  let action: StickmanAction = 'shrug';
  let pointAt: { x: number; y: number } | null = null;
  let lookAt: { x: number; y: number } | null = null;

  if (frame >= 285) {
    action = 'explain';
  } else if (frame >= 236) {
    action = 'explain';
    pointAt = { x: 1380, y: 700 };
    lookAt = { x: 1380, y: 700 };
  } else if (frame >= 196) {
    action = 'explain';
    pointAt = { x: 1440, y: 510 };
    lookAt = { x: 1440, y: 510 };
  } else if (frame >= 166) {
    action = 'explain';
    pointAt = { x: 1380, y: 320 };
    lookAt = { x: 1380, y: 320 };
  } else if (frame >= 116) {
    action = 'explain';
    pointAt = { x: 540, y: 700 };
    lookAt = { x: 540, y: 700 };
  } else if (frame >= 84) {
    action = 'explain';
    pointAt = { x: 480, y: 510 };
    lookAt = { x: 480, y: 510 };
  } else if (frame >= 45) {
    action = 'explain';
    pointAt = { x: 540, y: 320 };
    lookAt = { x: 540, y: 320 };
  } else {
    action = 'shrug';
    lookAt = { x: 960, y: 240 };
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
        {/* Layer 1: Output Arena Geometric Background */}
        <OutputArena />

        {/* Frameless Question Floating at Top Center (f0 - f45) */}
        {frame < 45 && (
          <div
            style={{
              position: 'absolute',
              top: 130,
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
                fontSize: 64,
                fontWeight: 900,
                color: '#FF6B00',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textShadow: '0 0 40px rgba(255, 107, 0, 0.45)',
              }}
            >
              WHAT COUNTS AS OUTPUT?
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
            rx={38 * stickmanScale}
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

        {/* Layer 3: 6 Tangible Frameless Output Units (Safe zones: Left 480-540, Right 1380-1440) */}
        {/* Left Column: 3 Units */}
        <IconBadge
          icon={FileText}
          label="1 PAGE WRITTEN"
          sublabel="Daily Manuscript"
          color="#38BDF8"
          frame={frame}
          fps={fps}
          popFrame={45}
          size={52}
          x={520}
          y={310}
        />

        <IconBadge
          icon={Dumbbell}
          label="1 WORKOUT DONE"
          sublabel="Physical Discipline"
          color="#34D399"
          frame={frame}
          fps={fps}
          popFrame={84}
          size={52}
          x={460}
          y={500}
        />

        <IconBadge
          icon={Target}
          label="1 SKILL PRACTICED"
          sublabel="Deliberate Focus"
          color="#FBBF24"
          frame={frame}
          fps={fps}
          popFrame={116}
          size={52}
          x={520}
          y={690}
        />

        {/* Right Column: 3 Units */}
        <IconBadge
          icon={PhoneCall}
          label="1 SALES CALL"
          sublabel="Commercial Proof"
          color="#A78BFA"
          frame={frame}
          fps={fps}
          popFrame={166}
          size={52}
          x={1400}
          y={310}
        />

        <IconBadge
          icon={Video}
          label="1 VIDEO EDITED"
          sublabel="Creative Leverage"
          color="#F43F5E"
          frame={frame}
          fps={fps}
          popFrame={196}
          size={52}
          x={1460}
          y={500}
        />

        <IconBadge
          icon={Lightbulb}
          label="1 IDEA EXECUTED"
          sublabel="Speed To Action"
          color="#F97316"
          frame={frame}
          fps={fps}
          popFrame={236}
          size={52}
          x={1400}
          y={690}
        />
      </div>

      {/* Kinetic Typography Punch-in for Beat 13: "Small is fine, but zero is not." (f285 - f390) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={285}
        durationInFrames={105}
        badge="THE GOLDEN PRINCIPLE"
        words={[
          { text: 'SMALL', delay: 0 },
          { text: 'IS', delay: 4 },
          { text: 'FINE.', delay: 8, highlight: true },
          { text: 'ZERO', delay: 18, color: '#EF4444' },
          { text: 'IS', delay: 22, color: '#EF4444' },
          { text: 'NOT.', delay: 26, color: '#EF4444' },
        ]}
        subtext="0.01 compounded daily crushes 0 every single time."
        bgColor="#070B14"
      />
    </div>
  );
};
