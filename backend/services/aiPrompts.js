export const SYSTEM_PROMPT = `You are IdeaForge AI, an expert venture capitalist, startup strategist, market researcher, and financial analyst.
Your task is to analyze a startup/business idea thoroughly and produce a comprehensive, structured JSON validation report.
Do NOT output markdown commentary or wrapping HTML outside of JSON. Output ONLY valid JSON matching the exact specified schema.`;

export function generateIdeaPrompt(ideaData) {
  return `Analyze the following business idea and generate a complete structured validation response:

Business Idea Title: ${ideaData.title || ideaData.name}
Description: ${ideaData.description}
Industry: ${ideaData.industry}
Region / Country: ${ideaData.region || 'Global'}
Target Market: ${ideaData.targetMarket || 'General Market'}
Business Type: ${ideaData.businessType || 'SaaS'}
Current Stage: ${ideaData.stage || 'Idea'}
Target Customer: ${ideaData.targetCustomer || 'N/A'}
Problem Severity: ${ideaData.problemSeverity || 'N/A'}
Switching Motivation: ${ideaData.switchMotivation || 'N/A'}
Problem Frequency: ${ideaData.problemFrequency || 'N/A'}
Revenue Model: ${ideaData.revenueModel || 'Subscription'}
Pricing Model: ${ideaData.pricingModel || 'Tiered'}
Expected Price: ${ideaData.expectedPrice || 'Variable'}
Customer Acquisition: ${ideaData.customerAcquisition || 'Digital'}
Distribution: ${ideaData.distribution || 'Web'}
Budget: ${ideaData.budget || 'N/A'}
Team Size: ${ideaData.teamSize || '1-3'}
Tech Skills: ${ideaData.techSkills || 'General'}
Timeline: ${ideaData.timeline || '3-6 months'}
Existing Competitors: ${ideaData.competitors || 'N/A'}

Return a JSON object with this EXACT structure:
{
  "overall_score": 85,
  "recommendation": "BUILD",
  "market_score": 88,
  "problem_score": 82,
  "competition_score": 75,
  "profitability_score": 80,
  "feasibility_score": 84,
  "scalability_score": 90,
  "risk_score": 35,
  "verdict_summary": "Detailed overall recommendation summary...",
  "strengths_summary": ["Strength 1", "Strength 2", "Strength 3"],
  "killer_risks": ["Risk 1", "Risk 2"],
  "next_actions": ["Action 1", "Action 2", "Action 3"],
  "market_analysis": {
    "tam": "$50B Global Market",
    "sam": "$8B Regional Target",
    "som": "$250M Serviceable Market",
    "tam_value": 50,
    "sam_value": 8,
    "som_value": 0.25,
    "market_growth": "12.5% CAGR",
    "demand_level": "High",
    "trends": ["Trend 1", "Trend 2", "Trend 3"]
  },
  "personas": [
    {
      "name": "Persona 1",
      "role": "Role Title",
      "age": "30-40",
      "pain_points": ["Pain 1", "Pain 2"],
      "motivations": ["Motivation 1", "Motivation 2"]
    }
  ],
  "competitors": [
    {
      "name": "Competitor 1",
      "strength": "High brand presence",
      "weakness": "High price",
      "pricing": "$50/mo",
      "opportunity": "Better UX & AI"
    }
  ],
  "business_model": {
    "recommended_model": "Subscription + Freemium",
    "revenue_streams": ["Stream 1", "Stream 2"],
    "customer_acquisition_cost": "$150",
    "lifetime_value": "$1,800",
    "gross_margin": "75%"
  },
  "financials": {
    "initial_investment": 15000,
    "monthly_operating_cost": 2500,
    "cac": 150,
    "selling_price": 49,
    "expected_monthly_customers": 50,
    "growth_rate": 12,
    "break_even_months": 6,
    "year_1_revenue": 85000,
    "year_3_revenue": 450000,
    "year_5_revenue": 1800000,
    "year_1_expenses": 42000,
    "year_3_expenses": 180000,
    "year_5_expenses": 600000,
    "year_1_profit": 43000,
    "year_3_profit": 270000,
    "year_5_profit": 1200000,
    "roi_percentage": 280,
    "payback_period_months": 6
  },
  "swot": {
    "strengths": ["S1", "S2"],
    "weaknesses": ["W1", "W2"],
    "opportunities": ["O1", "O2"],
    "threats": ["T1", "T2"]
  },
  "risks": [
    { "category": "Market", "severity": "Medium", "probability": "Low", "impact": "High", "mitigation": "Mitigation strategy..." }
  ],
  "feasibility": {
    "technical": 80,
    "financial": 85,
    "market": 88,
    "operational": 78,
    "legal": 82
  },
  "mvp": {
    "must_have": ["F1", "F2"],
    "nice_to_have": ["F3"],
    "avoid_initially": ["F4"]
  },
  "roadmap": [
    { "phase": "Phase 1: MVP", "duration": "Months 1-3", "focus": "Core Build", "status": "Upcoming" }
  ],
  "gtm_strategy": {
    "target_audience": "Audience description",
    "channels": ["Channel 1", "Channel 2"],
    "launch_tactics": "Launch plan",
    "retention_strategy": "Retention plan"
  },
  "pitch_deck": [
    { "slide": 1, "title": "Problem", "content": "Problem description..." }
  ]
}`;
}
