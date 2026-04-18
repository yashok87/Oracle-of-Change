
export type LogicMode = 'COMPARISON' | 'RECOMMENDATION' | 'DECISION' | 'KNOWLEDGE';

export interface LogicResult {
  mode: LogicMode;
  thought: string;
  output: string;
  metadata?: {
    recommendation?: {
      title: string;
      year: string;
      price: string;
    };
    decision?: {
      firm: 'YES' | 'NO';
      logic: string;
    };
  };
}

export interface LogicState {
  status: 'IDLE' | 'PROCESSING' | 'RESULT' | 'ERROR';
  input: string;
  result: LogicResult | null;
  error?: string;
  chaosLevel: number;
  autoCalibration: boolean;
}
