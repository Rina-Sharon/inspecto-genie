import { QCOutput, QCProject } from "@/types/qc";

export function generateMockQCOutput(project: QCProject): QCOutput {
  const ind = project.industry || "Manufacturing";
  const prod = project.productName || "Product";

  return {
    qualityPlan: {
      objective: `Ensure ${prod} meets all quality, safety, and regulatory requirements for the ${ind} industry through systematic quality control and continuous improvement.`,
      scope: `This quality control plan covers all stages of ${prod} manufacturing from raw material inspection through final product validation, packaging, and delivery.`,
      standards: [
        "ISO 9001:2015 - Quality Management Systems",
        "ISO 14001:2015 - Environmental Management",
        ind === "Automotive" ? "IATF 16949:2016" : "ISO 45001:2018",
        ind === "Pharma" ? "GMP / WHO Guidelines" : "ASTM Standards",
      ],
      ctqs: [
        "Dimensional accuracy within ±0.05mm",
        "Surface finish Ra ≤ 1.6 μm",
        "Material composition per specification",
        "Tensile strength ≥ 450 MPa",
        "Hardness 58-62 HRC",
      ],
      responsibilities: [
        { role: "Quality Manager", responsibility: "Overall QC plan oversight & approval" },
        { role: "QC Inspector", responsibility: "In-process and final inspection execution" },
        { role: "Process Engineer", responsibility: "SPC monitoring and process optimization" },
        { role: "Lab Technician", responsibility: "Material testing and certification" },
      ],
    },
    inspectionChecklists: [
      { id: "1", parameter: "Incoming Material Certificate", method: "Document Review", frequency: "Every Lot", acceptanceCriteria: "Matches specification", instrument: "Visual", responsibility: "QC Inspector", status: "pass" },
      { id: "2", parameter: "Dimensional Check - Length", method: "Measurement", frequency: "1 per 50 units", acceptanceCriteria: "100mm ± 0.05mm", instrument: "Digital Caliper", responsibility: "QC Inspector", status: "pass" },
      { id: "3", parameter: "Surface Roughness", method: "Profilometry", frequency: "1 per 100 units", acceptanceCriteria: "Ra ≤ 1.6 μm", instrument: "Surface Roughness Tester", responsibility: "Lab Tech", status: "warning" },
      { id: "4", parameter: "Hardness Test", method: "Rockwell C", frequency: "1 per batch", acceptanceCriteria: "58-62 HRC", instrument: "Hardness Tester", responsibility: "Lab Tech", status: "pass" },
      { id: "5", parameter: "Visual Inspection", method: "Visual", frequency: "100%", acceptanceCriteria: "No cracks, burrs, discoloration", instrument: "Magnifying Glass 10x", responsibility: "QC Inspector", status: "fail" },
      { id: "6", parameter: "Weight Verification", method: "Weighing", frequency: "1 per 25 units", acceptanceCriteria: "250g ± 2g", instrument: "Precision Scale", responsibility: "QC Inspector", status: "pass" },
    ],
    testingProtocols: [
      { id: "1", testName: "Tensile Strength Test", standard: "ASTM E8/E8M", method: "Universal Testing Machine", sampleSize: "5 per batch", acceptanceCriteria: "≥ 450 MPa", equipment: "UTM 100kN", frequency: "Per production lot" },
      { id: "2", testName: "Impact Test (Charpy)", standard: "ASTM E23", method: "Pendulum Impact", sampleSize: "3 per batch", acceptanceCriteria: "≥ 27J at -20°C", equipment: "Charpy Impact Tester", frequency: "Per production lot" },
      { id: "3", testName: "Salt Spray Corrosion", standard: "ASTM B117", method: "Salt Fog Chamber", sampleSize: "2 per batch", acceptanceCriteria: "No red rust at 500hrs", equipment: "Salt Spray Chamber", frequency: "Monthly" },
      { id: "4", testName: "Fatigue Life Test", standard: "ASTM E466", method: "Cyclic Loading", sampleSize: "3 per design", acceptanceCriteria: "≥ 10⁶ cycles", equipment: "Servo-Hydraulic Fatigue Tester", frequency: "Per new design" },
    ],
    fmea: [
      { id: "1", processStep: "Raw Material Receiving", failureMode: "Wrong material grade received", effect: "Product failure in service", cause: "Supplier error / mislabeling", severity: 9, occurrence: 3, detection: 4, rpn: 108, action: "Implement incoming material verification with spectroscopy", status: "open" },
      { id: "2", processStep: "CNC Machining", failureMode: "Out-of-tolerance dimensions", effect: "Assembly failure / rework", cause: "Tool wear / incorrect offset", severity: 7, occurrence: 5, detection: 3, rpn: 105, action: "Install automated tool wear monitoring system", status: "in-progress" },
      { id: "3", processStep: "Heat Treatment", failureMode: "Incorrect hardness", effect: "Premature wear / failure", cause: "Temperature deviation", severity: 8, occurrence: 4, detection: 5, rpn: 160, action: "Add redundant thermocouple monitoring with alarms", status: "open" },
      { id: "4", processStep: "Surface Treatment", failureMode: "Coating adhesion failure", effect: "Corrosion / aesthetic defect", cause: "Contaminated surface", severity: 6, occurrence: 4, detection: 4, rpn: 96, action: "Add pre-treatment cleanliness validation step", status: "closed" },
      { id: "5", processStep: "Final Assembly", failureMode: "Missing component", effect: "Non-functional product", cause: "Human error in assembly", severity: 8, occurrence: 3, detection: 2, rpn: 48, action: "Implement poka-yoke fixtures and vision system", status: "in-progress" },
      { id: "6", processStep: "Packaging", failureMode: "Insufficient protection", effect: "Transit damage", cause: "Wrong packaging spec used", severity: 5, occurrence: 3, detection: 6, rpn: 90, action: "Standardize packaging specs with visual work instructions", status: "open" },
    ],
    compliance: {
      applicableStandards: [
        "ISO 9001:2015 - Quality Management Systems",
        "ISO 14001:2015 - Environmental Management",
        ind === "Construction" ? "IS 456:2000 / EN 1992" : "ASTM A36",
        "OSHA Safety Standards",
        "RoHS / REACH Compliance",
      ],
      certifications: [
        "ISO 9001:2015 Certification",
        "CE Marking (if applicable)",
        ind === "Automotive" ? "IATF 16949" : "ISO 45001",
        "Product Type Approval Certificate",
      ],
      documentationRequirements: [
        "Material Test Reports (MTRs)",
        "Inspection Reports per lot",
        "Calibration Certificates for instruments",
        "Non-Conformance Reports (NCRs)",
        "Management Review Minutes",
        "Internal Audit Reports",
      ],
      auditSchedule: "Internal audits quarterly; Surveillance audit annually; Recertification every 3 years",
    },
    capa: {
      preventiveActions: [
        { action: "Implement SPC for critical dimensions", priority: "High", deadline: "30 days" },
        { action: "Supplier qualification program with annual audits", priority: "High", deadline: "60 days" },
        { action: "Operator training program with competency assessment", priority: "Medium", deadline: "45 days" },
        { action: "Predictive maintenance schedule for critical equipment", priority: "Medium", deadline: "90 days" },
      ],
      correctiveActions: [
        { action: "Root cause analysis (8D) for any customer complaint", trigger: "Customer complaint received", timeline: "48 hours initial response" },
        { action: "Process parameter review and adjustment", trigger: "SPC out-of-control signal", timeline: "Immediate containment, 24hr correction" },
        { action: "Material quarantine and disposition", trigger: "Failed incoming inspection", timeline: "Immediate quarantine" },
      ],
    },
    processControl: {
      controlCharts: ["X-bar and R charts for critical dimensions", "p-chart for defect rate monitoring", "Individual-Moving Range for batch properties"],
      spcParameters: ["Cp ≥ 1.33 target for all CTQs", "Cpk ≥ 1.67 for safety-critical parameters", "Control limits at ±3σ"],
      processCapability: "Target Cpk ≥ 1.33 for all critical-to-quality parameters. Current baseline study required within first 30 production lots.",
      monitoringPlan: "Real-time SPC dashboard with automated alerts. Daily quality review meetings. Weekly trend analysis and monthly management review.",
    },
    aiSuggestions: {
      processImprovement: [
        "Consider implementing inline vision inspection to reduce manual visual inspection time by 60%",
        "Adopt lean manufacturing principles to reduce WIP inventory by 30%",
        "Implement automated data collection from CMM to SPC software for real-time monitoring",
      ],
      costOptimization: [
        "Reduce sampling frequency for stable processes (Cpk > 2.0) to cut inspection costs by 40%",
        "Consolidate material testing with fewer, more capable instruments",
        "Implement skip-lot inspection for qualified suppliers with consistent track record",
      ],
      predictiveInsights: [
        "Tool wear patterns suggest implementing predictive replacement at 80% tool life",
        "Historical data indicates higher defect rates during shift changes — consider overlap periods",
        "Seasonal temperature variations may affect heat treatment — add environmental compensation",
      ],
      sustainability: [
        "Switch to water-based surface treatment to reduce VOC emissions by 70%",
        "Implement closed-loop coolant recycling to reduce waste by 50%",
        "Consider lightweight material alternatives to reduce carbon footprint of end product",
      ],
    },
    confidenceLevel: 87,
  };
}
