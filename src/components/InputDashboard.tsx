import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QCProject } from "@/types/qc";
import { ArrowLeft, Plus, X, Rocket } from "lucide-react";

const INDUSTRIES = [
  "Automotive", "Construction", "Electronics", "Pharmaceutical",
  "Aerospace", "Food & Beverage", "Textiles", "Heavy Machinery",
  "Medical Devices", "Consumer Goods",
];

const REGULATIONS = [
  "ISO 9001:2015", "ISO 14001:2015", "IATF 16949", "AS9100",
  "ISO 13485", "GMP", "OSHA", "RoHS", "REACH", "CE Marking",
  "BIS Standards", "ASTM Standards", "FDA 21 CFR",
];

interface Props {
  onSubmit: (project: QCProject) => void;
  onBack: () => void;
}

export function InputDashboard({ onSubmit, onBack }: Props) {
  const [productName, setProductName] = useState("");
  const [industry, setIndustry] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [materials, setMaterials] = useState("");
  const [tolerances, setTolerances] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [manufacturingSteps, setManufacturingSteps] = useState<string[]>([]);
  const [selectedRegs, setSelectedRegs] = useState<string[]>([]);

  const addStep = () => {
    if (stepInput.trim()) {
      setManufacturingSteps((s) => [...s, stepInput.trim()]);
      setStepInput("");
    }
  };

  const toggleReg = (reg: string) => {
    setSelectedRegs((prev) =>
      prev.includes(reg) ? prev.filter((r) => r !== reg) : [...prev, reg]
    );
  };

  const handleSubmit = () => {
    const project: QCProject = {
      id: crypto.randomUUID(),
      productName: productName || "Unnamed Product",
      industry: industry || "General Manufacturing",
      specifications,
      manufacturingSteps: manufacturingSteps.length ? manufacturingSteps : ["Material Prep", "Processing", "Assembly", "Finishing", "Packaging"],
      regulations: selectedRegs,
      tolerances,
      materials,
      createdAt: new Date().toISOString(),
    };
    onSubmit(project);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-card-foreground">New QC Project</h1>
            <p className="text-sm text-muted-foreground">Enter product and process details</p>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8"
      >
        {/* Product Info */}
        <section className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h2 className="text-lg font-semibold text-card-foreground">Product Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input id="productName" placeholder="e.g., High-Strength Steel Bolt M12" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Industry *</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="materials">Materials</Label>
            <Input id="materials" placeholder="e.g., AISI 4140 alloy steel, Grade 10.9" value={materials} onChange={(e) => setMaterials(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specs">Specifications & Requirements</Label>
            <Textarea id="specs" rows={3} placeholder="Describe dimensions, performance requirements, finish standards…" value={specifications} onChange={(e) => setSpecifications(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tolerances">Tolerances & Performance Criteria</Label>
            <Input id="tolerances" placeholder="e.g., ±0.05mm, Ra 1.6μm, Tensile ≥ 450 MPa" value={tolerances} onChange={(e) => setTolerances(e.target.value)} />
          </div>
        </section>

        {/* Manufacturing Steps */}
        <section className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h2 className="text-lg font-semibold text-card-foreground">Manufacturing Process Steps</h2>
          <div className="flex gap-2">
            <Input placeholder="Add a process step…" value={stepInput} onChange={(e) => setStepInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addStep()} />
            <Button variant="outline" size="icon" onClick={addStep}><Plus className="h-4 w-4" /></Button>
          </div>
          {manufacturingSteps.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {manufacturingSteps.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {i + 1}. {s}
                  <button onClick={() => setManufacturingSteps((prev) => prev.filter((_, idx) => idx !== i))} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">Leave empty for smart defaults based on your industry.</p>
        </section>

        {/* Regulations */}
        <section className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h2 className="text-lg font-semibold text-card-foreground">Regulatory Requirements</h2>
          <div className="flex flex-wrap gap-2">
            {REGULATIONS.map((reg) => (
              <button
                key={reg}
                onClick={() => toggleReg(reg)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors ${
                  selectedRegs.includes(reg)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border hover:border-primary/50"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </section>

        <div className="flex justify-end pb-8">
          <Button variant="hero" size="lg" className="px-10 rounded-xl" onClick={handleSubmit}>
            <Rocket className="h-5 w-5 mr-2" />
            Generate QC System
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
