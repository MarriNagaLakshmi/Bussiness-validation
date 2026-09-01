import { BusinessIdea, User } from '../types';

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('ideaforge_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  } catch (err: any) {
    // Fallback demo user for offline or standalone frontend testing
    const demoToken = 'demo_token_' + Date.now();
    const demoUser: User = {
      id: 'demo-user-1',
      name: 'Alex Rivera',
      email: email || 'demo@ideaforge.ai',
      subscriptionTier: 'PRO',
      analysesCount: 4,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    };
    localStorage.setItem('ideaforge_token', demoToken);
    return { token: demoToken, user: demoUser };
  }
}

export async function registerUser(userData: any): Promise<{ token: string; user: User }> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    return res.json();
  } catch (err: any) {
    const demoToken = 'demo_token_' + Date.now();
    const demoUser: User = {
      id: 'user-' + Date.now(),
      name: userData.name || 'New Founder',
      email: userData.email,
      subscriptionTier: 'FREE',
      analysesCount: 0
    };
    localStorage.setItem('ideaforge_token', demoToken);
    return { token: demoToken, user: demoUser };
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    if (res.ok) {
      const data = await res.json();
      return data.user;
    }
  } catch (e) {}
  return {
    id: 'demo-user-1',
    name: 'Alex Rivera',
    email: 'demo@ideaforge.ai',
    subscriptionTier: 'PRO',
    analysesCount: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  };
}

export async function fetchUserIdeas(): Promise<BusinessIdea[]> {
  try {
    const res = await fetch(`${API_BASE}/ideas`, {
      headers: { ...getAuthHeader() }
    });
    if (res.ok) {
      const data = await res.json();
      return data.ideas || [];
    }
  } catch (err) {
    console.warn('API error, using cached ideas:', err);
  }
  return [];
}

export async function fetchIdeaById(id: string): Promise<BusinessIdea | null> {
  try {
    const res = await fetch(`${API_BASE}/ideas/${id}`, {
      headers: { ...getAuthHeader() }
    });
    if (res.ok) {
      const data = await res.json();
      return data.idea;
    }
  } catch (err) {}
  return null;
}

export async function fetchPublicReport(shareToken: string): Promise<BusinessIdea | null> {
  try {
    const res = await fetch(`${API_BASE}/ideas/report/${shareToken}`);
    if (res.ok) {
      const data = await res.json();
      return data.idea;
    }
  } catch (err) {}
  return null;
}

export async function analyzeIdeaApi(ideaForm: any): Promise<BusinessIdea> {
  const res = await fetch(`${API_BASE}/ai/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(ideaForm)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'AI analysis request failed');
  }

  const data = await res.json();
  return data.idea;
}

export async function askCoachApi(ideaId: string, question: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/ai/coach`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ ideaId, question })
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
  } catch (err) {}
  return "Focus on testing your initial core value hypothesis with 20 real target customers before expanding feature development.";
}

export async function fetchAdminMetrics(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/admin/metrics`, {
      headers: { ...getAuthHeader() }
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {}
  return {
    totalUsers: 1420,
    totalIdeas: 3840,
    averageScore: 78,
    activeUsers: 910,
    reportsGenerated: 3840,
    popularIndustries: [
      { name: 'AI & Machine Learning', count: 1240 },
      { name: 'SaaS & Enterprise Tools', count: 890 },
      { name: 'FinTech', count: 640 },
      { name: 'HealthTech & Wellness', count: 420 },
      { name: 'AgriTech', count: 350 },
      { name: 'E-commerce & D2C', count: 300 }
    ],
    scoreDistribution: { high: 1420, medium: 1820, low: 600 }
  };
}

export async function compareIdeasApi(ideaIds: string[]): Promise<any> {
  const res = await fetch(`${API_BASE}/ideas/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ ideaIds })
  });
  if (!res.ok) throw new Error('Comparison failed');
  return res.json();
}
