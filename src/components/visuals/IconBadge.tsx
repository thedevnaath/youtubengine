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

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon: Icon,
  label,
  sublabel,
  color = '#FFFFFF',
  bgTint = 'rgba(15, 23, 42, 0.75)',
  frame,
  fps,
  popFrame,
  strikeFrame,
  checkFrame,
  size = 56,
  x = 0,
  y = 0,
  style = {},
}) => {
  // Spring pop entrance
  const popSpring = spring({
    frame: frame - popFrame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  if (frame < popFrame) return null;

  // Strike-through animation (e.g. for "not five habits")
  const strikeProgress = strikeFrame !== undefined
    ? interpolate(frame - strikeFrame, [0, 8], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // Check animation
  const checkProgress = checkFrame !== undefined
    ? interpolate(frame - checkFrame, [0, 8], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  const scale = interpolate(popSpring, [0, 1], [0.2, 1]);
  const opacity = interpolate(popSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 20px',
        borderRadius: 9999,
        backgroundColor: bgTint,
        backdropFilter: 'blur(10px)',
        border: `2px solid ${color}40`,
        pointerEvents: 'none',
        zIndex: 20,
        ...style,
      }}
    >
      {/* Icon with potential strike line */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={size} color={color} strokeWidth={2.4} />

        {/* Dynamic Red Slash if debunked */}
        {strikeFrame !== undefined && strikeProgress > 0 && (
          <svg
            style={{
              position: 'absolute',
              inset: -8,
              width: size + 16,
              height: size + 16,
              overflow: 'visible',
            }}
          >
            <line
              x1="4"
              y1={size + 12}
              x2={4 + (size + 8) * strikeProgress}
              y2={(size + 12) - (size + 8) * strikeProgress}
              stroke="#EF4444"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Optional Minimal 1-2 word label */}
      {label && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: 26,
              fontWeight: 800,
              color: strikeProgress > 0.5 ? '#94A3B8' : '#FFFFFF',
              textDecoration: strikeProgress > 0.5 ? 'line-through' : 'none',
              textDecorationColor: '#EF4444',
              textDecorationThickness: '3px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {label}
          </span>
          {sublabel && (
            <span
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                color: '#94A3B8',
                marginTop: 2,
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

