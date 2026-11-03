import React from 'react';
import { Composition, staticFile } from 'remotion';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { MainExplainer } from './MainExplainer';
import { VideoConfig, SceneItem, WordTimestamp } from './types';
import rawTimestamps from './timestamps.json';

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

const TIMESTAMPS: WordTimestamp[] = rawTimestamps as WordTimestamp[];

// Exactly mapped to measured word timestamps in public/current/timestamps.json:
// Total duration: 107.48s speech + 1s tail = 3254 frames @ 30fps
const MEASURED_SCENES: SceneItem[] = [
  {
    id: 'scene-1',
    type: 'one-habit',
    startFrame: 0,
    durationInFrames: 340, // 0.0s -> 11.34s
    title: 'The One Habit Paradox',
  },
  {
    id: 'scene-2',
    type: 'motivation-trap',
    startFrame: 340,
    durationInFrames: 584, // 11.34s -> 30.80s
    title: 'The Motivation Trap & Keystone Habit',
  },
  {
    id: 'scene-3',
    type: 'output-showcase',
    startFrame: 924,
    durationInFrames: 390, // 30.80s -> 43.80s
    title: 'Units of Daily Output',
  },
  {
    id: 'scene-4',
    type: 'four-pillars',
    startFrame: 1314,
    durationInFrames: 868, // 43.80s -> 72.72s
    title: 'The 4 Pillars of Transformation',
  },
  {
    id: 'scene-5',
    type: 'consumption-trap',
    startFrame: 2182,
    durationInFrames: 585, // 72.72s -> 92.24s
    title: 'Infinite Consumption & The Bad Day Rule',
  },
  {
    id: 'scene-6',
    type: 'one-year-volume',
    startFrame: 2767,
    durationInFrames: 292, // 92.24s -> 101.96s
    title: 'The 1-Year Volume Exponential',
  },
  {
    id: 'scene-7',
    type: 'final-question',
    startFrame: 3059,
    durationInFrames: 195, // 101.96s -> 108.47s
    title: 'The Grand Call To Action',
  },
];

const TOTAL_FRAMES = MEASURED_SCENES.reduce(
  (max, s) => Math.max(max, s.startFrame + s.durationInFrames),
  3254
);

export const RemotionRoot: React.FC = () => {
  return (
    <Composition<never, VideoConfig>
      id="MainExplainer"
      component={MainExplainer}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{
        fps: FPS,
        width: WIDTH,
        height: HEIGHT,
        durationInFrames: TOTAL_FRAMES,
        scenes: MEASURED_SCENES,
        timestamps: TIMESTAMPS,
      }}
      calculateMetadata={async () => {
        let totalFrames = TOTAL_FRAMES;
        try {
          const audioSrc = staticFile('current/audio.mp3');
          const durationInSeconds = await getAudioDurationInSeconds(audioSrc);
          totalFrames = Math.max(totalFrames, Math.ceil(durationInSeconds * FPS));
        } catch {
          // Graceful fallback to measured duration
        }

        // Ensure the last scene extends to cover any trailing audio frames seamlessly
        const scenes = MEASURED_SCENES.map((scene, idx) => {
          if (idx === MEASURED_SCENES.length - 1) {
            return {
              ...scene,
              durationInFrames: Math.max(scene.durationInFrames, totalFrames - scene.startFrame),
            };
          }
          return scene;
        });

        const props: VideoConfig = {
          fps: FPS,
          width: WIDTH,
          height: HEIGHT,
          durationInFrames: totalFrames,
          scenes,
          timestamps: TIMESTAMPS,
        };

        return {
          durationInFrames: totalFrames,
          props,
        };
      }}
    />
  );
};
