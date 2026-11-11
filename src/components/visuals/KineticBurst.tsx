import React from 'react';
import { interpolate, spring } from 'remotion';

interface WordItem {
  text: string;
  delay?: number;
  highlight?: boolean;
  color?: string;
}

interface KineticBurstProps {
  frame: number;
  fps: number;
  startFrame: number;
  durationInFrames: number;
  badge?: string;
  words: WordItem[];
  subtext?: string;
  bgColor?: string;
}

/**
 * Full-screen Kinetic Typography Burst (Zero presentation cards, Zero pill badges)
 * Words slam, scale, and punch in locked to millisecond timing.
 */
export const KineticBurst: React.FC<KineticBurstProps> = ({
  frame,
  fps,
  startFrame,
  durationInFrames,
  badge,
  words,
  subtext,
  bgColor = '#070B14',
}) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationInFrames) return null;

  // Window fade in / out
  const fadeIn = interpolate(localFrame, [0, 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    localFrame,
    [durationInFrames - 5, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: bgColor,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 160px', // strictly within 1600 safe width
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {/* Subtle radial ambient spotlight behind typography */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Frameless Category Label (NO pill box, NO border, pure typography) */}
      {badge && (
        <div
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 22,
            fontWeight: 900,
            color: '#FF6B00',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            marginBottom: 24,
            textShadow: '0 0 20px rgba(255, 107, 0, 0.5)',
          }}
        >
          {badge}
        </div>
      )}

      {/* Main Kinetic Typography Slamming Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px 28px',
          maxWidth: 1400,
          zIndex: 2,
        }}
      >
        {words.map((w, i) => {
          const delay = w.delay ?? i * 4;
          const wordSpring = spring({
            frame: localFrame - delay,
            fps,
            config: { damping: 11, mass: 0.5, stiffness: 180 },
          });

          const scale = interpolate(wordSpring, [0, 1], [0.4, 1]);
          const wordOpacity = interpolate(wordSpring, [0, 1], [0, 1]);
          const wordY = interpolate(wordSpring, [0, 1], [40, 0]);

          return (
            <span
              key={i}
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: 88,
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: w.color ? w.color : w.highlight ? '#FF6B00' : '#FFFFFF',
                transform: `scale(${scale}) translateY(${wordY}px)`,
                opacity: wordOpacity,
                display: 'inline-block',
                textShadow: w.highlight
                  ? '0 0 45px rgba(255, 107, 0, 0.5), 0 4px 15px rgba(0,0,0,0.8)'
                  : '0 4px 20px rgba(0, 0, 0, 0.8)',
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>

      {/* Frameless Subtext */}
      {subtext && (
        <p
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            marginTop: 32,
            fontSize: 28,
            fontWeight: 700,
            color: '#94A3B8',
            maxWidth: 1100,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            zIndex: 2,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};
