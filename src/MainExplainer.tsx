import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { VideoConfig, SceneItem } from './types';
import { SceneOneHabit } from './components/scenes/SceneOneHabit';
import { SceneMotivationTrap } from './components/scenes/SceneMotivationTrap';
import { SceneOutputShowcase } from './components/scenes/SceneOutputShowcase';
import { SceneFourPillars } from './components/scenes/SceneFourPillars';
import { SceneConsumptionTrap } from './components/scenes/SceneConsumptionTrap';
import { SceneOneYearVolume } from './components/scenes/SceneOneYearVolume';
import { SceneFinalQuestion } from './components/scenes/SceneFinalQuestion';
import { KineticTitle } from './components/KineticTitle';
import { BarChartScene } from './components/BarChartScene';
import { ProcessFlowScene } from './components/ProcessFlowScene';
import { AnimatedCaptions } from './components/AnimatedCaptions';

export const MainExplainer: React.FC<VideoConfig> = ({ scenes = [], timestamps = [] }) => {
  const frame = useCurrentFrame();

  const renderScene = (scene: SceneItem) => {
    switch (scene.type) {
      case 'one-habit':
        return <SceneOneHabit durationInFrames={scene.durationInFrames} />;
      case 'motivation-trap':
        return <SceneMotivationTrap durationInFrames={scene.durationInFrames} />;
      case 'output-showcase':
        return <SceneOutputShowcase durationInFrames={scene.durationInFrames} />;
      case 'four-pillars':
        return <SceneFourPillars durationInFrames={scene.durationInFrames} />;
      case 'consumption-trap':
        return <SceneConsumptionTrap durationInFrames={scene.durationInFrames} />;
      case 'one-year-volume':
        return <SceneOneYearVolume durationInFrames={scene.durationInFrames} />;
      case 'final-question':
        return <SceneFinalQuestion durationInFrames={scene.durationInFrames} />;
      case 'kinetic-title':
        return <KineticTitle title={scene.title} subtitle={scene.subtitle} />;
      case 'bar-chart':
        return <BarChartScene title={scene.title} data={scene.data} />;
      case 'process-flow':
        return <ProcessFlowScene title={scene.title} steps={scene.steps} />;
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0f1d',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Subtle Animated Dot Matrix / Grid */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          transform: `translate(${Math.sin(frame / 60) * 10}px, ${Math.cos(frame / 60) * 10}px)`,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Radial Glow Lighting in Corners */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-25%',
          right: '5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Narration Audio */}
      <Audio src={staticFile('current/audio.mp3')} />

      {/* Dynamically Timed Scenes */}
      {scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
        >
          <AbsoluteFill>{renderScene(scene)}</AbsoluteFill>
        </Sequence>
      ))}

      {/* Lower Third Subtitle Bar synchronized to timestamps */}
      <AnimatedCaptions initialWords={timestamps} />
    </AbsoluteFill>
  );
};
