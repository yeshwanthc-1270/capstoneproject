import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  createJobMatch,
  getUserJobMatches,
  getJobMatch,
  updateJobMatch,
  deleteJobMatch,
} from '../controllers/jdController.js';

const router = express.Router();

router.post('/', authenticate, createJobMatch);
router.get('/user-jobs', authenticate, getUserJobMatches);
router.get('/:id', authenticate, getJobMatch);
router.put('/:id', authenticate, updateJobMatch);
router.delete('/:id', authenticate, deleteJobMatch);

export default router;
