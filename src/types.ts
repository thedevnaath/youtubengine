export type SceneType =
  | 'one-habit'
  | 'motivation-trap'
  | 'output-showcase'
  | 'four-pillars'
  | 'consumption-trap'
  | 'one-year-volume'
  | 'final-question'
  | 'kinetic-title'
  | 'bar-chart'
  | 'process-flow';

export interface WordTimestamp {
  word: string;
  start: number; // in seconds
  end: number;   // in seconds
}

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ProcessStep {
  title: string;
  description?: string;
  icon?: string;
}

export interface SceneItem {
  id: string;
  type: SceneType;
  startFrame: number;
  durationInFrames: number;
  title?: string;
  subtitle?: string;
  data?: BarChartDataPoint[];
  steps?: ProcessStep[];
}

export interface VideoConfig extends Record<string, unknown> {
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  scenes: SceneItem[];
  timestamps?: WordTimestamp[];
}
