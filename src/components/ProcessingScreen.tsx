import { motion } from "framer-motion";
import { ProcessingStep } from "@/types/qc";
import { Check, Loader2, Circle } from "lucide-react";

interface Props {
  steps: ProcessingStep[];
}

export function ProcessingScreen({ steps }: Props) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-8 sm:p-12 shadow-elevated border border-border max-w-md w-full text-center"
      >
        {/* Animated Pulse */}
        <div className="relative mx-auto mb-8 h-20 w-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full gradient-primary animate-pulse-ring" />
          <div className="relative h-14 w-14 rounded-full gradient-primary flex items-center justify-center">
            <Loader2 className="h-7 w-7 text-primary-foreground animate-spin" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-card-foreground mb-2">Generating QC System</h2>
        <p className="text-sm text-muted-foreground mb-8">AI is analyzing your specifications…</p>

        <div className="space-y-4 text-left">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              {step.status === "done" ? (
                <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-secondary-foreground" />
                </div>
              ) : step.status === "active" ? (
                <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center">
                  <Loader2 className="h-3.5 w-3.5 text-primary-foreground animate-spin" />
                </div>
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground/40" />
              )}
              <span className={`text-sm font-medium ${step.status === "done" ? "text-secondary" : step.status === "active" ? "text-card-foreground" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
