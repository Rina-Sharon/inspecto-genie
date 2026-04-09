import { useState, useCallback } from "react";
import { QCProject, QCOutput, AppScreen, ProcessingStep } from "@/types/qc";
import { generateMockQCOutput } from "@/lib/mock-generator";

const INITIAL_STEPS: ProcessingStep[] = [
  { label: "Analyzing Specifications…", status: "pending" },
  { label: "Generating Risk Model…", status: "pending" },
  { label: "Building QC Framework…", status: "pending" },
  { label: "Creating Compliance Docs…", status: "pending" },
  { label: "Finalizing Reports…", status: "pending" },
];

export function useQCProject() {
  const [screen, setScreen] = useState<AppScreen>("landing");
  const [project, setProject] = useState<QCProject | null>(null);
  const [output, setOutput] = useState<QCOutput | null>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>(INITIAL_STEPS);

  const startProject = useCallback((data: QCProject) => {
    setProject(data);
    setScreen("processing");
    setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: "pending" })));

    // Simulate processing steps
    const stepDelays = [800, 1600, 2600, 3400, 4200];
    stepDelays.forEach((delay, i) => {
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < i ? "done" : idx === i ? "active" : "pending",
          }))
        );
      }, delay);
    });

    setTimeout(() => {
      setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })));
      const result = generateMockQCOutput(data);
      setOutput(result);
      setTimeout(() => setScreen("results"), 600);
    }, 5000);
  }, []);

  const goToExport = useCallback(() => setScreen("export"), []);
  const goToResults = useCallback(() => setScreen("results"), []);
  const goToInput = useCallback(() => setScreen("input"), []);
  const goToLanding = useCallback(() => {
    setScreen("landing");
    setProject(null);
    setOutput(null);
  }, []);

  return {
    screen, project, output, steps,
    startProject, goToExport, goToResults, goToInput, goToLanding, setScreen,
  };
}
