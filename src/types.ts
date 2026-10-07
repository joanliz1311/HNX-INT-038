export interface BoundingBox {
  ymin: number; // percentage 0 - 100
  xmin: number; // percentage 0 - 100
  ymax: number; // percentage 0 - 100
  xmax: number; // percentage 0 - 100
  label: string;
  confidence: number;
}

export interface DocumentPage {
  pageNumber: number;
  title: string;
  section: string;
  hasVisualContent: boolean;
  visualType?: 'table' | 'chart' | 'plot' | 'scan_defect' | 'diagram' | 'formula' | 'photo';
  summary: string;
  ocrText: string;
  keyElements: string[];
  boundingBoxes: BoundingBox[];
  imageUrl?: string;
  renderType: 'calendar_grid' | 'chart_plot' | 'equation_scan' | 'cover' | 'generic';
}

export interface SourceDocument {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  totalPages: number;
  published: string;
  authorsOrOrg: string;
  description: string;
  tags: string[];
  pages: DocumentPage[];
}

export interface Citation {
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  section: string;
  visualType?: string;
  boundingBox?: BoundingBox;
  confidence: number;
  snippetOrProof: string;
}

export interface ReasoningStep {
  step: number;
  action: string;
  target: string;
  modality: 'Visual Patch' | 'Table Analysis' | 'Chart Decoding' | 'Text Retrieval' | 'Cross-Doc Synthesis' | 'Mathematical Check';
  observation: string;
  evidenceBox?: BoundingBox;
}

export interface QueryResult {
  query: string;
  mode: 'vision_first' | 'hybrid' | 'table_specialist' | 'cross_doc';
  answer: string;
  directAnswerSummary: string;
  citations: Citation[];
  reasoningSteps: ReasoningStep[];
  mathProof?: string;
  confidenceScore: number;
  visualAnalyzed: boolean;
  documentsConsulted: string[];
  executionTimeMs: number;
}

export interface TestCase {
  id: string;
  category: 'Table Reasoning' | 'Chart & Graph Reasoning' | 'Degraded Scans & Physics' | 'Cross-Document Synthesis' | 'Mathematical Proof';
  question: string;
  targetDocIds: string[];
  description: string;
  difficulty: 'Standard' | 'Advanced' | 'Expert';
  expectedPage: number;
  expectedKeyFacts: string[];
}
