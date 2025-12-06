import * as authModel from '../models/authModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Request body is missing. Make sure to send JSON with Content-Type: application/json header.',
      },
    });
  }

  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Please provide both email and password',
      },
    });
  }

  try {
    const { user, session } = await authModel.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        },
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        message: error.message || 'Invalid email or password',
      },
    });
  }
});

