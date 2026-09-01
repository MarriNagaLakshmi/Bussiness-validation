# 🚀 IdeaForge AI — AI Business Idea Validation Platform

**IdeaForge AI** is a production-ready SaaS platform that allows entrepreneurs, founders, students, and investors to enter a business idea and receive a comprehensive multi-LLM data-driven analysis answering:

> ### **"Should I build this business idea?"**
> 🟢 **BUILD** | 🟡 **VALIDATE FURTHER** | 🔴 **AVOID / PIVOT**

---

## 🌟 Key Features

1. **Circular Validation Score Dial (0-100)**: Instant verdict backed by 50+ market signals.
2. **TAM / SAM / SOM Market Sizing**: Total, Serviceable, and Obtainable market calculations with trend charts.
3. **Customer Personas**: Demographic cards detailing core pain points and buying motivations.
4. **Competitor Intelligence Matrix**: 2D positioning map, strengths, weaknesses, and pricing breakdown.
5. **Interactive Financial Calculator**: Dynamic 1, 3, and 5-year revenue, net profit, CAC, LTV, break-even, and ROI sliders.
6. **2x2 SWOT & 9-Category Risk Grid**: Risk severity, probability, impact details, and mitigation strategies.
7. **5-Dimension Feasibility Assessment**: Technical, Financial, Market, Operational, and Legal readiness scores.
8. **MVP Generator & Timeline Roadmap**: Must-have, nice-to-have, and avoid features paired with a 5-phase launch timeline.
9. **Pitch Deck & Brand Generator**: 11-slide pitch deck outline, taglines, and marketing copy.
10. **PDF Executive Report Exporter & Shareable Links**: Instant single-click PDF downloads and `/report/:shareToken` public sharing.
11. **AI Business Coach**: Contextual chatbot drawer answering strategic founder questions.
12. **Multi-Idea Side-by-Side Comparison**: Select 2 to 4 saved ideas to compare metrics and find the winning venture.
13. **Multi-Language Support**: English, Hindi, Telugu, Tamil, Kannada, and Malayalam.
14. **Dark / Light Theme Toggle**: Persistent user theme preference.
15. **Admin Dashboard**: System metrics, score distribution pie charts, popular industry trends.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts, jsPDF, Canvas Confetti
- **Backend API**: Node.js, Express.js, JWT Authentication, bcryptjs
- **Database**: Zero-dependency persistent JSON/SQLite database module with auto-seeding
- **AI Abstraction Layer**:
  - Google Gemini API (`GEMINI_API_KEY`)
  - OpenAI API (`OPENAI_API_KEY`)
  - Intelligent Built-in Fallback Synthesis Engine (Ensures 100% operational demo without external API keys)
- **Deployment**: Vercel Serverless Function configuration (`vercel.json` + `api/index.js`)

---

## 📦 Installation & Local Setup

```bash
# 1. Clone repository
git clone https://github.com/MarriNagaLakshmi/Bussiness-validation.git
cd ideaforge-ai

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables (`.env`)

Create a `.env` file in `backend/` or root:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=ideaforge_ai_super_secret_jwt_key_2026

# Optional: AI API Keys (Fallback synthesis engine runs automatically if empty)
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

### Running Locally

```bash
# Run backend server (http://localhost:5000)
cd backend
npm run dev

# In a separate terminal, run frontend dev server (http://localhost:3000)
cd frontend
npm run dev
```

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/MarriNagaLakshmi/Bussiness-validation.git
   git push -u origin main
   ```
2. Import project into [Vercel](https://vercel.com).
3. Vercel will automatically detect `vercel.json` and deploy both the serverless `/api` backend and static Vite frontend 24/7!

---

## 🔒 Security & Safety Disclaimers

- Passwords are strictly hashed with `bcryptjs`.
- JWT tokens are stored securely in local storage.
- AI market estimates and financial projections contain model uncertainty and should be verified with real customer interviews.
