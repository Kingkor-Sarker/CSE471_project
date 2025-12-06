# Troubleshooting: "Not Found" Errors

## Problem
Getting "Not Found" errors when trying to access:
- `POST /api/auth/login`
- `PUT /api/profile/:userId`

## Solution Steps

### Step 1: Restart Your Server

**IMPORTANT:** After adding new routes, you MUST restart the server!

1. **Stop the current server:**
   - Press `Ctrl+C` in the terminal where the server is running

2. **Start the server again:**
   ```bash
   cd server
   npm start
   ```

   Or if using dev mode:
   ```bash
   npm run dev
   ```

### Step 2: Verify Server is Running

Test the health check endpoint:
```bash
curl http://localhost:1962/api/test
```

You should get:
```json
{
  "success": true,
  "message": "Server is running successfully",
  "timestamp": "..."
}
```

### Step 3: Test Routes are Loaded

Test the routes test endpoint:
```bash
curl http://localhost:1962/api/routes-test
```

You should see:
```json
{
  "success": true,
  "message": "Routes are loaded correctly",
  "availableRoutes": [...]
}
```

### Step 4: Test Login API

```bash
curl -X POST http://localhost:1962/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Step 5: Common Issues

#### Issue: Server not restarted
**Solution:** Always restart after adding new routes

#### Issue: Wrong URL
**Correct URLs:**
- Login: `http://localhost:1962/api/auth/login`
- Profile: `http://localhost:1962/api/profile/USER_ID_HERE`

**Wrong URLs:**
- ❌ `http://localhost:1962/auth/login` (missing `/api`)
- ❌ `http://localhost:1962/api/profile/YOUR_USER_ID` (use actual UUID)

#### Issue: Port conflict
Check if port 1962 is already in use:
```bash
lsof -i :1962
```

If something is using it, kill it or change the port in `.env`

### Step 6: Check Server Console

Look at your server console output. You should see:
```
Server running on port 1962
Environment: development
```

If you see errors, fix them first.

### Step 7: Verify File Structure

Make sure these files exist:
```
server/
├── routes/
│   ├── index.js          ✅
│   ├── authRoutes.js     ✅
│   └── profileRoutes.js  ✅
├── controllers/
│   ├── authController.js ✅
│   └── profileController.js ✅
└── models/
    ├── authModel.js      ✅
    └── profileModel.js   ✅
```

### Step 8: Check Postman Settings

In Postman:
1. **Method:** Make sure it's `POST` for login, `PUT` for profile
2. **URL:** Full URL including `http://localhost:1962`
3. **Headers:** `Content-Type: application/json`
4. **Body:** Select `raw` and `JSON`

---

## Quick Fix Command

If nothing works, try this complete restart:

```bash
# Stop server (Ctrl+C)
cd server
rm -rf node_modules/.cache
npm start
```

Then test again in Postman!

