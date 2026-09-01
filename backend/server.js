import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'IdeaForge AI API Backend',
    timestamp: new Date().toISOString(),
    aiProviders: {
      gemini: !!process.env.GEMINI_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      fallback: true
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// Only listen if not imported as serverless module
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 IdeaForge AI Backend Server running at http://localhost:${PORT}`);
  });
}

export default app;
