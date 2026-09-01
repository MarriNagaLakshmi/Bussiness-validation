import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ideaforge_ai_super_secret_jwt_key_2026';

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, subscriptionTier: user.subscriptionTier },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Guest or anonymous access mode handling
    req.user = { id: 'demo-user-1', email: 'demo@ideaforge.ai', name: 'Demo User', subscriptionTier: 'PRO' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = { id: 'demo-user-1', email: 'demo@ideaforge.ai', name: 'Demo User', subscriptionTier: 'PRO' };
      return next();
    }
    req.user = user;
    next();
  });
}
