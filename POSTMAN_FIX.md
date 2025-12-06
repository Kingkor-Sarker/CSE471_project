# Fix: "req.body is undefined" Error

## The Problem
You're getting errors like:
- "Cannot destructure property 'email' of 'req.body' as it is undefined"
- "Cannot destructure property 'full_name' of 'req.body' as it is undefined"

This means **Postman is not sending the request body correctly**.

---

## Solution: Fix Postman Settings

### For Login API (POST /api/auth/login)

1. **Open Postman** and create/select your request

2. **Set Method to POST**
   - Select `POST` from the dropdown

3. **Set URL**
   - Enter: `http://localhost:1962/api/auth/login`

4. **Go to Headers Tab** ⚠️ **CRITICAL STEP**
   - Click on "Headers" tab
   - Add a new header:
     - **Key:** `Content-Type`
     - **Value:** `application/json`
   - **IMPORTANT:** Make sure this header is added! Without it, the body won't be parsed.

5. **Go to Body Tab**
   - Click on "Body" tab
   - Select **`raw`** radio button (NOT form-data, NOT x-www-form-urlencoded)
   - In the dropdown next to "raw", select **`JSON`** (NOT Text, NOT HTML)
   - Enter your JSON:
   ```json
   {
     "email": "test@example.com",
     "password": "test123"
   }
   ```

6. **Click Send**

---

### For Update Profile API (PUT /api/profile/:userId)

1. **Set Method to PUT**
   - Select `PUT` from the dropdown

2. **Set URL**
   - Enter: `http://localhost:1962/api/profile/YOUR_USER_ID`
   - Replace `YOUR_USER_ID` with actual UUID

3. **Go to Headers Tab** ⚠️ **CRITICAL STEP**
   - Click on "Headers" tab
   - Add a new header:
     - **Key:** `Content-Type`
     - **Value:** `application/json`
   - **IMPORTANT:** Make sure this header is added!

4. **Go to Body Tab**
   - Click on "Body" tab
   - Select **`raw`** radio button
   - In the dropdown, select **`JSON`**
   - Enter your JSON:
   ```json
   {
     "full_name": "John Doe",
     "phone": "+1 (555) 123-4567",
     "address": "123 Main St"
   }
   ```

5. **Click Send**

---

## Visual Checklist

### ✅ Correct Setup:
```
Method: POST (or PUT)
URL: http://localhost:1962/api/auth/login
Headers:
  ✓ Content-Type: application/json
Body:
  ✓ raw (selected)
  ✓ JSON (selected from dropdown)
  ✓ { "email": "...", "password": "..." }
```

### ❌ Wrong Setup:
```
Method: POST
URL: http://localhost:1962/api/auth/login
Headers:
  ✗ (No Content-Type header)
Body:
  ✗ form-data (WRONG!)
  ✗ x-www-form-urlencoded (WRONG!)
  ✗ Text (WRONG!)
```

---

## Common Mistakes

### Mistake 1: Missing Content-Type Header
**Problem:** Body is sent but server doesn't know it's JSON
**Fix:** Add `Content-Type: application/json` header

### Mistake 2: Wrong Body Type
**Problem:** Using form-data instead of raw JSON
**Fix:** Select "raw" and then "JSON" from dropdown

### Mistake 3: Body Tab Not Selected
**Problem:** Headers are set but body is empty
**Fix:** Make sure you're on the "Body" tab and have entered JSON

### Mistake 4: JSON Syntax Error
**Problem:** Invalid JSON (missing quotes, commas, etc.)
**Fix:** Validate your JSON - it should be valid JSON format

---

## Test with curl (Alternative)

If Postman still doesn't work, test with curl:

### Login:
```bash
curl -X POST http://localhost:1962/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Update Profile:
```bash
curl -X PUT http://localhost:1962/api/profile/YOUR_USER_ID \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Doe","phone":"+1234567890","address":"123 Main St"}'
```

---

## Step-by-Step Screenshots Guide

### Screenshot 1: Login Request Setup
1. Show Method dropdown with "POST" selected
2. Show URL: `http://localhost:1962/api/auth/login`
3. Show Headers tab with `Content-Type: application/json`
4. Show Body tab with "raw" selected and "JSON" in dropdown
5. Show JSON body content

### Screenshot 2: Login Response
- Show the 200 OK response with user data

### Screenshot 3: Update Profile Request Setup
1. Show Method dropdown with "PUT" selected
2. Show URL with actual user ID
3. Show Headers tab with `Content-Type: application/json`
4. Show Body tab with "raw" and "JSON" selected
5. Show JSON body with profile data

### Screenshot 4: Update Profile Response
- Show the 200 OK response with updated profile

---

## Quick Fix Checklist

- [ ] Server is running on port 1962
- [ ] Method is POST (login) or PUT (profile)
- [ ] URL is correct: `http://localhost:1962/api/...`
- [ ] **Content-Type header is set to `application/json`**
- [ ] Body tab is selected
- [ ] "raw" radio button is selected
- [ ] "JSON" is selected from dropdown (not Text!)
- [ ] JSON is valid (proper syntax)
- [ ] Clicked "Send" button

---

## Still Not Working?

1. **Restart your server:**
   ```bash
   cd server
   npm start
   ```

2. **Check server console** for any errors

3. **Try the curl commands** above to verify the API works

4. **Verify your JSON** is valid at jsonlint.com

5. **Clear Postman cache** and try again

The most common issue is **missing the Content-Type header** - make sure it's set to `application/json`!

