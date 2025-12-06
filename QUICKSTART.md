# Quick Start Guide

## 🚀 How to Run the Application

### Step 1: Install Dependencies

From the root directory:
```bash
npm run install:all
```

Or install separately:
```bash
# Backend
cd server
npm install

# Frontend  
cd ../client
npm install
```

### Step 2: Set Up Environment Variables

**Backend** - Create `server/.env`:
```env
PORT=1962
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

**Frontend** - Create `client/.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:1962/api
```

### Step 3: Run the Application

#### Option A: Run Both Servers Together (Recommended)
From the root directory:
```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:1962
- **Frontend**: http://localhost:5173

#### Option B: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd server
npm start
# or for auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 4: Access the Application

1. Open your browser and go to: **http://localhost:5173**
2. You'll be redirected to the login page
3. Sign up or log in to access the dashboard
4. Check the "Products" tab to see API integration with the backend

## 🔍 Verify Connection

### Test Backend API
Open in browser or use curl:
```bash
curl http://localhost:1962/api/test
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running successfully",
  "timestamp": "..."
}
```

### Test Products API
```bash
curl http://localhost:1962/api/products
```

### Check Frontend-Backend Connection
1. Log in to the dashboard
2. Click on the "Products" tab
3. If you see products or "No products found" message, the connection is working
4. If you see an error, check:
   - Both servers are running
   - Environment variables are set correctly
   - CORS is enabled (already configured)

## 📍 Where Everything Runs

- **Backend Server**: http://localhost:1962
  - API Base URL: http://localhost:1962/api
  - Health Check: http://localhost:1962/api/test
  
- **Frontend Server**: http://localhost:5173
  - Main App: http://localhost:5173
  - Login: http://localhost:5173/login
  - Signup: http://localhost:5173/signup
  - Dashboard: http://localhost:5173/dashboard (protected)

## 🐛 Troubleshooting

### Port Already in Use
If port 1962 or 5173 is already in use:
- Backend: Change `PORT` in `server/.env`
- Frontend: Change port in `client/vite.config.js`

### Connection Errors
1. Ensure both servers are running
2. Check browser console for errors
3. Verify `.env` files have correct values
4. Test backend directly: `curl http://localhost:1962/api/test`

### CORS Errors
Already handled in `server/app.js`, but if issues persist:
- Verify frontend is using correct API URL
- Check backend CORS configuration

## 📝 Next Steps

- Add more API endpoints as needed
- Implement authentication middleware for protected routes
- Add more components and features
- Set up database tables in Supabase

