import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, BarChart3, FileCheck, Zap, ChevronRight } from "lucide-react";

interface Props {
  onStart: () => void;
}

const features = [
  { icon: Shield, title: "Risk Analysis", desc: "Automated FMEA with intelligent RPN scoring" },
  { icon: FileCheck, title: "QC Plans", desc: "Standards-compliant inspection checklists" },
  { icon: BarChart3, title: "SPC & Analytics", desc: "Process control with real-time monitoring" },
  { icon: Zap, title: "AI Insights", desc: "Predictive quality & optimization suggestions" },
];

export function LandingScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="gradient-hero flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground/80 mb-8">
              <Shield className="h-4 w-4" />
              AI-Powered Quality Control
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
              Quality Control System
              <br />
              <span className="text-secondary">Generator</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Generate comprehensive QC plans, FMEA analysis, testing protocols, and compliance documentation — powered by AI, built for engineers.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-10 py-6 rounded-xl" onClick={onStart}>
              Start New QC Project
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
