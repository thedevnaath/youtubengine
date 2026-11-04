import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from 'remotion';
import { VideoConfig, SceneItem } from './types';
import { Act1OneHabit } from './components/acts/Act1OneHabit';
import { Act2MotivationTrap } from './components/acts/Act2MotivationTrap';
import { Act3OutputShowcase } from './components/acts/Act3OutputShowcase';
import { Act4FourPillars } from './components/acts/Act4FourPillars';
import { Act5ConsumptionTrap } from './components/acts/Act5ConsumptionTrap';
import { Act6OneYearVolume } from './components/acts/Act6OneYearVolume';
import { Act7FinalQuestion } from './components/acts/Act7FinalQuestion';

export const MainExplainer: React.FC<VideoConfig> = ({ scenes = [] }) => {
  const renderAct = (scene: SceneItem) => {
    switch (scene.type) {
      case 'one-habit':
        return <Act1OneHabit durationInFrames={scene.durationInFrames} />;
      case 'motivation-trap':
        return <Act2MotivationTrap durationInFrames={scene.durationInFrames} />;
      case 'output-showcase':
        return <Act3OutputShowcase durationInFrames={scene.durationInFrames} />;
      case 'four-pillars':
        return <Act4FourPillars durationInFrames={scene.durationInFrames} />;
      case 'consumption-trap':
        return <Act5ConsumptionTrap durationInFrames={scene.durationInFrames} />;
      case 'one-year-volume':
        return <Act6OneYearVolume durationInFrames={scene.durationInFrames} />;
      case 'final-question':
        return <Act7FinalQuestion durationInFrames={scene.durationInFrames} />;
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090D16',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Voiceover Narration Audio */}
      <Audio src={staticFile('current/audio.mp3')} />

      {/* Synchronized Continuous Storytelling Acts */}
      {scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
        >
          <AbsoluteFill>{renderAct(scene)}</AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
