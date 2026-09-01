import express from 'express';
import { db } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get Admin System Metrics
router.get('/metrics', authenticateToken, (req, res) => {
  const users = db.getUsers();
  const ideas = db.getIdeas();

  const totalUsers = users.length;
  const totalIdeas = ideas.length;
  
  const totalScoreSum = ideas.reduce((acc, i) => acc + (i.score || 0), 0);
  const averageScore = totalIdeas > 0 ? Math.round(totalScoreSum / totalIdeas) : 0;

  // Group by Industry
  const industryCounts = {};
  ideas.forEach(i => {
    const ind = i.industry || 'Technology';
    industryCounts[ind] = (industryCounts[ind] || 0) + 1;
  });

  const popularIndustries = Object.entries(industryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Score distribution breakdown
  const scoreDistribution = {
    high: ideas.filter(i => (i.score || 0) >= 80).length,
    medium: ideas.filter(i => (i.score || 0) >= 65 && (i.score || 0) < 80).length,
    low: ideas.filter(i => (i.score || 0) < 65).length
  };

  res.json({
    totalUsers,
    totalIdeas,
    averageScore,
    activeUsers: Math.max(1, Math.round(totalUsers * 0.85)),
    reportsGenerated: totalIdeas,
    popularIndustries,
    scoreDistribution,
    recentAnalyses: ideas.slice(0, 5).map(i => ({
      id: i.id,
      title: i.title,
      industry: i.industry,
      score: i.score,
      recommendation: i.recommendation,
      createdAt: i.createdAt
    }))
  });
});

export default router;
