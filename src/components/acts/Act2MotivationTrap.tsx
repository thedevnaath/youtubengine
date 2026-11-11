import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { StudioWorkspace } from '../backgrounds/StudioWorkspace';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import {
  GroundContactShadow,
  WorkDeskStation,
  PushBoulder,
} from '../character/ContextualProps';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { Settings, Smartphone, Sparkles } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act2MotivationTrap: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 820;
  const stickmanScale = 1.05;

  // Camera Motion Graphics:
  // Starts on push action (f0 - f180)
  // Zooms smoothly to keystone gear (f180 - f320)
  // Focuses on work desk (f400 - f584)
  const camProgress = interpolate(frame, [0, 180, 420], [0, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camScale = interpolate(camProgress, [0, 1], [1.02, 1.12]);
  const camPanX = interpolate(camProgress, [0, 1], [0, -25]);

  // Phase logic:
  // Phase 1: Motivation Push (f0 - f95)
  // Phase 2: Motivation Fails Slump (f95 - f180)
  // Phase 3: Keystone Habit Gear (f180 - f324)
  // Kinetic Burst: (f324 - f403)
  // Phase 4: Work Desk Output (f403 - f584)
  const isPhase1Push = frame < 95;
  const isPhase2Slump = frame >= 95 && frame < 180;
  const isPhase3Keystone = frame >= 180 && frame < 324;
  const isPhase4Work = frame >= 403;

  let action: StickmanAction = 'push';
  let stickmanX = 640;
  let pointAt: { x: number; y: number } | null = null;
  let lookAt: { x: number; y: number } | null = null;

  if (isPhase4Work) {
    action = 'work';
    stickmanX = 860;
  } else if (isPhase3Keystone) {
    action = 'explain';
    stickmanX = 600;
    pointAt = { x: 1300, y: 380 };
    lookAt = { x: 1300, y: 380 };
  } else if (isPhase2Slump) {
    action = 'slump';
    stickmanX = 640;
    lookAt = { x: 640, y: 820 };
  } else {
    action = 'push';
    stickmanX = 640;
    lookAt = { x: 800, y: 700 };
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
          transform: `scale(${camScale}) translate(${camPanX}px, 0px)`,
          transformOrigin: '960px 600px',
          willChange: 'transform',
        }}
      >
        {/* Layer 1: Background Architecture / Wall */}
        <StudioWorkspace layer="bg" />

        {/* Layer 2: Contextual Props & StickmanIK in SVG Space */}
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
          {/* A. If Pushing: Physical Boulder touching hands at x + 62 * dir * scale */}
          {isPhase1Push && (
            <PushBoulder
              x={stickmanX}
              y={floorY}
              scale={stickmanScale}
              label="MOTIVATION"
            />
          )}

          {/* B. If Work: Chair at (x-14, y-55), Desk at y-108, Laptop at (x+52, y-108) */}
          {isPhase4Work && (
            <WorkDeskStation
              x={stickmanX}
              y={floorY}
              scale={stickmanScale}
              screenGlowColor="#38BDF8"
            />
          )}

          {/* Contact Shadow under Stickman */}
          <GroundContactShadow
            cx={stickmanX}
            cy={floorY + 4}
            rx={36 * stickmanScale}
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

        {/* Layer 3: Foreground Architectural Elements (Desk occluding lower parts if needed) */}
        {!isPhase1Push && !isPhase2Slump && !isPhase4Work && (
          <StudioWorkspace layer="fg" />
        )}

        {/* Layer 4: Floating Frameless Metaphors & Typography */}
        {/* Phase 2: Motivation Fails callout (f95 - f180) */}
        {isPhase2Slump && (
          <div
            style={{
              position: 'absolute',
              left: 1100,
              top: 360,
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
              zIndex: 25,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 60,
                fontWeight: 900,
                color: '#EF4444',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textShadow: '0 0 35px rgba(239, 68, 68, 0.5)',
              }}
            >
              MOTIVATION FAILS
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 28,
                fontWeight: 700,
                color: '#94A3B8',
                marginTop: 8,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              Fleeting & Unreliable
            </span>
          </div>
        )}

        {/* Phase 3: Floating Golden Keystone Gear (f180 - f324) */}
        {isPhase3Keystone && (
          <IconBadge
            icon={Settings}
            label="KEYSTONE HABIT"
            sublabel="Controls All Other Habits"
            color="#FF6B00"
            frame={frame}
            fps={fps}
            popFrame={180}
            size={68}
            x={1300}
            y={380}
          />
        )}

        {/* Phase 4: Produce vs Consume Comparison (f403 - f584) */}
        {isPhase4Work && (
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
              size={54}
              x={500}
              y={380}
            />

            <IconBadge
              icon={Sparkles}
              label="PRODUCE"
              sublabel="Tangible Creation"
              color="#FF6B00"
              frame={frame}
              fps={fps}
              popFrame={440}
              size={60}
              x={1420}
              y={380}
            />
          </>
        )}
      </div>

      {/* Kinetic Typography Punch-in for Beat 08 (f324 - f403) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={324}
        durationInFrames={79}
        badge="THE CORE SHIFT"
        words={[
          { text: 'DAILY', delay: 0 },
          { text: 'NON-NEGOTIABLE', delay: 6, highlight: true },
          { text: 'OUTPUT', delay: 12 },
        ]}
        subtext="Every single day. Not consume — produce."
        bgColor="#070B14"
      />
    </div>
  );
};
