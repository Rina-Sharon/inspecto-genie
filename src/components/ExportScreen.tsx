import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QCOutput, QCProject } from "@/types/qc";
import { ArrowLeft, Download, Copy, Share2, FileJson, FileText, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  output: QCOutput;
  project: QCProject;
  onBack: () => void;
}

export function ExportScreen({ output, project, onBack }: Props) {
  const [copied, setCopied] = useState(false);

  const exportData = {
    project: {
      name: project.productName,
      industry: project.industry,
      createdAt: project.createdAt,
    },
    quality_plan: output.qualityPlan,
    inspection_checklists: output.inspectionChecklists,
    testing_protocols: output.testingProtocols,
    fmea: output.fmea,
    compliance: output.compliance,
    capa: output.capa,
    process_control: output.processControl,
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.productName.replace(/\s+/g, "_")}_QC_Report.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON downloaded successfully");
  };

  const downloadText = () => {
    let text = `QUALITY CONTROL REPORT\n${"=".repeat(50)}\n`;
    text += `Product: ${project.productName}\nIndustry: ${project.industry}\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
    text += `QUALITY PLAN\n${"-".repeat(30)}\nObjective: ${output.qualityPlan.objective}\nScope: ${output.qualityPlan.scope}\n\n`;
    text += `Standards:\n${output.qualityPlan.standards.map((s) => `  • ${s}`).join("\n")}\n\n`;
    text += `CTQs:\n${output.qualityPlan.ctqs.map((c) => `  • ${c}`).join("\n")}\n\n`;
    text += `FMEA ANALYSIS\n${"-".repeat(30)}\n`;
    output.fmea.forEach((f) => {
      text += `  ${f.processStep}: ${f.failureMode} (RPN: ${f.rpn}) → ${f.action}\n`;
    });
    text += `\nAI SUGGESTIONS\n${"-".repeat(30)}\n`;
    text += `Process Improvement:\n${output.aiSuggestions.processImprovement.map((s) => `  • ${s}`).join("\n")}\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.productName.replace(/\s+/g, "_")}_QC_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded successfully");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
          <div>
            <h1 className="text-xl font-bold text-card-foreground">Export Report</h1>
            <p className="text-sm text-muted-foreground">{project.productName}</p>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-4 sm:p-8 space-y-4"
      >
        <ExportOption
          icon={FileJson}
          title="Download JSON"
          desc="Structured data for integration with ERP, MES, or analytics tools"
          onClick={downloadJSON}
          buttonLabel="Download .json"
        />
        <ExportOption
          icon={FileText}
          title="Download Report"
          desc="Human-readable text report for documentation and review"
          onClick={downloadText}
          buttonLabel="Download .txt"
        />
        <ExportOption
          icon={copied ? Check : Copy}
          title="Copy to Clipboard"
          desc="Copy full JSON output for quick sharing or pasting"
          onClick={copyToClipboard}
          buttonLabel={copied ? "Copied!" : "Copy JSON"}
        />
        <ExportOption
          icon={Share2}
          title="Share"
          desc="Share via native share dialog (where supported)"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: `QC Report: ${project.productName}`, text: JSON.stringify(exportData, null, 2) });
            } else {
              toast.info("Share not supported — use Copy to Clipboard instead");
            }
          }}
          buttonLabel="Share"
        />
      </motion.div>
    </div>
  );
}

function ExportOption({ icon: Icon, title, desc, onClick, buttonLabel }: {
  icon: any; title: string; desc: string; onClick: () => void; buttonLabel: string;
}) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <Button variant="outline" onClick={onClick} className="shrink-0">{buttonLabel}</Button>
    </div>
  );
}
