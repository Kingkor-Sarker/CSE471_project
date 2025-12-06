# REST API Documentation

## Assignment: Login and Update Profile APIs

This document contains the REST API endpoints for **Login** and **Update Profile** features.

**Server Port:** 1962  
**Base URL:** `http://localhost:1962/api`

---

## API 1: Login

### Endpoint
```
POST /api/auth/login
```

### Description
Authenticates a user with email and password using Supabase authentication.

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "userpassword123"
}
```

### Code Snippet

**Route Definition** (`server/routes/authRoutes.js`):
```javascript
import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();
router.post('/login', login);
export default router;
```

**Controller** (`server/controllers/authController.js`):
```javascript
import * as authModel from '../models/authModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const login = asyncHandler(async (req, res) => {
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
```

**Model** (`server/models/authModel.js`):
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

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-uuid-here",
      "email": "user@example.com",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "session": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "refresh-token-here",
      "expires_at": 1234567890
    }
  }
}
```

### Error Responses

**400 Bad Request** (Missing fields):
```json
{
  "success": false,
  "error": {
    "message": "Please provide both email and password"
  }
}
```

**401 Unauthorized** (Invalid credentials):
```json
{
  "success": false,
  "error": {
    "message": "Invalid email or password"
  }
}
```

---

## API 2: Update Profile

### Endpoint
```
PUT /api/profile/:userId
```

### Description
Updates user profile information (full_name, phone, address) in the database.

### Request Headers
```
Content-Type: application/json
```

### URL Parameters
- `userId` (required): The user ID (UUID)

### Request Body
```json
{
  "full_name": "John Doe",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, City, State 12345"
}
```

**Note:** At least one field (full_name, phone, or address) must be provided.

### Code Snippet

**Route Definition** (`server/routes/profileRoutes.js`):
```javascript
import express from 'express';
import { updateProfile } from '../controllers/profileController.js';

const router = express.Router();
router.put('/:userId', updateProfile);
export default router;
```

**Controller** (`server/controllers/profileController.js`):
```javascript
import * as profileModel from '../models/profileModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
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
```

**Model** (`server/models/profileModel.js`):
```javascript
import supabase from '../config/supabaseClient.js';

export async function updateProfile(userId, profileData) {
  // First check if profile exists
  const existingProfile = await getProfileById(userId);

  let result;

  if (!existingProfile) {
    // Create new profile if it doesn't exist
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        ...profileData,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    result = data;
  } else {
    // Update existing profile
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    result = data;
  }

  return result;
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user-uuid-here",
    "full_name": "John Doe",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St, City, State 12345",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-02T00:00:00.000Z"
  }
}
```

### Error Responses

**400 Bad Request** (Missing user ID):
```json
{
  "success": false,
  "error": {
    "message": "User ID is required"
  }
}
```

**400 Bad Request** (No fields provided):
```json
{
  "success": false,
  "error": {
    "message": "At least one field (full_name, phone, address) must be provided"
  }
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "error": {
    "message": "Failed to update profile"
  }
}
```

---

## Database Connection

Both APIs are connected to **Supabase PostgreSQL database**:

- **Login API** uses Supabase Auth service
- **Update Profile API** uses the `profiles` table in Supabase

### Database Schema

**profiles table:**
- `id` (UUID, Primary Key) - References auth.users
- `full_name` (TEXT)
- `phone` (TEXT)
- `address` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## How to Test in Postman

### Prerequisites
1. Make sure your backend server is running on port 1962
2. Have Postman installed
3. Have a test user account created in Supabase

### Testing API 1: Login

1. **Open Postman** and create a new request
2. **Set Method:** POST
3. **Set URL:** `http://localhost:1962/api/auth/login`
4. **Go to Headers tab:**
   - Key: `Content-Type`
   - Value: `application/json`
5. **Go to Body tab:**
   - Select `raw`
   - Select `JSON` from dropdown
   - Enter:
   ```json
   {
     "email": "your-test-email@example.com",
     "password": "your-password"
   }
   ```
6. **Click Send**
7. **Expected Result:** You should receive a 200 OK response with user data and session tokens

### Testing API 2: Update Profile

1. **Open Postman** and create a new request
2. **Set Method:** PUT
3. **Set URL:** `http://localhost:1962/api/profile/YOUR_USER_ID`
   - Replace `YOUR_USER_ID` with the actual user ID from the login response
4. **Go to Headers tab:**
   - Key: `Content-Type`
   - Value: `application/json`
5. **Go to Body tab:**
   - Select `raw`
   - Select `JSON` from dropdown
   - Enter:
   ```json
   {
     "full_name": "John Doe",
     "phone": "+1 (555) 123-4567",
     "address": "123 Main St, City, State 12345"
   }
   ```
6. **Click Send**
7. **Expected Result:** You should receive a 200 OK response with updated profile data

### Screenshot Checklist

For your assignment, take screenshots of:

1. ✅ **Login API Request** - Show the POST request with body
2. ✅ **Login API Response** - Show the 200 OK response with user data
3. ✅ **Update Profile API Request** - Show the PUT request with body and user ID
4. ✅ **Update Profile API Response** - Show the 200 OK response with updated profile

---

## Server Setup

### Start the Server

```bash
cd server
npm start
```

The server will run on: **http://localhost:1962**

### Environment Variables

Make sure your `server/.env` file contains:
```env
PORT=1962
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

---

## Assignment Checklist

- ✅ REST API for Login feature developed
- ✅ REST API for Update Profile feature developed
- ✅ Database connected (Supabase)
- ✅ Code snippets provided for each API
- ✅ Server running on port 1962
- ✅ APIs tested and working
- ✅ Documentation complete

---

## Additional Notes

- Both APIs follow RESTful conventions
- Error handling is implemented
- Input validation is included
- Database operations use Supabase client
- MVC pattern is followed (Models, Views/Controllers, Routes)

