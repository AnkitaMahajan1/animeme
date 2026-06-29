// Serverless function (Vercel-style) that resolves the meaning + category of an
// Indian name using an LLM. The API key stays server-side and is never exposed
// to the browser. If no key is configured, it returns 501 and the front-end
// gracefully falls back to its built-in algorithmic generator.

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

const CATEGORIES = [
  'light', 'love', 'strength', 'wisdom', 'victory', 'beauty',
  'peace', 'star', 'flower', 'fortune', 'devotion', 'fire', 'water', 'sky',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(501).json({ error: 'AI fallback not configured' });
  }

  const body = (req.body ?? {}) as { name?: string };
  const name = (body.name ?? '').trim().slice(0, 30);
  if (!name || !/^[a-zA-Z .'-]+$/.test(name)) {
    return res.status(400).json({ error: 'Invalid name' });
  }

  const prompt =
    `You map Indian first names to their meaning and a single theme category.\n` +
    `Name: "${name}".\n` +
    `Respond ONLY with compact JSON: {"meaning": "<short English meaning>", "category": "<one of: ${CATEGORIES.join(', ')}>"}.`;

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!aiRes.ok) {
      return res.status(502).json({ error: 'AI request failed' });
    }

    const data = (await aiRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content) as { meaning?: string; category?: string };

    if (!parsed.meaning || !parsed.category || !CATEGORIES.includes(parsed.category)) {
      return res.status(422).json({ error: 'Unusable AI response' });
    }

    return res.status(200).json({ meaning: parsed.meaning, category: parsed.category });
  } catch {
    return res.status(500).json({ error: 'Unexpected error' });
  }
}
