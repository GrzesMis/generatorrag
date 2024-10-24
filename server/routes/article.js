import express from 'express';
import { validateArticleGeneration } from '../middleware/validation.js';
import { articleController } from '../controllers/articleController.js';

const router = express.Router();

router.post('/generate', validateArticleGeneration, articleController.generate);

export { router as articleRouter };