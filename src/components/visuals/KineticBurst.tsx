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

export const KineticBurst: React.FC<KineticBurstProps> = ({
  frame,
  fps,
  startFrame,
  durationInFrames,
  badge,
  words,
  subtext,
  bgColor = '#090D16',
}) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationInFrames) return null;

  // Fade in / out window
  const fadeIn = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    localFrame,
    [durationInFrames - 6, durationInFrames],
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
      {/* Badge */}
      {badge && (
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#FF6B00',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 28,
            backgroundColor: 'rgba(255, 107, 0, 0.15)',
            border: '1.5px solid rgba(255, 107, 0, 0.4)',
            padding: '8px 24px',
            borderRadius: 9999,
          }}
        >
          {badge}
        </div>
      )}

      {/* Main Kinetic Typography Row / Stack */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '18px 28px',
          maxWidth: 1400,
        }}
      >
        {words.map((w, i) => {
          const delay = w.delay ?? i * 4;
          const wordSpring = spring({
            frame: localFrame - delay,
            fps,
            config: { damping: 12, mass: 0.6, stiffness: 160 },
          });

          const scale = interpolate(wordSpring, [0, 1], [0.6, 1]);
          const wordOpacity = interpolate(wordSpring, [0, 1], [0, 1]);
          const wordY = interpolate(wordSpring, [0, 1], [30, 0]);

          return (
            <span
              key={i}
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: w.color ? w.color : w.highlight ? '#FF6B00' : '#FFFFFF',
                transform: `scale(${scale}) translateY(${wordY}px)`,
                opacity: wordOpacity,
                display: 'inline-block',
                textShadow: w.highlight ? '0 0 35px rgba(255, 107, 0, 0.4)' : 'none',
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>

      {/* Optional Subtext */}
      {subtext && (
        <p
          style={{
            marginTop: 32,
            fontSize: 26,
            fontWeight: 600,
            color: '#CBD5E1',
            maxWidth: 1100,
            lineHeight: 1.35,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};

