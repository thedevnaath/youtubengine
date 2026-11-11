import React from 'react';
import { interpolate, spring } from 'remotion';
import { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  label?: string;
  sublabel?: string;
  color?: string;
  bgTint?: string;
  frame: number;
  fps: number;
  popFrame: number;
  strikeFrame?: number;
  checkFrame?: number;
  size?: number;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
}

/**
 * Frameless In-World Visual Metaphor Callout (NO pill boxes, NO borders, NO frosted glass)
 * Floats directly in 2D space with spring scale-in and clean typography.
 */
export const IconBadge: React.FC<IconBadgeProps> = ({
  icon: Icon,
  label,
  sublabel,
  color = '#FFFFFF',
  frame,
  fps,
  popFrame,
  strikeFrame,
  size = 56,
  x = 0,
  y = 0,
  style = {},
}) => {
  if (frame < popFrame) return null;

  // Spring pop entrance
  const popSpring = spring({
    frame: frame - popFrame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  // Dynamic strike-through animation (e.g. for debunked concepts)
  const strikeProgress = strikeFrame !== undefined
    ? interpolate(frame - strikeFrame, [0, 8], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  const scale = interpolate(popSpring, [0, 1], [0.3, 1]);
  const opacity = interpolate(popSpring, [0, 1], [0, 1]);
  // Subtle atmospheric float
  const idleBob = Math.sin((frame - popFrame) * 0.08) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: (y ?? 0) + idleBob,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 18,
        // ZERO BOXES, ZERO BORDERS, ZERO PILL BADGES
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        pointerEvents: 'none',
        zIndex: 25,
        filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.65))',
        ...style,
      }}
    >
      {/* Icon with dynamic red slash if debunked */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={size} color={color} strokeWidth={2.6} />

        {/* Dynamic Bold Red Slash if debunked */}
        {strikeFrame !== undefined && strikeProgress > 0 && (
          <svg
            style={{
              position: 'absolute',
              inset: -10,
              width: size + 20,
              height: size + 20,
              overflow: 'visible',
            }}
          >
            <line
              x1="4"
              y1={size + 14}
              x2={4 + (size + 12) * strikeProgress}
              y2={(size + 14) - (size + 12) * strikeProgress}
              stroke="#EF4444"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Frameless Bold Typography */}
      {label && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: 28,
              fontWeight: 900,
              color: strikeProgress > 0.5 ? '#94A3B8' : '#FFFFFF',
              textDecoration: strikeProgress > 0.5 ? 'line-through' : 'none',
              textDecorationColor: '#EF4444',
              textDecorationThickness: '4px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            }}
          >
            {label}
          </span>
          {sublabel && (
            <span
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: 18,
                fontWeight: 700,
                color: strikeProgress > 0.5 ? '#64748B' : color,
                marginTop: 3,
                letterSpacing: '0.01em',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
