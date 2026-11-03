import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ProcessStep } from '../types';

interface ProcessFlowSceneProps {
  title?: string;
  steps?: ProcessStep[];
}

export const ProcessFlowScene: React.FC<ProcessFlowSceneProps> = ({
  title = 'System Architecture Pipeline',
  steps = [
    { title: 'Data Intake', description: 'Real-time event stream parsing' },
    { title: 'Neural Analysis', description: 'GPU accelerated inference' },
    { title: 'Global Delivery', description: 'Edge distributed responses' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 },
  });

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 80px',
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
          marginBottom: 70,
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
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          width: '100%',
          maxWidth: 1500,
        }}
      >
        {steps.map((step, index) => {
          const stepSpring = spring({
            frame: frame - 10 - index * 8,
            fps,
            config: { damping: 12, mass: 0.8, stiffness: 110 },
          });

          return (
            <React.Fragment key={step.title}>
              <div
                style={{
                  opacity: stepSpring,
                  transform: `translateY(${interpolate(stepSpring, [0, 1], [40, 0])}px) scale(${interpolate(stepSpring, [0, 1], [0.9, 1])})`,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '36px 30px',
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#38bdf8',
                    }}
                  >
                    <CheckCircle2 size={30} />
                  </div>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#38bdf8',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Step 0{index + 1}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    margin: 0,
                    color: '#ffffff',
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>

                {step.description && (
                  <p
                    style={{
                      fontSize: 18,
                      lineHeight: 1.5,
                      color: '#94a3b8',
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  style={{
                    opacity: stepSpring,
                    color: 'rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ArrowRight size={38} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

