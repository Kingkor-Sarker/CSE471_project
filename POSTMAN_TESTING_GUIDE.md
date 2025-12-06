# Postman Testing Guide - Step by Step

## Quick Start

### Step 1: Start Your Server

```bash
cd server
npm start
```

You should see:
```
Server running on port 1962
Environment: development
```

---

## Test API 1: Login

### Step-by-Step Instructions

1. **Open Postman**

2. **Create New Request**
   - Click "New" → "HTTP Request"
   - Name it: "Login API"

3. **Configure Request**
   - **Method:** Select `POST` from dropdown
   - **URL:** Enter `http://localhost:1962/api/auth/login`

4. **Set Headers**
   - Click on "Headers" tab
   - Add new header:
     - **Key:** `Content-Type`
     - **Value:** `application/json`
   - Click "Save"

5. **Set Body**
   - Click on "Body" tab
   - Select `raw` radio button
   - In the dropdown next to "raw", select `JSON`
   - Enter this JSON:
   ```json
   {
     "email": "test@example.com",
     "password": "testpassword123"
   }
   ```
   - **Note:** Replace with your actual test user credentials

6. **Send Request**
   - Click the blue "Send" button

7. **Check Response**
   - You should see a response with status `200 OK`
   - The response body should contain:
     ```json
     {
       "success": true,
       "message": "Login successful",
       "data": {
         "user": { ... },
         "session": { ... }
       }
     }
     ```

8. **Copy User ID**
   - From the response, copy the `user.id` value
   - You'll need this for the Update Profile API

### Screenshot 1: Login Request
- Show the POST request with URL, headers, and body

### Screenshot 2: Login Response
- Show the 200 OK response with user data

---

## Test API 2: Update Profile

### Step-by-Step Instructions

1. **Create New Request in Postman**
   - Click "New" → "HTTP Request"
   - Name it: "Update Profile API"

2. **Configure Request**
   - **Method:** Select `PUT` from dropdown
   - **URL:** Enter `http://localhost:1962/api/profile/YOUR_USER_ID`
     - Replace `YOUR_USER_ID` with the user ID from Login response
     - Example: `http://localhost:1962/api/profile/123e4567-e89b-12d3-a456-426614174000`

3. **Set Headers**
   - Click on "Headers" tab
   - Add new header:
     - **Key:** `Content-Type`
     - **Value:** `application/json`

4. **Set Body**
   - Click on "Body" tab
   - Select `raw` radio button
   - Select `JSON` from dropdown
   - Enter this JSON:
   ```json
   {
     "full_name": "John Doe",
     "phone": "+1 (555) 123-4567",
     "address": "123 Main St, New York, NY 10001"
   }
   ```
   - **Note:** You can update any combination of these fields

5. **Send Request**
   - Click the blue "Send" button

6. **Check Response**
   - You should see a response with status `200 OK`
   - The response body should contain:
     ```json
     {
       "success": true,
       "message": "Profile updated successfully",
       "data": {
         "id": "...",
         "full_name": "John Doe",
         "phone": "+1 (555) 123-4567",
         "address": "123 Main St, New York, NY 10001"
       }
     }
     ```

### Screenshot 3: Update Profile Request
- Show the PUT request with URL (including user ID), headers, and body

### Screenshot 4: Update Profile Response
- Show the 200 OK response with updated profile data

---

## Testing Error Cases

### Test Login with Invalid Credentials

1. Use the Login API
2. Enter wrong email or password
3. **Expected:** Status `401 Unauthorized` with error message

### Test Update Profile with Missing User ID

1. Use Update Profile API
2. Remove the user ID from URL (or use invalid ID)
3. **Expected:** Status `400 Bad Request` or `404 Not Found`

### Test Update Profile with No Fields

1. Use Update Profile API
2. Send empty body `{}`
3. **Expected:** Status `400 Bad Request` with error message

---

## Postman Collection Setup (Optional)

You can save these requests as a collection:

1. Click "New" → "Collection"
2. Name it: "Taaga Women APIs"
3. Drag your requests into the collection
4. You can now run them anytime!

---

## Troubleshooting

### "Cannot connect to server"
- Make sure server is running on port 1962
- Check: `http://localhost:1962/api/test` in browser

### "401 Unauthorized" on Login
- Check email and password are correct
- Verify user exists in Supabase

### "500 Internal Server Error"
- Check server console for error messages
- Verify Supabase credentials in `.env` file
- Make sure `profiles` table exists in Supabase

### "Network Error"
- Verify server is running
- Check firewall settings
- Try `http://127.0.0.1:1962` instead of `localhost`

---

## Example Test Data

### Valid Login Credentials
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### Valid Profile Update
```json
{
  "full_name": "Jane Smith",
  "phone": "+1 (555) 987-6543",
  "address": "456 Oak Avenue, Los Angeles, CA 90001"
}
```

---

## Quick Test Commands

You can also test using `curl` in terminal:

### Test Login
```bash
curl -X POST http://localhost:1962/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Update Profile
```bash
curl -X PUT http://localhost:1962/api/profile/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Doe","phone":"+1234567890","address":"123 Main St"}'
```

---

## Assignment Submission Checklist

- [ ] Screenshot 1: Login API Request (POST with body)
- [ ] Screenshot 2: Login API Response (200 OK with data)
- [ ] Screenshot 3: Update Profile API Request (PUT with body and user ID)
- [ ] Screenshot 4: Update Profile API Response (200 OK with updated data)
- [ ] Code snippets included (from API_DOCUMENTATION.md)
- [ ] Server running on port 1962
- [ ] Database connected and working

Good luck with your assignment! 🚀

