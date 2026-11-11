import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransformationArena } from '../backgrounds/TransformationArena';
import { StickmanIK, StickmanAction } from '../character/StickmanIK';
import {
  GroundContactShadow,
  WorkDeskStation,
} from '../character/ContextualProps';
import { TopDownBedroom } from '../character/TopDownBedroom';
import { LiveLineChart } from '../visuals/LiveLineChart';
import { IconBadge } from '../visuals/IconBadge';
import { ShieldCheck, Sparkles, TrendingUp, Award } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act4FourPillars: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 820;
  const stickmanScale = 1.05;

  // Determine active pillar phase:
  // Phase 1: Overthinking (f0 - f255)
  //   - 2:00 AM: Top-down ceiling shot (f0 - f160)
  //   - 2:00 PM: Work desk afternoon shot (f160 - f255)
  // Phase 2: Builds Proof (f255 - f440)
  // Phase 3: It Compounds (f440 - f620)
  // Phase 4: Rewires Identity (f620 - f868)
  const isPillar1Bed = frame < 160;
  const isPillar1Desk = frame >= 160 && frame < 255;
  const isPillar2 = frame >= 255 && frame < 440;
  const isPillar3 = frame >= 440 && frame < 620;
  const isPillar4 = frame >= 620;

  // Dynamic Camera coordinates based on phase
  let camScale = 1.0;
  let camPanX = 0;

  if (isPillar1Desk) {
    camScale = 1.08;
    camPanX = -20;
  } else if (isPillar2) {
    camScale = 1.05;
    camPanX = -15;
  } else if (isPillar3) {
    camScale = 1.04;
    camPanX = 25; // Frame the line chart comfortably on the right
  } else if (isPillar4) {
    camScale = interpolate(frame - 620, [0, 100], [1.04, 1.12], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Stickman pose and coordinates
  let action: StickmanAction = 'idle';
  let stickmanX = 640;
  let pointAt: { x: number; y: number } | null = null;
  let lookAt: { x: number; y: number } | null = null;

  if (isPillar1Desk) {
    action = 'work';
    stickmanX = 720;
  } else if (isPillar2) {
    if (frame < 340) {
      action = 'explain';
      stickmanX = 600;
      pointAt = { x: 1300, y: 380 };
      lookAt = { x: 1300, y: 380 };
    } else {
      action = 'explain';
      stickmanX = 600;
      pointAt = { x: 1300, y: 640 };
      lookAt = { x: 1300, y: 640 };
    }
  } else if (isPillar3) {
    action = 'explain';
    stickmanX = 460;
    pointAt = { x: 1200, y: 380 };
    lookAt = { x: 1200, y: 380 };
  } else if (isPillar4) {
    action = frame < 720 ? 'explain' : 'celebrate';
    stickmanX = 680;
    lookAt = { x: 960, y: 400 };
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#030712',
      }}
    >
      {/* ===== PILLAR 1: 90-DEGREE TOP-DOWN CEILING SHOT (f0 - f160) ===== */}
      {isPillar1Bed && (
        <TopDownBedroom frame={frame} fps={fps} />
      )}

      {/* ===== SIDE VIEW CAMERA RIG FOR PILLARS 1B, 2, 3, 4 ===== */}
      {!isPillar1Bed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${camScale}) translate(${camPanX}px, 0px)`,
            transformOrigin: '960px 540px',
            willChange: 'transform',
          }}
        >
          {/* Layer 1: Architectural Transformation Arena Background */}
          <TransformationArena />

          {/* Layer 2: Props and Stickman in SVG Space */}
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
            {/* Pillar 1B: Work Desk Station at 2:00 PM */}
            {isPillar1Desk && (
              <WorkDeskStation
                x={stickmanX}
                y={floorY}
                scale={stickmanScale}
                screenGlowColor="#FBBF24"
              />
            )}

            {/* Pillar 2: Solid Heavy Granite Evidence Block slamming to floor (f340+) */}
            {isPillar2 && frame >= 340 && (
              <g>
                {/* Heavy stone contact shadow */}
                <GroundContactShadow cx={1300} cy={floorY + 4} rx={120} ry={16} opacity={0.55} />
                {/* Concrete/Granite Evidence Block */}
                <rect
                  x={1160}
                  y={floorY - 140}
                  width={280}
                  height={140}
                  rx={8}
                  fill="#1E293B"
                  stroke="#475569"
                  strokeWidth={4}
                />
                {/* Block Surface Shading */}
                <path d={`M 1160 ${floorY - 140} L 1200 ${floorY - 165} L 1480 ${floorY - 165} L 1440 ${floorY - 140} Z`} fill="#334155" />
                <path d={`M 1440 ${floorY - 140} L 1480 ${floorY - 165} L 1480 ${floorY - 25} L 1440 ${floorY} Z`} fill="#0F172A" />
                <text
                  x={1300}
                  y={floorY - 60}
                  textAnchor="middle"
                  fill="#F8FAFC"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="28"
                  letterSpacing="0.1em"
                >
                  SOLID EVIDENCE
                </text>
              </g>
            )}

            {/* Universal Contact Shadow under stickman */}
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

          {/* ===== LAYER 3: IN-WORLD FRAMELESS TYPOGRAPHY (Zero pill boxes) ===== */}
          {/* Pillar 1B Frameless Afternoon Label (f160 - f255) */}
          {isPillar1Desk && (
            <div
              style={{
                position: 'absolute',
                top: 180,
                right: 240,
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: 'none',
                zIndex: 25,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 64,
                  fontWeight: 900,
                  color: '#FBBF24',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  textShadow: '0 0 35px rgba(251, 191, 36, 0.45)',
                }}
              >
                2:00 PM
              </span>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginTop: 8,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                }}
              >
                Building In Reality
              </span>
            </div>
          )}

          {/* Pillar 2: Affirmations vs Evidence (f255 - f440) */}
          {isPillar2 && (
            <>
              {/* Frameless Pillar Heading */}
              <div
                style={{
                  position: 'absolute',
                  top: 140,
                  left: 200,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#FF6B00',
                  letterSpacing: '-0.02em',
                  pointerEvents: 'none',
                  zIndex: 25,
                  textShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
                }}
              >
                2. BUILDS PROOF
              </div>

              {/* Fading Affirmations (f270 - f340) */}
              {frame < 340 && (
                <IconBadge
                  icon={Sparkles}
                  label="EMPTY AFFIRMATIONS"
                  sublabel="Fleeting Words"
                  color="#94A3B8"
                  frame={frame}
                  fps={fps}
                  popFrame={270}
                  strikeFrame={305}
                  size={54}
                  x={1300}
                  y={380}
                />
              )}

              {/* Tangible Proof (f340 - f440) */}
              {frame >= 340 && (
                <IconBadge
                  icon={ShieldCheck}
                  label="TANGIBLE EVIDENCE"
                  sublabel="Irrefutable Confidence"
                  color="#34D399"
                  frame={frame}
                  fps={fps}
                  popFrame={340}
                  size={58}
                  x={1300}
                  y={420}
                />
              )}
            </>
          )}

          {/* Pillar 3: It Compounds (f440 - f620) */}
          {isPillar3 && (
            <>
              {/* Frameless Pillar Heading */}
              <div
                style={{
                  position: 'absolute',
                  top: 140,
                  left: 200,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#FF6B00',
                  letterSpacing: '-0.02em',
                  pointerEvents: 'none',
                  zIndex: 25,
                  textShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
                }}
              >
                3. IT COMPOUNDS
              </div>

              {/* Dynamic Live Line Chart (f450 - f620) */}
              <div
                style={{
                  position: 'absolute',
                  left: 820,
                  top: 290,
                  width: 780,
                  height: 440,
                  zIndex: 20,
                }}
              >
                <LiveLineChart
                  frame={frame}
                  fps={fps}
                  startFrame={450}
                  durationInFrames={160}
                  label="365 DAILY OUTPUTS"
                  color="#FF6B00"
                />
              </div>

              {/* Frameless Callout */}
              <IconBadge
                icon={TrendingUp}
                label="UNFAIR ADVANTAGE"
                sublabel="365 Daily Units"
                color="#FF6B00"
                frame={frame}
                fps={fps}
                popFrame={490}
                size={54}
                x={1380}
                y={260}
              />
            </>
          )}

          {/* Pillar 4: Rewires Identity (f620 - f868) */}
          {isPillar4 && (
            <>
              {/* Frameless Pillar Heading */}
              <div
                style={{
                  position: 'absolute',
                  top: 140,
                  left: 200,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#FF6B00',
                  letterSpacing: '-0.02em',
                  pointerEvents: 'none',
                  zIndex: 25,
                  textShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
                }}
              >
                4. REWIRES IDENTITY
              </div>

              {/* Fading Wishful Thinking (f630 - f720) */}
              {frame < 725 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 1250,
                    top: 380,
                    display: 'flex',
                    flexDirection: 'column',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 25,
                    opacity: interpolate(frame, [690, 725], [1, 0], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: 42,
                      fontWeight: 800,
                      color: '#64748B',
                      fontStyle: 'italic',
                      lineHeight: 1.15,
                    }}
                  >
                    "I want to be disciplined..."
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#475569',
                      marginTop: 8,
                    }}
                  >
                    Passive Wishful Identity
                  </span>
                </div>
              )}

              {/* Heroic Identity: Daily Producer (f725+) */}
              {frame >= 725 && (
                <IconBadge
                  icon={Award}
                  label="DAILY PRODUCER"
                  sublabel="Embodied Identity"
                  color="#FF6B00"
                  frame={frame}
                  fps={fps}
                  popFrame={725}
                  size={64}
                  x={1280}
                  y={380}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
