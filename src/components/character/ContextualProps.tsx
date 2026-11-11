import React from 'react';

interface CommonPropProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
}

/**
 * Universal Grounding Contact Shadow
 * Placed at floor level beneath stickman or any heavy grounded object.
 */
export const GroundContactShadow: React.FC<{
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  opacity?: number;
}> = ({ cx, cy, rx = 38, ry = 7, opacity = 0.4 }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={rx}
    ry={ry}
    fill={`rgba(0, 0, 0, ${opacity})`}
    style={{ pointerEvents: 'none' }}
  />
);

/**
 * Contextual Prop for action="work"
 * Exactly anchors:
 * - Chair seat beneath pelvis at (x - 14 * dir, y - 55)
 * - Desk surface at y - 108
 * - Laptop resting on desk at (x + 52 * dir, y - 108) touching stickman's typing hands
 */
export const WorkDeskStation: React.FC<CommonPropProps & { screenGlowColor?: string }> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  screenGlowColor = '#38BDF8',
}) => {
  const dir = flipX ? -1 : 1;
  const chairX = x - 14 * dir;
  const chairSeatY = y - 55 * scale;
  const deskSurfaceY = y - 108 * scale;
  const laptopX = x + 52 * dir * scale;

  // Desk geometry
  const deskX1 = x + (dir === 1 ? 16 : -170) * scale;
  const deskWidth = 150 * scale;
  const deskX2 = deskX1 + deskWidth;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* 1. Ground Shadows */}
      <GroundContactShadow cx={chairX} cy={y + 3} rx={32 * scale} ry={6 * scale} opacity={0.35} />
      <GroundContactShadow cx={deskX1 + 18 * scale} cy={y + 3} rx={16 * scale} ry={5 * scale} opacity={0.35} />
      <GroundContactShadow cx={deskX2 - 18 * scale} cy={y + 3} rx={16 * scale} ry={5 * scale} opacity={0.35} />

      {/* 2. Ergonomic Studio Chair (Layer behind stickman) */}
      <g>
        {/* Chair Base stem & 5-star wheels */}
        <line x1={chairX} y1={chairSeatY + 8} x2={chairX} y2={y} stroke="#1E293B" strokeWidth={6 * scale} />
        <line x1={chairX - 24 * scale} y1={y} x2={chairX + 24 * scale} y2={y} stroke="#334155" strokeWidth={5 * scale} strokeLinecap="round" />
        <circle cx={chairX - 22 * scale} cy={y + 1} r={3 * scale} fill="#0F172A" />
        <circle cx={chairX + 22 * scale} cy={y + 1} r={3 * scale} fill="#0F172A" />

        {/* Chair Seat Cushion */}
        <path
          d={`M ${chairX - 24 * dir * scale} ${chairSeatY} Q ${chairX} ${chairSeatY + 8 * scale} ${chairX + 24 * dir * scale} ${chairSeatY}`}
          stroke="#334155"
          strokeWidth={14 * scale}
          strokeLinecap="round"
          fill="none"
        />

        {/* Curved Backrest */}
        <path
          d={`M ${chairX - 20 * dir * scale} ${chairSeatY} C ${chairX - 32 * dir * scale} ${chairSeatY - 30 * scale}, ${chairX - 30 * dir * scale} ${chairSeatY - 70 * scale}, ${chairX - 18 * dir * scale} ${chairSeatY - 85 * scale}`}
          stroke="#475569"
          strokeWidth={12 * scale}
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 3. Modern Minimalist Desk */}
      <g>
        {/* Desk Legs */}
        <line x1={deskX1 + 18 * scale} y1={deskSurfaceY + 8 * scale} x2={deskX1 + 18 * scale} y2={y} stroke="#334155" strokeWidth={5 * scale} />
        <line x1={deskX2 - 18 * scale} y1={deskSurfaceY + 8 * scale} x2={deskX2 - 18 * scale} y2={y} stroke="#334155" strokeWidth={5 * scale} />
        {/* Cross support */}
        <line x1={deskX1 + 18 * scale} y1={y - 30 * scale} x2={deskX2 - 18 * scale} y2={y - 30 * scale} stroke="#1E293B" strokeWidth={4 * scale} />

        {/* Desk Top Slab */}
        <rect
          x={deskX1}
          y={deskSurfaceY}
          width={deskWidth}
          height={10 * scale}
          rx={4 * scale}
          fill="#1E293B"
          stroke="#475569"
          strokeWidth={2 * scale}
        />
      </g>

      {/* 4. Laptop resting directly on desk surface at (laptopX, deskSurfaceY) */}
      <g>
        {/* Laptop Base (keyboard deck) */}
        <rect
          x={laptopX - 24 * scale}
          y={deskSurfaceY - 4 * scale}
          width={48 * scale}
          height={4 * scale}
          rx={2 * scale}
          fill="#64748B"
        />

        {/* Laptop Open Screen Lid (angled ~110 degrees) */}
        <line
          x1={laptopX + 18 * dir * scale}
          y1={deskSurfaceY - 3 * scale}
          x2={laptopX + 30 * dir * scale}
          y2={deskSurfaceY - 36 * scale}
          stroke="#94A3B8"
          strokeWidth={4 * scale}
          strokeLinecap="round"
        />

        {/* Screen Glow Light Cone illuminating stickman face */}
        <polygon
          points={`
            ${laptopX + 30 * dir * scale},${deskSurfaceY - 36 * scale}
            ${laptopX + 18 * dir * scale},${deskSurfaceY - 3 * scale}
            ${laptopX - 35 * dir * scale},${deskSurfaceY - 70 * scale}
          `}
          fill={`url(#screenGlow-${x}-${y})`}
          opacity={0.35}
        />

        <defs>
          <linearGradient id={`screenGlow-${x}-${y}`} x1={dir === 1 ? '1' : '0'} y1="0" x2={dir === 1 ? '0' : '1'} y2="0">
            <stop offset="0%" stopColor={screenGlowColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={screenGlowColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ceramic Coffee Mug */}
        <rect
          x={deskX2 - 28 * scale}
          y={deskSurfaceY - 14 * scale}
          width={12 * scale}
          height={14 * scale}
          rx={3 * scale}
          fill="#F97316"
        />
        {/* Steam */}
        <path
          d={`M ${deskX2 - 22 * scale} ${deskSurfaceY - 16 * scale} Q ${deskX2 - 25 * scale} ${deskSurfaceY - 24 * scale} ${deskX2 - 21 * scale} ${deskSurfaceY - 30 * scale}`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={2 * scale}
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
};

/**
 * Contextual Prop for action="sit"
 * Chair/Bench surface directly beneath pelvis at y - 56
 */
export const GroundedChair: React.FC<CommonPropProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
}) => {
  const dir = flipX ? -1 : 1;
  const chairX = x - 14 * dir;
  const chairSeatY = y - 56 * scale;

  return (
    <g style={{ pointerEvents: 'none' }}>
      <GroundContactShadow cx={chairX} cy={y + 3} rx={34 * scale} ry={7 * scale} opacity={0.35} />
      {/* Chair Legs */}
      <line x1={chairX - 20 * scale} y1={chairSeatY + 6} x2={chairX - 22 * scale} y2={y} stroke="#334155" strokeWidth={5 * scale} strokeLinecap="round" />
      <line x1={chairX + 20 * scale} y1={chairSeatY + 6} x2={chairX + 22 * scale} y2={y} stroke="#334155" strokeWidth={5 * scale} strokeLinecap="round" />
      {/* Seat Cushion */}
      <rect x={chairX - 26 * scale} y={chairSeatY} width={52 * scale} height={10 * scale} rx={4 * scale} fill="#1E293B" stroke="#475569" strokeWidth={2 * scale} />
      {/* Backrest */}
      <line x1={chairX - 22 * dir * scale} y1={chairSeatY} x2={chairX - 20 * dir * scale} y2={chairSeatY - 70 * scale} stroke="#475569" strokeWidth={8 * scale} strokeLinecap="round" />
    </g>
  );
};

/**
 * Contextual Prop for action="push"
 * Heavy physical boulder or wall touching hands at x + (62 * dir) * scale
 */
export const PushBoulder: React.FC<CommonPropProps & { label?: string; progress?: number }> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  label = 'MOTIVATION',
}) => {
  const dir = flipX ? -1 : 1;
  const touchX = x + 62 * dir * scale;
  const radius = 95 * scale;
  const boulderCenterX = touchX + radius * dir;
  const boulderCenterY = y - radius + 10 * scale;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* Massive Ground Contact Shadow */}
      <GroundContactShadow cx={boulderCenterX} cy={y + 4} rx={radius * 0.9} ry={14 * scale} opacity={0.5} />

      <defs>
        <radialGradient id="boulderGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
      </defs>

      {/* Massive Organic Curved Stone Boulder */}
      <path
        d={`
          M ${boulderCenterX - radius} ${boulderCenterY}
          C ${boulderCenterX - radius} ${boulderCenterY - radius * 0.9}, ${boulderCenterX - radius * 0.4} ${boulderCenterY - radius * 1.05}, ${boulderCenterX} ${boulderCenterY - radius}
          C ${boulderCenterX + radius * 0.5} ${boulderCenterY - radius * 0.95}, ${boulderCenterX + radius * 1.05} ${boulderCenterY - radius * 0.4}, ${boulderCenterX + radius} ${boulderCenterY}
          C ${boulderCenterX + radius * 0.95} ${boulderCenterY + radius * 0.6}, ${boulderCenterX + radius * 0.5} ${boulderCenterY + radius * 0.95}, ${boulderCenterX} ${boulderCenterY + radius * 0.95}
          C ${boulderCenterX - radius * 0.6} ${boulderCenterY + radius * 0.95}, ${boulderCenterX - radius} ${boulderCenterY + radius * 0.5}, ${boulderCenterX - radius} ${boulderCenterY}
          Z
        `}
        fill="url(#boulderGrad)"
        stroke="#475569"
        strokeWidth={3 * scale}
      />

      {/* Surface Craquelure & Shading */}
      <path
        d={`M ${boulderCenterX - 30 * scale} ${boulderCenterY - 40 * scale} Q ${boulderCenterX} ${boulderCenterY - 10 * scale} ${boulderCenterX + 40 * scale} ${boulderCenterY - 20 * scale}`}
        stroke="#1E293B"
        strokeWidth={3 * scale}
        fill="none"
      />

      {/* Engraved Label */}
      {label && (
        <text
          x={boulderCenterX}
          y={boulderCenterY + 10 * scale}
          textAnchor="middle"
          fill="#E2E8F0"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="900"
          fontSize={22 * scale}
          letterSpacing="0.1em"
          opacity={0.85}
        >
          {label}
        </text>
      )}

      {/* Strain Dust / Friction Sparks at base */}
      <ellipse cx={touchX + 10 * dir} cy={y + 1} rx={16 * scale} ry={4 * scale} fill="rgba(249, 115, 22, 0.4)" />
    </g>
  );
};

/**
 * Contextual Prop for action="lift"
 * Heavy Barbell anchored to hands
 */
export const LiftBarbell: React.FC<CommonPropProps & { curlProgress?: number }> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  curlProgress = 0,
}) => {
  const dir = flipX ? -1 : 1;
  const barY = y - (110 + curlProgress * 45) * scale;
  const barLeft = x - 70 * scale;
  const barRight = x + 70 * scale;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* Barbell Steel Shaft */}
      <line x1={barLeft} y1={barY} x2={barRight} y2={barY} stroke="#94A3B8" strokeWidth={6 * scale} strokeLinecap="round" />
      {/* Left Heavy Weight Plates */}
      <rect x={barLeft - 14 * scale} y={barY - 34 * scale} width={14 * scale} height={68 * scale} rx={4 * scale} fill="#0F172A" stroke="#334155" strokeWidth={2 * scale} />
      <rect x={barLeft - 24 * scale} y={barY - 28 * scale} width={10 * scale} height={56 * scale} rx={3 * scale} fill="#1E293B" stroke="#475569" strokeWidth={2 * scale} />
      {/* Right Heavy Weight Plates */}
      <rect x={barRight} y={barY - 34 * scale} width={14 * scale} height={68 * scale} rx={4 * scale} fill="#0F172A" stroke="#334155" strokeWidth={2 * scale} />
      <rect x={barRight + 14 * scale} y={barY - 28 * scale} width={10 * scale} height={56 * scale} rx={3 * scale} fill="#1E293B" stroke="#475569" strokeWidth={2 * scale} />
    </g>
  );
};

