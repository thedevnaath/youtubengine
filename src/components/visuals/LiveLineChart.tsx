import React from 'react';
import { interpolate, spring } from 'remotion';

export interface LiveLineChartProps {
  frame: number;
  fps: number;
  startFrame: number;
  durationInFrames?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  label?: string;
  color?: string;
}

/**
 * Frameless Live Line Chart (Zero card boxes, Zero borders, Zero frosted glass)
 * Draws dynamically in the 2D world space with an upward exponential curve.
 */
export const LiveLineChart: React.FC<LiveLineChartProps> = ({
  frame,
  fps,
  startFrame,
  durationInFrames = 90,
  width = 720,
  height = 420,
  x = 0,
  y = 0,
  label = '365-Day Compounding Curve',
  color = '#FF6B00',
}) => {
  if (frame < startFrame) return null;

  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const popSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // SVG coordinate system
  const padding = 40;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  // Path length for animated draw
  const pathLength = 1000;
  const strokeDashoffset = pathLength * (1 - progress);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${interpolate(popSpring, [0, 1], [0.85, 1])})`,
        opacity: interpolate(popSpring, [0, 1], [0, 1]),
        width,
        height,
        // ZERO CARDS, ZERO BORDERS, ZERO FROSTED GLASS
        backgroundColor: 'transparent',
        border: 'none',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {/* Frameless Top Metric Callout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 26,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 26,
            fontWeight: 900,
            color,
            textShadow: '0 0 25px rgba(255, 107, 0, 0.5)',
          }}
        >
          +{Math.round(progress * 3700)}% Advantage
        </span>
      </div>

      <svg width="100%" height={innerH + 40} viewBox={`0 0 ${width} ${height - 60}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="curveGlowFrameless" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Subtle grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + innerH * p}
            x2={padding + innerW}
            y2={padding + innerH * p}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        ))}

        {/* Flat baseline: Zero Output (dashed) */}
        <line
          x1={padding}
          y1={padding + innerH - 10}
          x2={padding + innerW}
          y2={padding + innerH - 10}
          stroke="#64748B"
          strokeWidth="3"
          strokeDasharray="8 8"
        />
        <text
          x={padding + 10}
          y={padding + innerH - 20}
          fill="#94A3B8"
          fontSize="15"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Zero Daily Output (Stagnant)
        </text>

        {/* Exponential Compounding Curve (smooth cubic Bezier) */}
        <path
          d={`M ${padding} ${padding + innerH - 10} Q ${padding + innerW * 0.65} ${padding + innerH - 20} ${padding + innerW} ${padding + 20}`}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />

        {/* Filled gradient area under curve */}
        {progress > 0.1 && (
          <path
            d={`M ${padding} ${padding + innerH - 10} Q ${padding + innerW * 0.65} ${padding + innerH - 20} ${padding + innerW} ${padding + 20} L ${padding + innerW} ${padding + innerH - 10} Z`}
            fill="url(#curveGlowFrameless)"
            opacity={progress}
          />
        )}

        {/* Lead dot riding the curve with exact quadratic Bezier math */}
        {progress > 0.05 && (() => {
          const p = progress;
          const x0 = padding;
          const y0 = padding + innerH - 10;
          const x1 = padding + innerW * 0.65;
          const y1 = padding + innerH - 20;
          const x2 = padding + innerW;
          const y2 = padding + 20;

          // B(t) = (1-t)^2 * P0 + 2*(1-t)*t * P1 + t^2 * P2
          const dotX = (1 - p) * (1 - p) * x0 + 2 * (1 - p) * p * x1 + p * p * x2;
          const dotY = (1 - p) * (1 - p) * y0 + 2 * (1 - p) * p * y1 + p * p * y2;

          return (
            <circle
              cx={dotX}
              cy={dotY}
              r="9"
              fill="#FFFFFF"
              stroke={color}
              strokeWidth="4"
            />
          );
        })()}
      </svg>
    </div>
  );
};
