import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Could not create data directory:', err);
  }
}

// Initial Sample Data for Instant Demo Experience
const initialData = {
  users: [
    {
      id: 'demo-user-1',
      name: 'Alex Rivera',
      email: 'demo@ideaforge.ai',
      passwordHash: '$2a$10$w8T0M9fM1j4MvXbWb.rUeO9r.Kj5J4N1Z6.H9J8K7L6M5N4O3P2Q1', // hashed 'password123'
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      country: 'United States',
      industry: 'AI & Machine Learning',
      experience: 'Intermediate Founder',
      startupInterests: ['SaaS', 'AI Tools', 'Marketplaces'],
      subscriptionTier: 'PRO',
      analysesCount: 4,
      createdAt: new Date().toISOString()
    },
    {
      id: 'admin-user-1',
      name: 'Admin User',
      email: 'admin@ideaforge.ai',
      passwordHash: '$2a$10$w8T0M9fM1j4MvXbWb.rUeO9r.Kj5J4N1Z6.H9J8K7L6M5N4O3P2Q1',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      country: 'India',
      industry: 'Technology',
      experience: 'Serial Entrepreneur',
      startupInterests: ['FinTech', 'AgriTech', 'EdTech'],
      subscriptionTier: 'BUSINESS',
      analysesCount: 12,
      createdAt: new Date().toISOString()
    }
  ],
  ideas: [
    {
      id: 'idea-demo-1',
      userId: 'demo-user-1',
      title: 'Farm2Table AI Direct Farmer Marketplace',
      description: 'An AI-powered B2B platform that connects regional organic farmers directly with urban restaurants and grocery chains to cut out middleman markup and optimize crop delivery schedules.',
      industry: 'AgriTech',
      region: 'North America & India',
      targetMarket: 'Organic restaurants & commercial kitchens',
      businessType: 'Marketplace',
      stage: 'Concept / Validation',
      targetCustomer: 'Restaurant owners & regional organic produce farmers',
      problemSeverity: 'High - Food waste & 40% middleman margin loss',
      switchMotivation: 'Higher profit margins for farmers and fresher guaranteed produce for restaurants',
      problemFrequency: 'Daily ordering cycles',
      revenueModel: 'Commission + Subscription',
      pricingModel: '5% transaction fee + $99/mo premium buyer analytics',
      expectedPrice: '$99/month',
      customerAcquisition: 'Direct sales & regional agricultural co-op partnerships',
      distribution: 'Web & Mobile B2B Platform',
      budget: '$25,000',
      teamSize: '3 Founders (Tech + Sales + Logistics)',
      techSkills: 'Full-Stack React & Node.js',
      timeline: '4 Months to Launch MVP',
      competitors: 'Traditional wholesale produce distributors, local co-ops',
      traction: '15 pilot restaurant LOIs signed',
      score: 84,
      recommendation: 'BUILD',
      isSaved: true,
      isFavorite: true,
      shareToken: 'farm2table-ai-demo-share',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      analysisResult: {
        overall_score: 84,
        recommendation: 'BUILD',
        market_score: 88,
        problem_score: 85,
        competition_score: 72,
        profitability_score: 82,
        feasibility_score: 80,
        scalability_score: 89,
        risk_score: 38,
        verdict_summary: 'BUILD — Farm2Table AI addresses a high-friction supply chain problem with verified demand. The 40% margin inefficiency between farmers and restaurants provides ample room for monetization while building strong network effects.',
        strengths_summary: [
          'Massive addressable market with recurring daily transaction volume',
          'Strong dual-sided value proposition (higher margins for farmers, lower costs for buyers)',
          'High barrier to entry once regional logistics routing AI is established'
        ],
        killer_risks: [
          'Perishable logistics delays during early scaling phases',
          'Cold-start chicken-and-egg supply side marketplace liquidity'
        ],
        next_actions: [
          'Secure 20 anchor organic farms in a single metropolitan test region',
          'Deploy lightweight order booking MVP with manual routing dispatch',
          'Run a 30-day pilot to measure order fill rate and produce freshness metrics'
        ],
        market_analysis: {
          tam: '$120 Billion Global Organic Food Supply Chain',
          sam: '$18 Billion US & Regional Commercial Restaurant Produce Market',
          som: '$450 Million Regional Direct Farm Procurement',
          tam_value: 120,
          sam_value: 18,
          som_value: 0.45,
          market_growth: '14.2% CAGR',
          demand_level: 'High & Growing',
          trends: [
            'Push for sustainable zero-mile farm-to-table sourcing',
            'Surging inflation forcing restaurants to cut middleman costs',
            'Adoption of automated inventory demand forecasting'
          ]
        },
        personas: [
          {
            name: 'Chef Marcus Vance',
            role: 'Head Chef & Co-Owner at Bistro Verde',
            age: '38',
            pain_points: [
              'Wholesale produce quality is inconsistent',
              'Middleman pricing surges unpredictably during peak season',
              'Lack of transparency on farm origin'
            ],
            motivations: [
              'Guaranteed farm-fresh organic produce delivered daily',
              'Direct connection with local growers for custom crop requests',
              '15-20% lower cost compared to broadline distributors'
            ]
          },
          {
            name: 'Elena Rostova',
            role: '3rd Generation Organic Farm Owner',
            age: '44',
            pain_points: [
              'Losing up to 45% crop value to middlemen brokers',
              'Difficulty forecasting restaurant bulk demand',
              'Delayed payment terms (60-90 days)'
            ],
            motivations: [
              'Instant digital payments upon delivery confirmation',
              'Direct pricing power without distributor exploitation',
              'Guaranteed weekly purchase orders before harvest'
            ]
          }
        ],
        competitors: [
          {
            name: 'Sysco / US Foods',
            strength: 'Massive distribution scale & existing restaurant relationships',
            weakness: 'Industrial focus, low freshness, high middleman markup',
            pricing: 'High volume wholesale with hidden markup',
            opportunity: 'Target farm-conscious organic & farm-to-table dining segments'
          },
          {
            name: 'Ninjanode / Local Co-ops',
            strength: 'Hyper-local farmer connections',
            weakness: 'Manual phone/email ordering, zero logistics routing software',
            pricing: 'Unpredictable variable fees',
            opportunity: 'Provide automated AI matching and optimized refrigerated route dispatch'
          }
        ],
        business_model: {
          recommended_model: 'Take-Rate Marketplace + Subscription Tier',
          revenue_streams: [
            '5% transaction take-rate on direct produce orders',
            '$99/month premium tier for restaurants (auto-replenishment AI & custom crop pre-orders)',
            '$49/month farm logistics management suite'
          ],
          customer_acquisition_cost: '$320 per restaurant / $150 per farm',
          lifetime_value: '$4,800 per active customer',
          gross_margin: '68% gross margin at scale'
        },
        financials: {
          initial_investment: 25000,
          monthly_operating_cost: 3500,
          cac: 320,
          selling_price: 99,
          expected_monthly_customers: 65,
          growth_rate: 15,
          break_even_months: 8,
          year_1_revenue: 142000,
          year_3_revenue: 890000,
          year_5_revenue: 3400000,
          year_1_expenses: 62000,
          year_3_expenses: 310000,
          year_5_expenses: 1100000,
          year_1_profit: 80000,
          year_3_profit: 580000,
          year_5_profit: 2300000,
          roi_percentage: 320,
          payback_period_months: 7
        },
        swot: {
          strengths: [
            'Direct farm-to-chef transparency',
            'Proprietary demand matching AI algorithm',
            'High customer retention due to essential daily supply workflow'
          ],
          weaknesses: [
            'Dependent on local logistics transport partners',
            'Initial cold-start marketplace liquidity requirement'
          ],
          opportunities: [
            'Expand to corporate cafeterias, hotel chains, and university dining',
            'Provide agricultural micro-loans based on platform purchase order history'
          ],
          threats: [
            'Extreme weather impacting local crop yields',
            'Incumbent food distributors launching competitive direct-sourcing portals'
          ]
        },
        risks: [
          { category: 'Logistics & Operational', severity: 'High', probability: 'Medium', impact: 'Perishable crop spoilage', mitigation: 'Partner with cold-chain 3PL logistics with guaranteed temperature logs' },
          { category: 'Market Liquidity', severity: 'Medium', probability: 'High', impact: 'Slow initial buyer onboarding', mitigation: 'Focus hyper-locally on 1 single metro city before regional expansion' },
          { category: 'Regulatory & Food Safety', severity: 'Medium', probability: 'Low', impact: 'USDA / FSMA compliance checks', mitigation: 'Automate farm food safety certification uploads on farmer onboarding' }
        ],
        feasibility: {
          technical: 85,
          financial: 78,
          market: 88,
          operational: 72,
          legal: 80
        },
        mvp: {
          must_have: [
            'Direct buyer-seller order booking portal',
            'Automated inventory & crop availability catalog',
            'Integrated Stripe payment processing with escrow release',
            'SMS/WhatsApp order notifications for farmers'
          ],
          nice_to_have: [
            'Route optimization for local delivery drivers',
            'Predictive harvest demand forecasts'
          ],
          avoid_initially: [
            'Building custom fleet management hardware',
            'Complex multi-currency cross-border shipping'
          ]
        },
        roadmap: [
          { phase: 'Phase 1: Validation & LOIs', duration: 'Month 1-2', focus: 'Secure 20 farm partnerships and 15 pilot restaurant buyers', status: 'Completed' },
          { phase: 'Phase 2: MVP Launch', duration: 'Month 3-4', focus: 'Launch web ordering portal and manual cold-chain route dispatch in Metro Metro-Area', status: 'In Progress' },
          { phase: 'Phase 3: Automation & AI', duration: 'Month 5-7', focus: 'Deploy demand forecasting engine and route optimization', status: 'Upcoming' },
          { phase: 'Phase 4: Scale Regionally', duration: 'Month 8-12', focus: 'Expand to 3 adjacent metropolitan clusters and corporate dining', status: 'Upcoming' }
        ],
        gtm_strategy: {
          target_audience: 'Mid-to-high end organic restaurants, farm-to-table eateries, and artisanal grocery buyers',
          channels: ['Direct field sales', 'Regional organic farming summits', 'Chef association sponsorships', 'Local LinkedIn B2B campaigns'],
          launch_tactics: 'Offer zero commission fees for the first 30 days for founding farm members',
          retention_strategy: 'Automated weekly recurring standing orders for kitchen staples'
        },
        pitch_deck: [
          { slide: 1, title: 'Title', content: 'Farm2Table AI: Direct Farm Procurement for Modern Restaurants' },
          { slide: 2, title: 'Problem', content: 'Restaurants overpay by 40% while farmers lose crop margin to sluggish food distributors.' },
          { slide: 3, title: 'Solution', content: 'AI-driven marketplace connecting regional growers directly with commercial kitchens.' },
          { slide: 4, title: 'Market Opportunity', content: '$18 Billion TAM in regional restaurant produce with 14% annual growth.' },
          { slide: 5, title: 'Product', content: 'Real-time crop inventory, automated route optimization, and instant payout escrow.' },
          { slide: 6, title: 'Business Model', content: '5% transaction take-rate + $99/mo restaurant analytics subscription.' },
          { slide: 7, title: 'Traction', content: '15 pilot restaurant LOIs and 20 committed organic farms.' },
          { slide: 8, title: 'Go-To-Market', content: 'Hyper-local geographic density blitz starting in single metro cluster.' },
          { slide: 9, title: 'Competition', content: 'Outperforming legacy broadline distributors on freshness, price, and transparency.' },
          { slide: 10, title: 'Financials', content: '$142K Year 1 Revenue growing to $3.4M in Year 5 with 68% gross margin.' },
          { slide: 11, title: 'Funding Ask', content: 'Seeking $250,000 pre-seed round for MVP completion and 12-month pilot rollout.' }
        ]
      }
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      userId: 'demo-user-1',
      title: 'Validation Completed',
      message: 'Your analysis for "Farm2Table AI Direct Farmer Marketplace" is ready with a score of 84/100.',
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    }
  ],
  subscriptions: [
    {
      id: 'sub-1',
      userId: 'demo-user-1',
      plan: 'PRO',
      status: 'active',
      limitCount: 100,
      usedCount: 4
    }
  ]
};

// In-Memory state initialized with saved DB or Initial Data
let memoryDb = { ...initialData };

export function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
    } else {
      saveDb();
    }
  } catch (err) {
    console.warn('Using in-memory DB fallback:', err.message);
  }
  return memoryDb;
}

export function saveDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.warn('File save warning (running in serverless or read-only mode):', err.message);
  }
}

// Initial load
loadDb();

export const db = {
  getUsers: () => memoryDb.users,
  getUserById: (id) => memoryDb.users.find(u => u.id === id),
  getUserByEmail: (email) => memoryDb.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  addUser: (user) => {
    memoryDb.users.push(user);
    saveDb();
    return user;
  },
  updateUser: (id, updates) => {
    const idx = memoryDb.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      memoryDb.users[idx] = { ...memoryDb.users[idx], ...updates };
      saveDb();
      return memoryDb.users[idx];
    }
    return null;
  },
  getIdeas: (userId) => {
    if (!userId) return memoryDb.ideas;
    return memoryDb.ideas.filter(i => i.userId === userId);
  },
  getIdeaById: (id) => memoryDb.ideas.find(i => i.id === id),
  getIdeaByShareToken: (token) => memoryDb.ideas.find(i => i.shareToken === token),
  addIdea: (idea) => {
    memoryDb.ideas.unshift(idea);
    saveDb();
    return idea;
  },
  updateIdea: (id, updates) => {
    const idx = memoryDb.ideas.findIndex(i => i.id === id);
    if (idx !== -1) {
      memoryDb.ideas[idx] = { ...memoryDb.ideas[idx], ...updates, updatedAt: new Date().toISOString() };
      saveDb();
      return memoryDb.ideas[idx];
    }
    return null;
  },
  deleteIdea: (id, userId) => {
    const initialLen = memoryDb.ideas.length;
    memoryDb.ideas = memoryDb.ideas.filter(i => !(i.id === id && i.userId === userId));
    const deleted = memoryDb.ideas.length < initialLen;
    if (deleted) saveDb();
    return deleted;
  },
  getNotifications: (userId) => memoryDb.notifications.filter(n => n.userId === userId),
  addNotification: (notif) => {
    memoryDb.notifications.unshift(notif);
    saveDb();
    return notif;
  },
  markNotificationRead: (id, userId) => {
    const n = memoryDb.notifications.find(item => item.id === id && item.userId === userId);
    if (n) {
      n.read = true;
      saveDb();
    }
    return n;
  },
  getSubscription: (userId) => memoryDb.subscriptions.find(s => s.userId === userId) || { plan: 'FREE', limitCount: 3, usedCount: 0 },
  incrementUsage: (userId) => {
    let sub = memoryDb.subscriptions.find(s => s.userId === userId);
    if (!sub) {
      sub = { id: 'sub-' + Date.now(), userId, plan: 'FREE', limitCount: 3, usedCount: 1 };
      memoryDb.subscriptions.push(sub);
    } else {
      sub.usedCount = (sub.usedCount || 0) + 1;
    }
    saveDb();
    return sub;
  }
};
