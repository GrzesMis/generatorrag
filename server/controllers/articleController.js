import OpenAI from 'openai';
import { AppError } from '../utils/AppError.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generate = async (req, res, next) => {
  try {
    const { searchResults } = req.body;

    if (!searchResults?.length) {
      throw new AppError('No search results provided', 400);
    }

    const prompt = `Based on the following search results, generate a comprehensive article:
${searchResults.map(r => `Title: ${r.title}\nSnippet: ${r.snippet}\nSource: ${r.link}\n`).join('\n')}

Please create a well-structured article that combines information from these sources.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7
    });

    res.json({ 
      article: completion.choices[0].message.content 
    });
  } catch (error) {
    next(error);
  }
};

export const articleController = { generate };