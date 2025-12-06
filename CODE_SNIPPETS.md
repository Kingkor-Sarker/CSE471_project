# Code Snippets for Assignment

## API 1: Login Endpoint

### Route (server/routes/authRoutes.js)
```javascript
import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();
router.post('/login', login);
export default router;
```

### Controller (server/controllers/authController.js)
```javascript
import * as authModel from '../models/authModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: 'Please provide both email and password' },
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
      error: { message: error.message || 'Invalid email or password' },
    });
  }
});
```

### Model (server/models/authModel.js)
```javascript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user,
    session: data.session,
  };
}
```

---

## API 2: Update Profile Endpoint

### Route (server/routes/profileRoutes.js)
```javascript
import express from 'express';
import { updateProfile } from '../controllers/profileController.js';

const router = express.Router();
router.put('/:userId', updateProfile);
export default router;
```

### Controller (server/controllers/profileController.js)
```javascript
import * as profileModel from '../models/profileModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { full_name, phone, address } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: { message: 'User ID is required' },
    });
  }

  const updateData = {};
  if (full_name !== undefined) updateData.full_name = full_name;
  if (phone !== undefined) updateData.phone = phone;
  if (address !== undefined) updateData.address = address;

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
      error: { message: error.message || 'Failed to update profile' },
    });
  }
});
```

### Model (server/models/profileModel.js)
```javascript
import supabase from '../config/supabaseClient.js';

export async function getProfileById(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }
  return data;
}

export async function updateProfile(userId, profileData) {
  const existingProfile = await getProfileById(userId);
  let result;

  if (!existingProfile) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ id: userId, ...profileData })
      .select()
      .single();

    if (error) throw new Error(error.message);
    result = data;
  } else {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    result = data;
  }

  return result;
}
```

---

## Route Registration (server/routes/index.js)
```javascript
import express from 'express';
import productRoutes from './productRoutes.js';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

export default router;
```

---

## Endpoints Summary

- **Login:** `POST http://localhost:1962/api/auth/login`
- **Update Profile:** `PUT http://localhost:1962/api/profile/:userId`

Both APIs are connected to Supabase database.

