import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { QCOutput, QCProject } from "@/types/qc";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Download, Lightbulb, TrendingUp, Leaf, DollarSign, AlertTriangle, CheckCircle2, BarChart3 } from "lucide-react";

interface Props {
  output: QCOutput;
  project: QCProject;
  onExport: () => void;
  onBack: () => void;
}

function RiskColor({ rpn }: { rpn: number }) {
  if (rpn >= 150) return <span className="inline-block h-3 w-3 rounded-full bg-destructive" />;
  if (rpn >= 80) return <span className="inline-block h-3 w-3 rounded-full bg-accent" />;
  return <span className="inline-block h-3 w-3 rounded-full bg-secondary" />;
}

export function ResultsDashboard({ output, project, onExport, onBack }: Props) {
  const [activeTab, setActiveTab] = useState("plan");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{project.productName}</h1>
              <p className="text-sm text-muted-foreground">{project.industry} • Confidence: {output.confidenceLevel}%</p>
            </div>
          </div>
          <Button variant="hero" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />Export
          </Button>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-4 sm:p-6"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 rounded-xl mb-6">
            {["plan", "inspections", "testing", "fmea", "compliance", "capa", "insights"].map((t) => (
              <TabsTrigger key={t} value={t} className="rounded-lg capitalize text-sm data-[state=active]:bg-card data-[state=active]:shadow-card">
                {t === "fmea" ? "Risk (FMEA)" : t === "capa" ? "CAPA" : t === "insights" ? "AI Insights" : t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Quality Plan */}
          <TabsContent value="plan" className="space-y-4 animate-slide-up">
            <Card title="Objective">{output.qualityPlan.objective}</Card>
            <Card title="Scope">{output.qualityPlan.scope}</Card>
            <Card title="Applicable Standards">
              <ul className="list-disc list-inside space-y-1 text-sm text-card-foreground">{output.qualityPlan.standards.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </Card>
            <Card title="Critical-to-Quality Parameters (CTQs)">
              <div className="flex flex-wrap gap-2">{output.qualityPlan.ctqs.map((c, i) => (
                <span key={i} className="bg-secondary/15 text-secondary rounded-full px-3 py-1 text-sm font-medium">{c}</span>
              ))}</div>
            </Card>
            <Card title="Responsibilities">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 text-muted-foreground font-medium">Role</th><th className="text-left py-2 text-muted-foreground font-medium">Responsibility</th></tr></thead>
                  <tbody>{output.qualityPlan.responsibilities.map((r, i) => (
                    <tr key={i} className="border-b border-border/50"><td className="py-2 font-medium text-card-foreground">{r.role}</td><td className="py-2 text-card-foreground">{r.responsibility}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Inspections */}
          <TabsContent value="inspections" className="animate-slide-up">
            <Card title="Inspection Checklist">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Parameter", "Method", "Frequency", "Acceptance Criteria", "Instrument", "Status"].map((h) => (
                      <th key={h} className="text-left py-2 px-2 text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{output.inspectionChecklists.map((item) => (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium text-card-foreground">{item.parameter}</td>
                      <td className="py-2 px-2 text-card-foreground">{item.method}</td>
                      <td className="py-2 px-2 text-card-foreground">{item.frequency}</td>
                      <td className="py-2 px-2 text-card-foreground">{item.acceptanceCriteria}</td>
                      <td className="py-2 px-2 text-card-foreground">{item.instrument}</td>
                      <td className="py-2 px-2"><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Testing */}
          <TabsContent value="testing" className="animate-slide-up">
            <Card title="Testing Protocols">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Test", "Standard", "Method", "Sample Size", "Acceptance", "Frequency"].map((h) => (
                      <th key={h} className="text-left py-2 px-2 text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{output.testingProtocols.map((t) => (
                    <tr key={t.id} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium text-card-foreground">{t.testName}</td>
                      <td className="py-2 px-2 text-card-foreground">{t.standard}</td>
                      <td className="py-2 px-2 text-card-foreground">{t.method}</td>
                      <td className="py-2 px-2 text-card-foreground">{t.sampleSize}</td>
                      <td className="py-2 px-2 text-card-foreground">{t.acceptanceCriteria}</td>
                      <td className="py-2 px-2 text-card-foreground">{t.frequency}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* FMEA */}
          <TabsContent value="fmea" className="space-y-4 animate-slide-up">
            {/* Risk Heatmap Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MiniCard icon={AlertTriangle} label="High Risk" value={output.fmea.filter((f) => f.rpn >= 150).length} color="destructive" />
              <MiniCard icon={BarChart3} label="Medium Risk" value={output.fmea.filter((f) => f.rpn >= 80 && f.rpn < 150).length} color="accent" />
              <MiniCard icon={CheckCircle2} label="Low Risk" value={output.fmea.filter((f) => f.rpn < 80).length} color="secondary" />
            </div>
            <Card title="FMEA Analysis Table">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Risk", "Process Step", "Failure Mode", "Effect", "S", "O", "D", "RPN", "Action", "Status"].map((h) => (
                      <th key={h} className="text-left py-2 px-2 text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{output.fmea.map((row) => (
                    <tr key={row.id} className="border-b border-border/50">
                      <td className="py-2 px-2"><RiskColor rpn={row.rpn} /></td>
                      <td className="py-2 px-2 font-medium text-card-foreground">{row.processStep}</td>
                      <td className="py-2 px-2 text-card-foreground">{row.failureMode}</td>
                      <td className="py-2 px-2 text-card-foreground">{row.effect}</td>
                      <td className="py-2 px-2 text-card-foreground">{row.severity}</td>
                      <td className="py-2 px-2 text-card-foreground">{row.occurrence}</td>
                      <td className="py-2 px-2 text-card-foreground">{row.detection}</td>
                      <td className="py-2 px-2 font-bold text-card-foreground">{row.rpn}</td>
                      <td className="py-2 px-2 text-card-foreground max-w-[200px]">{row.action}</td>
                      <td className="py-2 px-2"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance" className="space-y-4 animate-slide-up">
            <Card title="Applicable Standards">
              <ul className="list-disc list-inside space-y-1 text-sm text-card-foreground">{output.compliance.applicableStandards.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </Card>
            <Card title="Required Certifications">
              <div className="flex flex-wrap gap-2">{output.compliance.certifications.map((c, i) => (
                <span key={i} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">{c}</span>
              ))}</div>
            </Card>
            <Card title="Documentation Requirements">
              <ul className="list-disc list-inside space-y-1 text-sm text-card-foreground">{output.compliance.documentationRequirements.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </Card>
            <Card title="Audit Schedule"><p className="text-sm text-card-foreground">{output.compliance.auditSchedule}</p></Card>
          </TabsContent>

          {/* CAPA */}
          <TabsContent value="capa" className="space-y-4 animate-slide-up">
            <Card title="Preventive Actions">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Action</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Priority</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Deadline</th>
                  </tr></thead>
                  <tbody>{output.capa.preventiveActions.map((a, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 text-card-foreground">{a.action}</td>
                      <td className="py-2"><StatusBadge status={a.priority === "High" ? "fail" : "warning"} /></td>
                      <td className="py-2 text-card-foreground">{a.deadline}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
            <Card title="Corrective Actions">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Action</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Trigger</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Timeline</th>
                  </tr></thead>
                  <tbody>{output.capa.correctiveActions.map((a, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 text-card-foreground">{a.action}</td>
                      <td className="py-2 text-card-foreground">{a.trigger}</td>
                      <td className="py-2 text-card-foreground">{a.timeline}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* AI Insights */}
          <TabsContent value="insights" className="space-y-4 animate-slide-up">
            <InsightCard icon={TrendingUp} title="Process Improvement" items={output.aiSuggestions.processImprovement} />
            <InsightCard icon={DollarSign} title="Cost Optimization" items={output.aiSuggestions.costOptimization} />
            <InsightCard icon={Lightbulb} title="Predictive Insights" items={output.aiSuggestions.predictiveInsights} />
            <InsightCard icon={Leaf} title="Sustainability" items={output.aiSuggestions.sustainability} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
      <h3 className="text-base font-semibold text-card-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}

function MiniCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    destructive: "bg-destructive/10 text-destructive",
    accent: "bg-accent/10 text-accent",
    secondary: "bg-secondary/10 text-secondary",
  };
  return (
    <div className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-4">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary-foreground" />
        </div>
        <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-card-foreground">
            <span className="text-secondary mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
