import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  uploadResume,
  getResume,
  getUserResume,
  updateResumeData,
  deleteResume,
} from '../controllers/resumeController.js';

const router = express.Router();

router.post('/upload', authenticate, uploadResume);
router.get('/user-resume', authenticate, getUserResume);
router.get('/:id', authenticate, getResume);
router.put('/:id', authenticate, updateResumeData);
router.delete('/:id', authenticate, deleteResume);

export default router;
