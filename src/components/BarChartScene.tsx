import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BarChartDataPoint } from '../types';

interface BarChartSceneProps {
  title?: string;
  data?: BarChartDataPoint[];
}

export const BarChartScene: React.FC<BarChartSceneProps> = ({
  title = 'System Throughput Comparison',
  data = [
    { label: 'Standard', value: 120, color: '#ef4444' },
    { label: 'Optimized', value: 290, color: '#f59e0b' },
    { label: 'Distributed GPU', value: 680, color: '#10b981' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 },
  });

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const maxBarHeight = 360;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 100px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      <h2
        style={{
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          fontSize: 56,
          fontWeight: 800,
          marginBottom: 60,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 70,
          height: 440,
          width: '100%',
          maxWidth: 1200,
          borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
          paddingBottom: 20,
        }}
      >
        {data.map((item, index) => {
          const barSpring = spring({
            frame: frame - 10 - index * 6,
            fps,
            config: { damping: 12, mass: 0.8, stiffness: 100 },
          });

          const currentHeight = interpolate(
            barSpring,
            [0, 1],
            [0, (item.value / maxValue) * maxBarHeight]
          );

          const displayVal = Math.round(
            interpolate(barSpring, [0, 1], [0, item.value])
          );

          return (
            <div
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                maxWidth: 220,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: item.color || '#38bdf8',
                  marginBottom: 12,
                  opacity: barSpring,
                }}
              >
                {displayVal}
              </span>

              <div
                style={{
                  width: '100%',
                  height: currentHeight,
                  backgroundColor: item.color || '#38bdf8',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: `0 0 30px ${(item.color || '#38bdf8')}40`,
                }}
              />

              <span
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#94a3b8',
                  marginTop: 18,
                  textAlign: 'center',
                  opacity: barSpring,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

