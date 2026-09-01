import express from 'express';
import { db } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { analyzeBusinessIdea, askAiCoach } from '../services/aiProvider.js';

const router = express.Router();

// Analyze New Idea
router.post('/analyze', authenticateToken, async (req, res) => {
  try {
    const ideaData = req.body;
    if (!ideaData.title && !ideaData.description) {
      return res.status(400).json({ error: 'Title and description are required for AI analysis' });
    }

    // Check subscription usage
    const sub = db.getSubscription(req.user.id);
    if (sub.limitCount > 0 && sub.usedCount >= sub.limitCount && sub.plan === 'FREE') {
      return res.status(403).json({
        error: 'Free limit reached (3/3 analyses). Please upgrade to PRO for unlimited validations.'
      });
    }

    console.log(`Starting AI Validation for: "${ideaData.title}"...`);
    const { provider, data: analysisResult } = await analyzeBusinessIdea(ideaData);

    const shareToken = (ideaData.title || 'idea').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substr(2, 6);

    const newIdea = {
      id: 'idea-' + Date.now(),
      userId: req.user.id,
      title: ideaData.title || 'Untitled Business Idea',
      description: ideaData.description,
      industry: ideaData.industry || 'Technology',
      region: ideaData.region || 'Global',
      targetMarket: ideaData.targetMarket || 'General',
      businessType: ideaData.businessType || 'SaaS',
      stage: ideaData.stage || 'Idea Stage',
      targetCustomer: ideaData.targetCustomer || '',
      problemSeverity: ideaData.problemSeverity || '',
      switchMotivation: ideaData.switchMotivation || '',
      problemFrequency: ideaData.problemFrequency || '',
      revenueModel: ideaData.revenueModel || 'Subscription',
      pricingModel: ideaData.pricingModel || 'Tiered',
      expectedPrice: ideaData.expectedPrice || '$49/mo',
      customerAcquisition: ideaData.customerAcquisition || 'Digital Direct',
      distribution: ideaData.distribution || 'Web',
      budget: ideaData.budget || '$20,000',
      teamSize: ideaData.teamSize || '1-3 Founders',
      techSkills: ideaData.techSkills || 'Technical',
      timeline: ideaData.timeline || '3 Months',
      competitors: ideaData.competitors || '',
      traction: ideaData.traction || '',
      score: analysisResult.overall_score || 80,
      recommendation: analysisResult.recommendation || 'BUILD',
      isSaved: true,
      isFavorite: false,
      shareToken,
      providerUsed: provider,
      analysisResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.addIdea(newIdea);
    db.incrementUsage(req.user.id);
    db.addNotification({
      id: 'notif-' + Date.now(),
      userId: req.user.id,
      title: 'Analysis Completed',
      message: `Your business idea "${newIdea.title}" scored ${newIdea.score}/100 (${newIdea.recommendation}).`,
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    });

    res.json({ idea: newIdea, providerUsed: provider });
  } catch (err) {
    console.error('AI Analysis API Error:', err);
    res.status(500).json({ error: 'AI Analysis engine failed: ' + err.message });
  }
});

// AI Business Coach Endpoint
router.post('/coach', authenticateToken, async (req, res) => {
  try {
    const { ideaId, question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    let idea = db.getIdeaById(ideaId);
    if (!idea) {
      idea = { title: 'General Business Strategy', industry: 'SaaS', score: 80, recommendation: 'BUILD' };
    }

    const reply = await askAiCoach(idea, question);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Coach reply failed: ' + err.message });
  }
});

export default router;
