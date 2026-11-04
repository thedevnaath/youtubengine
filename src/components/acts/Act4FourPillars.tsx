import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransformationArena } from '../backgrounds/TransformationArena';
import { Stickman } from '../character/Stickman';
import { IconBadge } from '../visuals/IconBadge';
import { LiveLineChart } from '../visuals/LiveLineChart';
import { Moon, Hammer, Layers, MessageSquare, Award } from 'lucide-react';

interface ActProps {
  durationInFrames: number;
}

export const Act4FourPillars: React.FC<ActProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine current active phase:
  // Phase 1 (f0 - f255): Kills Overthinking (2am bed -> 2pm workbench)
  // Phase 2 (f255 - f440): Builds Proof (affirmations -> evidence bricks)
  // Phase 3 (f440 - f620): It Compounds (Live Line Chart)
  // Phase 4 (f620 - f868): Rewires Identity ('Want to be disciplined' -> 'Daily Producer')
  const isPhase1 = frame < 255;
  const isPhase2 = frame >= 255 && frame < 440;
  const isPhase3 = frame >= 440 && frame < 620;
  const isPhase4 = frame >= 620;

  // Dynamic Camera coordinates based on phase
  let camScale = 1.0;
  let camX = 0;
  let camY = 0;

  if (isPhase1) {
    camScale = interpolate(frame, [0, 255], [1.02, 1.08]);
    camX = interpolate(frame, [140, 200], [0, -20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (isPhase2) {
    camScale = 1.08;
    camX = -10;
  } else if (isPhase3) {
    camScale = 1.05;
    camX = 40; // Pan slightly to frame the chart comfortably
  } else {
    camScale = interpolate(frame - 620, [0, 100], [1.05, 1.12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  // Stickman pose and positioning per phase
  let pose: 'toss_turn' | 'hammer' | 'idle' | 'point' | 'celebrate' = 'idle';
  let stickmanX = 960;
  let stickmanY = 600; // Grounded on horizon line (feet at Y=770)
  let pointTarget = { x: 1200, y: 400 };

  if (isPhase1) {
    if (frame < 140) {
      pose = 'toss_turn'; // 2:00 AM tossing in bed
      stickmanX = 840;
      stickmanY = 480;
    } else {
      pose = 'hammer'; // 2:00 PM hammering at workbench
      stickmanX = 860;
      stickmanY = 600;
    }
  } else if (isPhase2) {
    pose = frame < 330 ? 'point' : 'idle';
    stickmanX = 720;
    stickmanY = 600;
    pointTarget = { x: 1200, y: 360 };
  } else if (isPhase3) {
    pose = 'point';
    stickmanX = 460;
    stickmanY = 600;
    pointTarget = { x: 1180, y: 380 }; // Pointing up at LiveLineChart curve
  } else {
    // Phase 4: Identity Shift
    pose = frame < 720 ? 'point' : 'celebrate';
    stickmanX = 720;
    stickmanY = 600;
    pointTarget = { x: 1240, y: 380 };
  }

  // Hammer swing sparks animation at workbench
  const sparkTrigger = Math.sin((frame * 2 * Math.PI) / 14);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#030712',
      }}
    >
      {/* 2D Camera Rig Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${camScale}) translate(${camX}px, ${camY}px)`,
          transformOrigin: '960px 540px',
          willChange: 'transform',
        }}
      >
        {/* Transformation Arena Architectural Horizon */}
        <TransformationArena />

        {/* ===== PHASE 1 PROPS: BED (2 AM) vs WORKBENCH (2 PM) ===== */}
        {isPhase1 && frame < 140 && (
          /* 2:00 AM Bed Prop */
          <svg
            viewBox="0 0 400 200"
            style={{
              position: 'absolute',
              left: 700,
              top: 620,
              width: 320,
              height: 160,
              zIndex: 10,
            }}
          >
            {/* Wooden Bed Frame */}
            <rect x="20" y="80" width="280" height="40" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="3" />
            <rect x="10" y="50" width="20" height="90" rx="6" fill="#334155" />
            <rect x="290" y="65" width="20" height="75" rx="6" fill="#334155" />
            {/* Pillow */}
            <ellipse cx="65" cy="75" rx="35" ry="15" fill="#475569" />
            {/* Blanket */}
            <path d="M 110 80 Q 200 70 290 80 L 290 120 L 110 120 Z" fill="#0F172A" />
          </svg>
        )}

        {isPhase1 && frame >= 140 && (
          /* 2:00 PM Heavy Timber Workbench & Anvil Prop */
          <svg
            viewBox="0 0 300 260"
            style={{
              position: 'absolute',
              left: 880,
              top: 520,
              width: 300,
              height: 260,
              zIndex: 16,
            }}
          >
            {/* Sturdy Workbench Base */}
            <rect x="20" y="110" width="220" height="30" rx="6" fill="#334155" stroke="#475569" strokeWidth="3" />
            <rect x="35" y="140" width="25" height="100" rx="4" fill="#1E293B" />
            <rect x="200" y="140" width="25" height="100" rx="4" fill="#1E293B" />
            {/* Crossbeam */}
            <rect x="35" y="195" width="190" height="15" rx="3" fill="#1E293B" />

            {/* Steel Anvil */}
            <path d="M 80 110 L 170 110 L 160 80 L 90 80 Z" fill="#64748B" />
            <rect x="70" y="65" width="110" height="18" rx="5" fill="#94A3B8" />

            {/* Hammer Strike Sparks */}
            {sparkTrigger < -0.4 && (
              <g>
                <circle cx="125" cy="60" r="5" fill="#FDE047" />
                <line x1="125" y1="60" x2="105" y2="40" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
                <line x1="125" y1="60" x2="145" y2="35" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
                <line x1="125" y1="60" x2="130" y2="30" stroke="#FFA040" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}
          </svg>
        )}

        {/* Flat Matte Tangerine Stickman */}
        <Stickman
          pose={pose}
          frame={frame}
          pointTarget={pointTarget}
          scale={1.05}
          style={{
            position: 'absolute',
            left: stickmanX,
            top: stickmanY,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
          }}
        />

        {/* ===== PHASE 1: KILLS OVERTHINKING (f0 - f255) ===== */}
        {isPhase1 && (
          <>
            {/* Initial Pillar Banner */}
            {frame < 80 && (
              <div
                style={{
                  position: 'absolute',
                  top: 120,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '8px 28px',
                  borderRadius: 9999,
                  backgroundColor: 'rgba(255, 107, 0, 0.15)',
                  border: '1.5px solid #FF6B00',
                  color: '#FF6B00',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                THE 4 PILLARS OF TRANSFORMATION
              </div>
            )}

            {/* 2:00 AM Overthinking Badge */}
            {frame >= 80 && frame < 150 && (
              <IconBadge
                icon={Moon}
                label="2:00 AM OVERTHINKING"
                sublabel="Endless Mental Loops"
                color="#818CF8"
                frame={frame}
                fps={fps}
                popFrame={84}
                size={50}
                x={720}
                y={340}
              />
            )}

            {/* 2:00 PM Building at Workbench Badge */}
            {frame >= 140 && (
              <IconBadge
                icon={Hammer}
                label="2:00 PM BUILDING"
                sublabel="Tangible Action & Execution"
                color="#FF6B00"
                frame={frame}
                fps={fps}
                popFrame={140}
                checkFrame={160}
                size={54}
                x={1260}
                y={360}
              />
            )}
          </>
        )}

        {/* ===== PHASE 2: BUILDS PROOF (f255 - f440) ===== */}
        {isPhase2 && (
          <>
            {/* Pillar 2 Header */}
            <div
              style={{
                position: 'absolute',
                top: 140,
                left: 160,
                color: '#38BDF8',
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              PILLAR 2: EVIDENCE OVER AFFIRMATIONS
            </div>

            {/* Affirmations Slashed */}
            <IconBadge
              icon={MessageSquare}
              label="EMPTY AFFIRMATIONS"
              sublabel="Words Without Backing"
              color="#94A3B8"
              frame={frame}
              fps={fps}
              popFrame={265}
              strikeFrame={290}
              size={50}
              x={1220}
              y={360}
            />

            {/* Concrete Output Evidence Bricks */}
            <IconBadge
              icon={Layers}
              label="TANGIBLE EVIDENCE"
              sublabel="Solid Stack of Daily Completed Work"
              color="#34D399"
              frame={frame}
              fps={fps}
              popFrame={330}
              checkFrame={350}
              size={54}
              x={1220}
              y={530}
            />
          </>
        )}

        {/* ===== PHASE 3: IT COMPOUNDS (f440 - f620) ===== */}
        {isPhase3 && (
          <>
            {/* Pillar 3 Header */}
            <div
              style={{
                position: 'absolute',
                top: 140,
                left: 160,
                color: '#FF6B00',
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              PILLAR 3: THE 365-DAY EXPONENTIAL
            </div>

            {/* Live Line Chart animates live from left to right */}
            <LiveLineChart
              frame={frame}
              fps={fps}
              startFrame={450}
              durationInFrames={140}
              width={780}
              height={440}
              x={1200}
              y={490}
            />
          </>
        )}

        {/* ===== PHASE 4: REWIRES IDENTITY (f620 - f868) ===== */}
        {isPhase4 && (
          <>
            {/* Pillar 4 Header */}
            <div
              style={{
                position: 'absolute',
                top: 140,
                left: 160,
                color: '#FBBF24',
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              PILLAR 4: REWIRING IDENTITY
            </div>

            {/* Want to be disciplined (slashed) */}
            <IconBadge
              icon={MessageSquare}
              label="'I WANT TO BE DISCIPLINED'"
              sublabel="Aspirational Identity"
              color="#94A3B8"
              frame={frame}
              fps={fps}
              popFrame={630}
              strikeFrame={660}
              size={50}
              x={1240}
              y={380}
            />

            {/* Daily Producer (confirmed) */}
            <IconBadge
              icon={Award}
              label="DAILY PRODUCER"
              sublabel="Evidence-Backed Reality"
              color="#FF6B00"
              frame={frame}
              fps={fps}
              popFrame={700}
              checkFrame={725}
              size={58}
              x={1240}
              y={550}
            />
          </>
        )}
      </div>
    </div>
  );
};
