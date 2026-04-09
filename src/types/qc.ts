export interface QCProject {
  id: string;
  productName: string;
  industry: string;
  specifications: string;
  manufacturingSteps: string[];
  regulations: string[];
  tolerances: string;
  materials: string;
  createdAt: string;
}

export interface FMEARow {
  id: string;
  processStep: string;
  failureMode: string;
  effect: string;
  cause: string;
  severity: number;
  occurrence: number;
  detection: number;
  rpn: number;
  action: string;
  status: "open" | "in-progress" | "closed";
}

export interface InspectionItem {
  id: string;
  parameter: string;
  method: string;
  frequency: string;
  acceptanceCriteria: string;
  instrument: string;
  responsibility: string;
  status: "pass" | "fail" | "warning" | "pending";
}

export interface TestProtocol {
  id: string;
  testName: string;
  standard: string;
  method: string;
  sampleSize: string;
  acceptanceCriteria: string;
  equipment: string;
  frequency: string;
}

export interface QCOutput {
  qualityPlan: {
    objective: string;
    scope: string;
    standards: string[];
    ctqs: string[];
    responsibilities: { role: string; responsibility: string }[];
  };
  inspectionChecklists: InspectionItem[];
  testingProtocols: TestProtocol[];
  fmea: FMEARow[];
  compliance: {
    applicableStandards: string[];
    certifications: string[];
    documentationRequirements: string[];
    auditSchedule: string;
  };
  capa: {
    preventiveActions: { action: string; priority: string; deadline: string }[];
    correctiveActions: { action: string; trigger: string; timeline: string }[];
  };
  processControl: {
    controlCharts: string[];
    spcParameters: string[];
    processCapability: string;
    monitoringPlan: string;
  };
  aiSuggestions: {
    processImprovement: string[];
    costOptimization: string[];
    predictiveInsights: string[];
    sustainability: string[];
  };
  confidenceLevel: number;
}

export type ProcessingStep = {
  label: string;
  status: "pending" | "active" | "done";
};

export type AppScreen = "landing" | "input" | "processing" | "results" | "export";
