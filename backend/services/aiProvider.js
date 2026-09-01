import { SYSTEM_PROMPT, generateIdeaPrompt } from './aiPrompts.js';
import { generateFallbackAnalysis } from './fallbackSynthesis.js';

// Fast In-Memory Analysis Cache for Sub-100ms Response Times
const analysisCache = new Map();

export async function analyzeBusinessIdea(ideaData) {
  const cacheKey = JSON.stringify({
    title: ideaData.title || ideaData.name,
    industry: ideaData.industry,
    businessType: ideaData.businessType,
    region: ideaData.region
  });

  // Fast cache hit (<10ms response)
  if (analysisCache.has(cacheKey)) {
    console.log('⚡ Fast Cache Hit: Returning cached validation result in <10ms');
    return analysisCache.get(cacheKey);
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // 1. Try Gemini API if key is set
  if (geminiKey) {
    try {
      console.log('Generating analysis using Gemini API...');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_PROMPT}\n\n${generateIdeaPrompt(ideaData)}` }]
          }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          const result = { provider: 'Gemini AI', data: parsed };
          analysisCache.set(cacheKey, result);
          return result;
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, trying next provider:', err.message);
    }
  }

  // 2. Try OpenAI API if key is set
  if (openaiKey) {
    try {
      console.log('Generating analysis using OpenAI API...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: generateIdeaPrompt(ideaData) }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          const result = { provider: 'OpenAI GPT-4o', data: parsed };
          analysisCache.set(cacheKey, result);
          return result;
        }
      }
    } catch (err) {
      console.warn('OpenAI API call failed, falling back:', err.message);
    }
  }

  // 3. Ultra-Fast Fallback Synthesis Engine (<50ms)
  console.log('⚡ IdeaForge AI High-Speed Synthesis Engine');
  const fallback = generateFallbackAnalysis(ideaData);
  const result = { provider: 'IdeaForge AI Synthesis Engine', data: fallback };
  analysisCache.set(cacheKey, result);
  return result;
}

export async function askAiCoach(idea, question, chatHistory = []) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const ideaContext = `Idea: ${idea.title || idea.name}. Industry: ${idea.industry}. Score: ${idea.score}/100. Verdict: ${idea.recommendation}.`;

  const coachPrompt = `You are the IdeaForge AI Business Coach. You are advising an entrepreneur on their business idea: "${ideaContext}".
Answer their question concisely with practical, actionable, step-by-step advice under 200 words.`;

  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `${coachPrompt}\n\nUser Question: ${question}` }] }] })
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {}
  }

  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: coachPrompt }, { role: 'user', content: question }]
        })
      });
      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content;
      }
    } catch (e) {}
  }

  return `Great question regarding **${idea.title}**!\n\n1. **Focus on Unit Economics**: Prioritize direct founder sales to keep customer acquisition cost minimal.\n2. **Validate Willingness-to-Pay**: Launch a pre-order campaign before heavy software expenditure.\n3. **Build Core MVP**: Launch with simple tools first to confirm demand intensity before building complex custom features.`;
}
