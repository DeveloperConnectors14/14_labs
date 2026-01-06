export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  responsibilities: string[];
  icon: React.ReactNode;
  position: { x: number; y: number };
  color: string;
  isOrchestrator?: boolean;
}

export interface Connection {
  from: string;
  to: string;
  type: 'orchestration' | 'delegation' | 'data';
}

export interface Metric {
  value: string | number;
  label: string;
  description?: string;
  suffix?: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Technology {
  name: string;
  category: string;
  logo?: string;
}
