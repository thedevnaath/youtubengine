import React from 'react';
import { interpolate, spring } from 'remotion';

interface LiveLineChartProps {
  frame: number;
  fps: number;
  startFrame: number;
  durationInFrames?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export const LiveLineChart: React.FC<LiveLineChartProps> = ({
  frame,
  fps,
  startFrame,
  durationInFrames = 90,
  width = 720,
  height = 420,
  x = 0,
  y = 0,
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
  const padding = 50;
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
        backgroundColor: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: 28,
        border: '1.5px solid rgba(255, 107, 0, 0.3)',
        padding: 24,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          365-Day Compounding Curve
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#FF6B00' }}>
          +{Math.round(progress * 3700)}% Advantage
        </span>
      </div>

      <svg width="100%" height={innerH + 40} viewBox={`0 0 ${width} ${height - 60}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="curveGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
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

        {/* Flat baseline: Zero Output (grey flat dashed line) */}
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
          fontSize="14"
          fontWeight="700"
        >
          Zero Daily Output (Stagnant)
        </text>

        {/* Exponential Compounding Curve (smooth cubic Bezier) */}
        <path
          d={`M ${padding} ${padding + innerH - 10} Q ${padding + innerW * 0.65} ${padding + innerH - 20} ${padding + innerW} ${padding + 20}`}
          fill="none"
          stroke="#FF6B00"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />

        {/* Filled gradient area under curve */}
        {progress > 0.1 && (
          <path
            d={`M ${padding} ${padding + innerH - 10} Q ${padding + innerW * 0.65} ${padding + innerH - 20} ${padding + innerW} ${padding + 20} L ${padding + innerW} ${padding + innerH - 10} Z`}
            fill="url(#curveGlow)"
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
              stroke="#FF6B00"
              strokeWidth="4"
            />
          );
        })()}
      </svg>
    </div>
  );
};
