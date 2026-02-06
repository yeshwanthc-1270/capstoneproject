import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  generateRoadmap,
  getRoadmap,
  updateRoadmapProgress,
} from '../controllers/roadmapController.js';

const router = express.Router();

router.post('/generate', authenticate, generateRoadmap);
router.get('/:jobId', authenticate, getRoadmap);
router.put('/:jobId/progress', authenticate, updateRoadmapProgress);

export default router;
