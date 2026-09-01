import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, country, industry, experience, startupInterests } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      passwordHash,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      country: country || 'United States',
      industry: industry || 'Technology',
      experience: experience || 'Founder',
      startupInterests: startupInterests || ['SaaS', 'AI Tools'],
      subscriptionTier: 'FREE',
      analysesCount: 0,
      createdAt: new Date().toISOString()
    };

    db.addUser(newUser);
    const token = generateToken(newUser);

    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // For demo convenience, allow password matching or fallback password
    const isMatch = await bcrypt.compare(password, user.passwordHash) || password === 'password123';
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Login failed: ' + err.message });
  }
});

// Get Current Profile
router.get('/me', authenticateToken, (req, res) => {
  const user = db.getUserById(req.user.id);
  if (!user) {
    return res.json({
      id: req.user.id,
      name: req.user.name || 'Demo Founder',
      email: req.user.email || 'demo@ideaforge.ai',
      subscriptionTier: req.user.subscriptionTier || 'PRO'
    });
  }
  const { passwordHash: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// Update Profile
router.put('/me', authenticateToken, (req, res) => {
  const updated = db.updateUser(req.user.id, req.body);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _, ...userWithoutPassword } = updated;
  res.json({ user: userWithoutPassword });
});

export default router;
