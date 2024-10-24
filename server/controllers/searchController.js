import { SerpApi } from 'google-search-results-nodejs';
import { AppError } from '../utils/AppError.js';

const search = async (req, res, next) => {
  try {
    const { keyword } = req.body;
    const search = new SerpApi(process.env.SERP_API_KEY);

    const searchResults = await new Promise((resolve, reject) => {
      search.json({
        q: keyword,
        num: 5
      }, (result) => {
        if (result.error) reject(new AppError(result.error, 500));
        resolve(result.organic_results);
      });
    });

    const formattedResults = searchResults.map(result => ({
      title: result.title,
      snippet: result.snippet,
      link: result.link
    }));

    res.json({ results: formattedResults });
  } catch (error) {
    next(error);
  }
};

export const searchController = { search };