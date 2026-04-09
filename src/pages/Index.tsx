import { useQCProject } from "@/hooks/useQCProject";
import { LandingScreen } from "@/components/LandingScreen";
import { InputDashboard } from "@/components/InputDashboard";
import { ProcessingScreen } from "@/components/ProcessingScreen";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { ExportScreen } from "@/components/ExportScreen";

const Index = () => {
  const {
    screen, project, output, steps,
    startProject, goToExport, goToResults, goToInput, goToLanding,
  } = useQCProject();

  switch (screen) {
    case "landing":
      return <LandingScreen onStart={goToInput} />;
    case "input":
      return <InputDashboard onSubmit={startProject} onBack={goToLanding} />;
    case "processing":
      return <ProcessingScreen steps={steps} />;
    case "results":
      return project && output ? (
        <ResultsDashboard output={output} project={project} onExport={goToExport} onBack={goToInput} />
      ) : null;
    case "export":
      return project && output ? (
        <ExportScreen output={output} project={project} onBack={goToResults} />
      ) : null;
    default:
      return <LandingScreen onStart={goToInput} />;
  }
};

export default Index;
