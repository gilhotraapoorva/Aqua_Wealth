// File: src/pages/api/gemini.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    // Call Gemini API endpoint (adjust URL and payload as needed)
    const response = await fetch('https://api.gemini.com/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await response.json();

    // Customize the response if needed before sending back to client
    res.status(200).json({ answer: data.answer || 'No answer received.' });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
