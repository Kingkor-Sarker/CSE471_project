# EXACT Postman Steps - Fix "content-length: 0"

## The Problem
Your debug shows:
- `"content-length": "0"` ← **NO BODY IS BEING SENT!**
- No `content-type` header
- Body is undefined

This means you're not entering the body correctly in Postman.

---

## Step-by-Step Fix (Follow EXACTLY)

### Step 1: Create/Select Request
1. Open Postman
2. Create new request or select existing one
3. Name it: "Debug Test" or "Login API"

### Step 2: Set Method
1. Look at the left side - there's a dropdown
2. Click the dropdown (it might say "GET")
3. Select **`POST`**

### Step 3: Enter URL
1. In the URL bar at the top, type:
   ```
   http://localhost:1962/api/debug
   ```
   (or `http://localhost:1962/api/auth/login` for login)

### Step 4: Go to Headers Tab ⚠️ IMPORTANT
1. Click on the **"Headers"** tab (below the URL bar)
2. You'll see a table with "Key" and "Value" columns
3. Click in the "Key" field (first empty row)
4. Type: `Content-Type`
5. Click in the "Value" field (same row)
6. Type: `application/json`
7. **Make sure it's saved** - you should see it in the list

### Step 5: Go to Body Tab ⚠️ CRITICAL
1. Click on the **"Body"** tab (next to Headers, Params, etc.)
2. You'll see several radio buttons:
   - ○ none
   - ○ form-data
   - ○ x-www-form-urlencoded
   - ○ raw
   - ○ binary
   - ○ GraphQL
3. **Click the "raw" radio button** (select it)
4. Look to the RIGHT of "raw" - there's a dropdown that might say "Text"
5. **Click that dropdown** and select **"JSON"**
6. Now you should see a text area below
7. **Type this JSON in the text area:**
   ```json
   {
     "test": "data"
   }
   ```
   For login, use:
   ```json
   {
     "email": "test@example.com",
     "password": "test123"
   }
   ```

### Step 6: Send Request
1. Click the blue **"Send"** button (top right)
2. Check the response

---

## Visual Checklist

Your Postman should look like this:

```
┌─────────────────────────────────────────┐
│ POST  http://localhost:1962/api/debug  │ ← Method and URL
├─────────────────────────────────────────┤
│ [Params] [Headers] [Body] [Pre-req...] │ ← Tabs
├─────────────────────────────────────────┤
│ Headers Tab:                            │
│ Key              Value                  │
│ Content-Type     application/json       │ ← MUST HAVE THIS
├─────────────────────────────────────────┤
│ Body Tab:                               │
│ ○ none                                  │
│ ○ form-data                            │
│ ● raw  [JSON ▼]  ← MUST SELECT THESE   │
│ ○ binary                                │
│                                         │
│ {                                       │
│   "test": "data"                        │ ← MUST TYPE JSON HERE
│ }                                       │
└─────────────────────────────────────────┘
```

---

## Common Mistakes

### ❌ Wrong:
- Body tab not selected
- "none" radio button selected
- "form-data" selected
- "raw" selected but dropdown says "Text"
- No JSON entered in the text area
- Content-Type header missing

### ✅ Correct:
- "Body" tab is selected
- "raw" radio button is selected
- Dropdown says "JSON"
- JSON is typed in the text area
- Content-Type header is set

---

## Test Again

After following these steps:

1. **Test Debug Endpoint:**
   - URL: `http://localhost:1962/api/debug`
   - Body: `{ "test": "data" }`
   - Should show: `"content-length": "15"` (not 0!)
   - Should show: `"body": { "test": "data" }`

2. **Test Login:**
   - URL: `http://localhost:1962/api/auth/login`
   - Body: `{ "email": "your@email.com", "password": "yourpass" }`
   - Should work!

---

## Still Getting content-length: 0?

1. **Make sure you're on the Body tab** (not Headers, not Params)
2. **Make sure "raw" is selected** (radio button)
3. **Make sure dropdown says "JSON"** (not Text!)
4. **Type the JSON in the text area** (don't just copy-paste, actually type it)
5. **Click Send**

The key is: You MUST be on the Body tab, select raw, select JSON, and TYPE the JSON in the text area below!

