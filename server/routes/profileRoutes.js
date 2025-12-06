import express from 'express';
import {
  getProfile,
  updateProfile,
} from '../controllers/profileController.js';

const router = express.Router();

// Profile routes
router.get('/:userId', getProfile);
router.put('/:userId', updateProfile);

export default router;

