import * as profileModel from '../models/profileModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get user profile
 * @route   GET /api/profile/:userId
 * @access  Private (should add auth middleware later)
 */
export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'User ID is required',
      },
    });
  }

  try {
    const profile = await profileModel.getProfileById(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Profile not found',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch profile',
      },
    });
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/profile/:userId
 * @access  Private (should add auth middleware later)
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Request body is missing. Make sure to send JSON with Content-Type: application/json header.',
      },
    });
  }

  const { full_name, phone, address } = req.body;

  // Validation
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'User ID is required',
      },
    });
  }

  // Build update object (only include provided fields)
  const updateData = {};
  if (full_name !== undefined) updateData.full_name = full_name;
  if (phone !== undefined) updateData.phone = phone;
  if (address !== undefined) updateData.address = address;

  // Check if at least one field is provided
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'At least one field (full_name, phone, address) must be provided',
      },
    });
  }

  try {
    const updatedProfile = await profileModel.updateProfile(userId, updateData);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to update profile',
      },
    });
  }
});

