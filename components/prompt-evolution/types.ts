// types.ts
export interface StepMetaItem {
  label: string;
  value: string;
}

export interface PipelineStep {
  id: string;
  title: string;
  before: string;
  after: string;
  explanation: string;
  meta?: StepMetaItem[];
}

export interface DiffSegment {
  text: string;
  type: 'unchanged' | 'added';
}