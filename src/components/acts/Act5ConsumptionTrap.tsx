import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { StormyAtmosphere } from '../backgrounds/StormyAtmosphere';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import {
  GroundContactShadow,
  WorkDeskStation,
} from '../character/ContextualProps';
import { IconBadge } from '../visuals/IconBadge';
import { KineticBurst } from '../visuals/KineticBurst';
import { Smartphone, Tv, Bookmark, RefreshCw } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act5ConsumptionTrap: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 820;
  const stickmanScale = 1.05;

  // Dynamic Camera Movement
  // Early phase: slight tension zoom into the storm
  // Late phase (bad days): focus on rainy desk
  const camScale = interpolate(frame, [0, 200, 420], [1.02, 1.1, 1.05]);
  const camPanX = interpolate(frame, [420, 585], [0, -25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase logic:
  // f0 - f88: Talent vs Consumption (think)
  // f88 - f300: Infinite Consumption Vortex (stressed / push)
  // f300 - f410: Spotlight on Rule (explain)
  // f411 - f475: Kinetic Burst "NO DAY WITHOUT OUTPUT"
  // f466 - f585: Especially on bad days (work desk in rain)
  const isPhase1 = frame < 88;
  const isPhase2Vortex = frame >= 88 && frame < 300;
  const isPhase3Rule = frame >= 300 && frame < 411;
  const isPhase5BadDays = frame >= 466;

  let action: StickmanAction = 'idle';
  let stickmanX = 680;
  let pointAt: { x: number; y: number } | null = null;
  let lookAt: { x: number; y: number } | null = null;

  if (isPhase5BadDays) {
    action = 'work';
    stickmanX = 860;
  } else if (isPhase3Rule) {
    action = 'explain';
    stickmanX = 720;
    pointAt = { x: 1250, y: 380 };
    lookAt = { x: 1250, y: 380 };
  } else if (isPhase2Vortex) {
    action = 'stressed';
    stickmanX = 640;
    lookAt = { x: 1300, y: 400 };
  } else {
    action = 'think';
    stickmanX = 680;
    lookAt = { x: 1200, y: 400 };
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
        {/* Layer 1: Stormy Atmosphere with animated rain & lightning */}
        <StormyAtmosphere />

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
          {/* Work Desk during "Even on bad days, especially on bad days" */}
          {isPhase5BadDays && (
            <WorkDeskStation
              x={stickmanX}
              y={floorY}
              scale={stickmanScale}
              screenGlowColor="#FF6B00"
            />
          )}

          {/* Universal Contact Shadow */}
          <GroundContactShadow
            cx={stickmanX}
            cy={floorY + 4}
            rx={36 * stickmanScale}
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

        {/* Layer 3: In-World Frameless Metaphors & Floating Typography */}
        {/* Phase 1: Frameless Intro Label (f0 - f88) */}
        {isPhase1 && (
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
                fontSize: 56,
                fontWeight: 900,
                color: '#64748B',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              NOT A LACK OF TALENT
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 32,
                fontWeight: 800,
                color: '#EF4444',
                marginTop: 8,
                textShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              It's Infinite Consumption
            </span>
          </div>
        )}

        {/* Phase 2: Consumption Vortex Elements (f88 - f300) */}
        {isPhase2Vortex && (
          <>
            <IconBadge
              icon={Smartphone}
              label="SCROLLING"
              sublabel="Endless Feeds"
              color="#F87171"
              frame={frame}
              fps={fps}
              popFrame={95}
              strikeFrame={220}
              size={52}
              x={1300}
              y={280}
            />

            <IconBadge
              icon={Tv}
              label="WATCHING"
              sublabel="Passive Video Loops"
              color="#FB923C"
              frame={frame}
              fps={fps}
              popFrame={125}
              strikeFrame={220}
              size={52}
              x={1420}
              y={440}
            />

            <IconBadge
              icon={Bookmark}
              label="SAVING POSTS"
              sublabel="Hoarded Knowledge"
              color="#FBBF24"
              frame={frame}
              fps={fps}
              popFrame={155}
              strikeFrame={220}
              size={52}
              x={1280}
              y={600}
            />

            <IconBadge
              icon={RefreshCw}
              label="CONSTANT RESTARTING"
              sublabel="Zero Compounding"
              color="#EF4444"
              frame={frame}
              fps={fps}
              popFrame={185}
              strikeFrame={220}
              size={52}
              x={1400}
              y={740}
            />
          </>
        )}

        {/* Phase 3: One Rule Spotlight (f300 - f411) */}
        {isPhase3Rule && (
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
                fontSize: 32,
                fontWeight: 800,
                color: '#94A3B8',
              }}
            >
              You don't need more information.
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 68,
                fontWeight: 900,
                color: '#FF6B00',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginTop: 6,
                textShadow: '0 0 40px rgba(255, 107, 0, 0.45)',
              }}
            >
              YOU NEED ONE RULE.
            </span>
          </div>
        )}

        {/* Phase 5: Especially On Bad Days (f466 - f585) */}
        {isPhase5BadDays && (
          <div
            style={{
              position: 'absolute',
              left: 360,
              top: 260,
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
              zIndex: 25,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 48,
                fontWeight: 900,
                color: '#38BDF8',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                textShadow: '0 0 35px rgba(56, 189, 248, 0.45)',
              }}
            >
              EVEN ON BAD DAYS.
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 60,
                fontWeight: 900,
                color: '#FF6B00',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginTop: 8,
                textShadow: '0 0 40px rgba(255, 107, 0, 0.5)',
              }}
            >
              ESPECIALLY ON BAD DAYS.
            </span>
          </div>
        )}
      </div>

      {/* Kinetic Typography Punch-in for Beat 30 (f411 - f470) */}
      <KineticBurst
        frame={frame}
        fps={fps}
        startFrame={411}
        durationInFrames={60}
        badge="THE SACRED RULE"
        words={[
          { text: 'NO', delay: 0 },
          { text: 'DAY', delay: 4 },
          { text: 'WITHOUT', delay: 8 },
          { text: 'OUTPUT.', delay: 12, highlight: true },
        ]}
        subtext="Small is fine. Zero is not."
        bgColor="#070B14"
      />
    </div>
  );
};
