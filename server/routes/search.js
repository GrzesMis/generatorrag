import express from 'express';
import { validateSearch } from '../middleware/validation.js';
import { searchController } from '../controllers/searchController.js';

const router = express.Router();

router.post('/', validateSearch, searchController.search);

export { router as searchRouter };