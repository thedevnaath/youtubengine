import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface KineticTitleProps {
  title?: string;
  subtitle?: string;
}

export const KineticTitle: React.FC<KineticTitleProps> = ({
  title = 'Executive Briefing',
  subtitle = 'High Performance Infrastructure Overview',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const subtitleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const badgeSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 120px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          opacity: badgeSpring,
          transform: `scale(${interpolate(badgeSpring, [0, 1], [0.85, 1])})`,
          padding: '8px 24px',
          borderRadius: 9999,
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          color: '#38bdf8',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}
      >
        Strategic Insight
      </div>

      <h1
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 76,
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          maxWidth: 1400,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 32,
          fontWeight: 400,
          color: '#94a3b8',
          marginTop: 24,
          maxWidth: 1100,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

