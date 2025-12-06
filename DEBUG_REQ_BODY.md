# Debug: req.body is undefined

## The Real Problem

The error "Cannot destructure property 'email' of 'req.body' as it is undefined" means:
- **Postman is NOT sending the request body correctly**
- OR the server is NOT parsing the body correctly

This is **NOT a Supabase issue** - it's a request configuration issue.

---

## Step 1: Verify Postman Settings

### Check These Settings in Postman:

1. **Method:** Must be `POST` or `PUT`
2. **URL:** Must be correct (e.g., `http://localhost:1962/api/auth/login`)
3. **Headers Tab:**
   - Must have: `Content-Type: application/json`
   - Check if it's actually there!
4. **Body Tab:**
   - Must select: `raw` (radio button)
   - Dropdown must say: `JSON` (not Text, not HTML)
   - Must have valid JSON entered

---

## Step 2: Test with a Simple Debug Endpoint

Let me add a debug endpoint to see what the server is receiving:

**Test this in Postman:**
```
POST http://localhost:1962/api/debug
```

This will show you exactly what the server receives.

---

## Step 3: Verify Express Middleware

The server has:
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

This should parse JSON bodies. If `req.body` is still undefined, it means:
- The Content-Type header is missing/wrong
- The body isn't being sent
- Express isn't parsing it

---

## Step 4: Test with curl (to verify it's Postman)

```bash
curl -X POST http://localhost:1962/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

If this works but Postman doesn't, it's a Postman configuration issue.

---

## Common Postman Mistakes:

### ❌ Wrong:
- Body type: `form-data`
- Body type: `x-www-form-urlencoded`
- Body type: `raw` but dropdown says `Text`
- No `Content-Type` header

### ✅ Correct:
- Body type: `raw`
- Dropdown: `JSON`
- Header: `Content-Type: application/json`
- Valid JSON in body

---

## Quick Fix:

1. In Postman, go to **Body** tab
2. Make sure **`raw`** is selected (radio button)
3. Make sure dropdown says **`JSON`** (not Text!)
4. Go to **Headers** tab
5. Add: `Content-Type: application/json`
6. Make sure the JSON is valid (check for syntax errors)

---

## Still Not Working?

Add this debug middleware to see what's happening:

```javascript
app.use((req, res, next) => {
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});
```

This will show you in the server console what's being received.

