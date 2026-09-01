import express from 'express';
import { db } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { analyzeBusinessIdea } from '../services/aiProvider.js';

const router = express.Router();

// Get User's Ideas
router.get('/', authenticateToken, (req, res) => {
  const ideas = db.getIdeas(req.user.id);
  res.json({ ideas });
});

// Get Idea By ID
router.get('/:id', authenticateToken, (req, res) => {
  const idea = db.getIdeaById(req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  res.json({ idea });
});

// Get Public Shareable Report
router.get('/report/:shareToken', (req, res) => {
  const idea = db.getIdeaByShareToken(req.params.shareToken);
  if (!idea) return res.status(404).json({ error: 'Public report not found or invalid share link' });
  res.json({ idea });
});

// Save or Toggle Favorite Idea
router.patch('/:id/favorite', authenticateToken, (req, res) => {
  const idea = db.getIdeaById(req.params.id);
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  const updated = db.updateIdea(req.params.id, { isFavorite: !idea.isFavorite });
  res.json({ idea: updated });
});

// Delete Idea
router.delete('/:id', authenticateToken, (req, res) => {
  const success = db.deleteIdea(req.params.id, req.user.id);
  if (!success) return res.status(404).json({ error: 'Idea not found or permission denied' });
  res.json({ message: 'Idea deleted successfully' });
});

// Compare Multiple Ideas
router.post('/compare', authenticateToken, (req, res) => {
  const { ideaIds } = req.body;
  if (!Array.isArray(ideaIds) || ideaIds.length < 2) {
    return res.status(400).json({ error: 'Please provide at least 2 idea IDs to compare' });
  }

  const ideas = ideaIds.map(id => db.getIdeaById(id)).filter(Boolean);
  if (ideas.length < 2) {
    return res.status(400).json({ error: 'Could not find requested ideas for comparison' });
  }

  // Determine top recommended idea
  const topIdea = [...ideas].sort((a, b) => (b.score || 0) - (a.score || 0))[0];

  res.json({
    ideas,
    recommendedIdeaId: topIdea.id,
    comparisonReasoning: `"${topIdea.title}" scores highest (${topIdea.score}/100) due to superior market potential, manageable startup risk, and strong unit economics.`
  });
});

export default router;
