export type RecommendationType = 'BUILD' | 'VALIDATE FURTHER' | 'AVOID / PIVOT';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  country?: string;
  industry?: string;
  experience?: string;
  startupInterests?: string[];
  subscriptionTier: 'FREE' | 'PRO' | 'BUSINESS';
  analysesCount?: number;
}

export interface Persona {
  name: string;
  role: string;
  age: string;
  pain_points: string[];
  motivations: string[];
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
  pricing: string;
  opportunity: string;
}

export interface RiskItem {
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  impact: string;
  mitigation: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export interface PitchSlide {
  slide: number;
  title: string;
  content: string;
}

export interface AnalysisResult {
  overall_score: number;
  recommendation: RecommendationType;
  market_score: number;
  problem_score: number;
  competition_score: number;
  profitability_score: number;
  feasibility_score: number;
  scalability_score: number;
  risk_score: number;
  verdict_summary: string;
  strengths_summary: string[];
  killer_risks: string[];
  next_actions: string[];
  market_analysis: {
    tam: string;
    sam: string;
    som: string;
    tam_value: number;
    sam_value: number;
    som_value: number;
    market_growth: string;
    demand_level: string;
    trends: string[];
  };
  personas: Persona[];
  competitors: Competitor[];
  business_model: {
    recommended_model: string;
    revenue_streams: string[];
    customer_acquisition_cost: string;
    lifetime_value: string;
    gross_margin: string;
  };
  financials: {
    initial_investment: number;
    monthly_operating_cost: number;
    cac: number;
    selling_price: number;
    expected_monthly_customers: number;
    growth_rate: number;
    break_even_months: number;
    year_1_revenue: number;
    year_3_revenue: number;
    year_5_revenue: number;
    year_1_expenses: number;
    year_3_expenses: number;
    year_5_expenses: number;
    year_1_profit: number;
    year_3_profit: number;
    year_5_profit: number;
    roi_percentage: number;
    payback_period_months: number;
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risks: RiskItem[];
  feasibility: {
    technical: number;
    financial: number;
    market: number;
    operational: number;
    legal: number;
  };
  mvp: {
    must_have: string[];
    nice_to_have: string[];
    avoid_initially: string[];
  };
  roadmap: RoadmapPhase[];
  gtm_strategy: {
    target_audience: string;
    channels: string[];
    launch_tactics: string;
    retention_strategy: string;
  };
  pitch_deck: PitchSlide[];
}

export interface BusinessIdea {
  id: string;
  userId: string;
  title: string;
  description: string;
  industry: string;
  region: string;
  targetMarket: string;
  businessType: string;
  stage: string;
  targetCustomer?: string;
  problemSeverity?: string;
  switchMotivation?: string;
  problemFrequency?: string;
  revenueModel?: string;
  pricingModel?: string;
  expectedPrice?: string;
  customerAcquisition?: string;
  distribution?: string;
  budget?: string;
  teamSize?: string;
  techSkills?: string;
  timeline?: string;
  competitors?: string;
  traction?: string;
  score: number;
  recommendation: RecommendationType;
  isSaved?: boolean;
  isFavorite?: boolean;
  shareToken?: string;
  providerUsed?: string;
  analysisResult: AnalysisResult;
  createdAt: string;
  updatedAt: string;
}

export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml';
