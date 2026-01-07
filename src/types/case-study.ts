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
  value: string;
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

// Pipeline Node Interfaces (for sequential workflows like Find Sites)
export interface NodeIOSpec {
  name: string;
  type: string;
  description: string;
}

export interface PipelineNode {
  id: string;
  name: string;
  role: string;
  description: string;
  inputs: NodeIOSpec[];
  outputs: NodeIOSpec[];
  position: { x: number; y: number };
  color: string;
  isRequired: boolean;
  category: 'input' | 'research' | 'processing' | 'analysis' | 'quality' | 'output';
}

// Case Study Data Interfaces
export interface HeroData {
  label: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface StatCard {
  label: string;
  value: string;
}

export interface TechHighlight {
  title: string;
  description: string;
}
