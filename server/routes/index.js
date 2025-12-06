// Route aggregator - import and export all routes
import express from 'express';
import productRoutes from './productRoutes.js';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import debugRoutes from './debugRoutes.js';

const router = express.Router();

// API routes
router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/', debugRoutes); // Debug routes

// Debug route to verify routes are loaded
router.get('/routes-test', (req, res) => {
  res.json({
    success: true,
    message: 'Routes are loaded correctly',
    availableRoutes: [
      'POST /api/auth/login',
      'PUT /api/profile/:userId',
      'GET /api/profile/:userId',
      'POST /api/debug (for testing)',
    ],
  });
});

export default router;
