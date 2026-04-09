import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert Quality Control engineer and ISO auditor. Given product details, generate a comprehensive QC system.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "qualityPlan": {
    "objective": "string",
    "scope": "string",
    "standards": ["string"],
    "ctqs": ["string - critical to quality parameters with specific values"],
    "responsibilities": [{"role": "string", "responsibility": "string"}]
  },
  "inspectionChecklists": [
    {
      "id": "string",
      "parameter": "string",
      "method": "string",
      "frequency": "string",
      "acceptanceCriteria": "string",
      "instrument": "string",
      "responsibility": "string",
      "status": "pass" | "warning" | "pending"
    }
  ],
  "testingProtocols": [
    {
      "id": "string",
      "testName": "string",
      "standard": "string",
      "method": "string",
      "sampleSize": "string",
      "acceptanceCriteria": "string",
      "equipment": "string",
      "frequency": "string"
    }
  ],
  "fmea": [
    {
      "id": "string",
      "processStep": "string",
      "failureMode": "string",
      "effect": "string",
      "cause": "string",
      "severity": number (1-10),
      "occurrence": number (1-10),
      "detection": number (1-10),
      "rpn": number (severity * occurrence * detection),
      "action": "string",
      "status": "open" | "in-progress"
    }
  ],
  "compliance": {
    "applicableStandards": ["string"],
    "certifications": ["string"],
    "documentationRequirements": ["string"],
    "auditSchedule": "string"
  },
  "capa": {
    "preventiveActions": [{"action": "string", "priority": "High" | "Medium" | "Low", "deadline": "string"}],
    "correctiveActions": [{"action": "string", "trigger": "string", "timeline": "string"}]
  },
  "processControl": {
    "controlCharts": ["string"],
    "spcParameters": ["string"],
    "processCapability": "string",
    "monitoringPlan": "string"
  },
  "aiSuggestions": {
    "processImprovement": ["string"],
    "costOptimization": ["string"],
    "predictiveInsights": ["string"],
    "sustainability": ["string"]
  },
  "confidenceLevel": number (0-100, based on how complete the inputs are)
}

Generate at least 6 inspection items, 4 testing protocols, 6 FMEA rows, 4 preventive actions, and 3 corrective actions.
Make all content specific to the product, industry, materials, and processes provided. Use real standards and realistic values.
RPN must equal severity × occurrence × detection.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { project } = await req.json();

    if (!project || !project.productName) {
      return new Response(
        JSON.stringify({ error: "Missing project data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Generate a complete QC system for:

Product: ${project.productName}
Industry: ${project.industry}
Materials: ${project.materials || "Not specified"}
Specifications: ${project.specifications || "Not specified"}
Tolerances: ${project.tolerances || "Not specified"}
Manufacturing Steps: ${project.manufacturingSteps?.join(", ") || "Not specified"}
Regulations: ${project.regulations?.join(", ") || "Not specified"}

Be specific and practical. Use real industry standards and realistic acceptance criteria.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the AI response (strip markdown fences if present)
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const qcOutput = JSON.parse(cleanContent);

    return new Response(JSON.stringify(qcOutput), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-qc error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
