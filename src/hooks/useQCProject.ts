import { useState, useCallback } from "react";
import { QCProject, QCOutput, AppScreen, ProcessingStep } from "@/types/qc";
import { generateMockQCOutput } from "@/lib/mock-generator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const startProject = useCallback(async (data: QCProject) => {
    setProject(data);
    setScreen("processing");
    setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: "pending" })));

    // Animate steps while AI generates
    const stepDelays = [500, 2000, 4000, 6000, 8000];
    const timers = stepDelays.map((delay, i) =>
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < i ? "done" : idx === i ? "active" : "pending",
          }))
        );
      }, delay)
    );

    try {
      const { data: result, error } = await supabase.functions.invoke("generate-qc", {
        body: { project: data },
      });

      // Clear animation timers
      timers.forEach(clearTimeout);

      if (error) {
        throw new Error(error.message || "Failed to generate QC system");
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      // Mark all steps done
      setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })));
      setOutput(result as QCOutput);
      toast.success("QC System generated successfully!");
      setTimeout(() => setScreen("results"), 600);
    } catch (err: any) {
      console.error("AI generation failed, using fallback:", err);
      
      // Clear animation timers
      timers.forEach(clearTimeout);

      // Show error but fall back to mock data
      toast.error("AI generation encountered an issue. Using intelligent defaults.", {
        description: err.message,
      });

      setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })));
      const fallback = generateMockQCOutput(data);
      setOutput(fallback);
      setTimeout(() => setScreen("results"), 600);
    }
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
