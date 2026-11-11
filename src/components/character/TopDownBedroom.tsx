import React from 'react';
import { interpolate } from 'remotion';

interface TopDownBedroomProps {
  frame: number;
  fps: number;
}

/**
 * 90-Degree Top-Down Ceiling Shot (Bird's-Eye View) of Bedroom
 * For: "You stop planning your life at two in the morning"
 * Stickman is tucked INSIDE the bed beneath a curved duvet layer.
 */
export const TopDownBedroom: React.FC<TopDownBedroomProps> = ({ frame }) => {
  // Breathing chest motion under duvet
  const chestBreathe = Math.sin(frame * 0.12) * 3;
  // Anxiety thought loop pulse
  const pulse = Math.sin(frame * 0.18) * 4;

  const bedX = 760;
  const bedY = 230;
  const bedW = 420;
  const bedH = 620;

  const headX = 970;
  const headY = 345;
  const headRadius = 27;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050914',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          {/* Bedside Lamp Radial Light Cone */}
          <radialGradient id="lampGlowTopDown" cx="30%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.32" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#050914" stopOpacity="0" />
          </radialGradient>

          {/* Duvet Fabric Gradient */}
          <linearGradient id="duvetGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          {/* Pillow Gradient */}
          <linearGradient id="pillowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Mattress Shadow */}
          <filter id="bedShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="25" stdDeviation="20" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* 1. Wooden Floorboards (Top-down view) */}
        {Array.from({ length: 14 }).map((_, i) => {
          const plankX = i * 140;
          return (
            <g key={i}>
              <line x1={plankX} y1={0} x2={plankX} y2={1080} stroke="#0B1222" strokeWidth={3} />
              <line x1={plankX + 2} y1={0} x2={plankX + 2} y2={1080} stroke="#131D33" strokeWidth={1} />
            </g>
          );
        })}

        {/* 2. Warm Bedside Lamp Lighting Cone illuminating room */}
        <circle cx={580} cy={380} r={550} fill="url(#lampGlowTopDown)" pointerEvents="none" />

        {/* 3. Nightstand (Left of bed) */}
        <g filter="url(#bedShadow)">
          <rect x={550} y={300} width={150} height={150} rx={16} fill="#1E293B" stroke="#334155" strokeWidth={3} />
          {/* Bedside Lamp Base & Shade */}
          <circle cx={625} cy={340} r={28} fill="#F59E0B" opacity={0.85} />
          <circle cx={625} cy={340} r={16} fill="#FEF08A" />

          {/* Smartphone lying on nightstand glowing blue at 2:00 AM */}
          <rect x={585} y={385} width={42} height={52} rx={6} fill="#090D16" stroke="#475569" strokeWidth={2} />
          <rect x={588} y={388} width={36} height={46} rx={4} fill="#0284C7" opacity={0.65} />
          {/* Screen clock text */}
          <text
            x={606}
            y={414}
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="900"
            fontSize="10"
            letterSpacing="-0.02em"
          >
            2:00
          </text>
          <text
            x={606}
            y={424}
            textAnchor="middle"
            fill="#BAE6FD"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="800"
            fontSize="7"
          >
            AM
          </text>
        </g>

        {/* 4. Large Cozy Bed Frame with drop shadow */}
        <g filter="url(#bedShadow)">
          {/* Outer wooden frame */}
          <rect x={bedX} y={bedY} width={bedW} height={bedH} rx={28} fill="#111827" stroke="#374151" strokeWidth={4} />
          {/* Mattress fitted sheet */}
          <rect x={bedX + 16} y={bedY + 16} width={bedW - 32} height={bedH - 32} rx={20} fill="#0A0F1D" />
        </g>

        {/* 5. Cozy Fluffy Pillow */}
        <rect
          x={bedX + 45}
          y={bedY + 40}
          width={bedW - 90}
          height={125}
          rx={26}
          fill="url(#pillowGrad)"
          stroke="#475569"
          strokeWidth={2}
        />
        {/* Pillow indentation crease */}
        <path
          d={`M ${bedX + 100} ${bedY + 105} Q ${headX} ${bedY + 125} ${bedX + bedW - 100} ${bedY + 105}`}
          stroke="#1E293B"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />

        {/* 6. Stickman Body UNDER THE BLANKET */}
        {/* Torso & Legs lying straight down */}
        <line
          x1={headX}
          y1={headY + 30}
          x2={headX}
          y2={headY + 380}
          stroke="#FF6B00"
          strokeWidth={18}
          strokeLinecap="round"
        />
        {/* Arms resting on mattress */}
        <path
          d={`M ${headX - 18} ${headY + 45} L ${headX - 75} ${headY + 110} L ${headX - 60} ${headY + 170}`}
          stroke="#FF6B00"
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d={`M ${headX + 18} ${headY + 45} L ${headX + 75} ${headY + 110} L ${headX + 60} ${headY + 170}`}
          stroke="#FF6B00"
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Stickman Head resting on pillow */}
        <circle cx={headX} cy={headY} r={headRadius} fill="#FF6B00" />
        {/* Two Wide Awake Black Eyes staring up at ceiling */}
        <circle cx={headX - 8} cy={headY - 2} r={4.2} fill="#000000" />
        <circle cx={headX + 8} cy={headY - 2} r={4.2} fill="#000000" />

        {/* 7. Curved Duvet Blanket Layer ON TOP OF Torso & Legs */}
        {/* Turned down fold at chest */}
        <path
          d={`
            M ${bedX + 16} ${bedY + 185 + chestBreathe}
            C ${bedX + 120} ${bedY + 210 + chestBreathe}, ${bedX + 300} ${bedY + 210 + chestBreathe}, ${bedX + bedW - 16} ${bedY + 185 + chestBreathe}
            L ${bedX + bedW - 16} ${bedY + bedH - 16}
            L ${bedX + 16} ${bedY + bedH - 16}
            Z
          `}
          fill="url(#duvetGrad)"
          stroke="#334155"
          strokeWidth={3}
        />

        {/* Turned-over Duvet Top Border Accent */}
        <path
          d={`
            M ${bedX + 16} ${bedY + 185 + chestBreathe}
            C ${bedX + 120} ${bedY + 210 + chestBreathe}, ${bedX + 300} ${bedY + 210 + chestBreathe}, ${bedX + bedW - 16} ${bedY + 185 + chestBreathe}
          `}
          stroke="#475569"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft fabric fold shadows */}
        <path
          d={`M ${bedX + 70} ${bedY + 280} Q ${headX} ${bedY + 310} ${bedX + bedW - 70} ${bedY + 280}`}
          stroke="rgba(0,0,0,0.4)"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M ${bedX + 90} ${bedY + 410} Q ${headX} ${bedY + 440} ${bedX + bedW - 90} ${bedY + 410}`}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />

        {/* 8. Overthinking Swirl Loops Floating Above Bed (Frameless in-world) */}
        <g opacity={0.85}>
          {/* Thought swirl bezier paths */}
          <path
            d={`
              M ${headX + 40} ${headY - 50}
              C ${headX + 110 + pulse} ${headY - 110}, ${headX + 180} ${headY - 70}, ${headX + 220 + pulse} ${headY - 130}
              C ${headX + 260} ${headY - 190}, ${headX + 190} ${headY - 240}, ${headX + 120} ${headY - 210}
            `}
            stroke="#38BDF8"
            strokeWidth={3.5}
            strokeDasharray="6 8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>

      {/* Frameless floating text at right safe zone: "2:00 AM OVERTHINKING" */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          right: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 64,
            fontWeight: 900,
            color: '#38BDF8',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            textShadow: '0 0 35px rgba(56, 189, 248, 0.45)',
          }}
        >
          2:00 AM
        </span>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 32,
            fontWeight: 800,
            color: '#94A3B8',
            marginTop: 8,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Planning In Your Head
        </span>
      </div>
    </div>
  );
};

