import { z } from 'zod';
import { AppError } from '../utils/AppError.js';

const searchSchema = z.object({
  keyword: z.string().min(1).max(100)
});

const articleGenerationSchema = z.object({
  searchResults: z.array(z.object({
    title: z.string(),
    snippet: z.string(),
    link: z.string().url()
  })).min(1)
});

export const validateSearch = (req, res, next) => {
  try {
    searchSchema.parse(req.body);
    next();
  } catch (error) {
    next(new AppError('Invalid search parameters', 400));
  }
};

export const validateArticleGeneration = (req, res, next) => {
  try {
    articleGenerationSchema.parse(req.body);
    next();
  } catch (error) {
    next(new AppError('Invalid article generation parameters', 400));
  }
};