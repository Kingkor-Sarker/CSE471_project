# Taaga Women - Full Stack Application

A full-stack application built with React (frontend) and Express.js (backend) using Supabase for authentication and database.

## Project Structure

```
taaga_women/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── dashboard/   # Dashboard component
│   │   │   ├── profile/     # Profile component
│   │   │   └── common/      # Shared components
│   │   └── lib/             # Utilities and API client
│   └── package.json
│
└── server/          # Express.js backend API
    ├── app.js       # Main server file
    ├── config/      # Configuration files
    ├── controllers/ # Request handlers (MVC)
    ├── models/      # Data models (MVC)
    ├── routes/      # Route definitions (MVC)
    ├── middleware/  # Custom middleware
    └── package.json
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## Environment Variables

### Backend (.env in `/server` directory)

Create a `.env` file in the `server/` directory:

```env
PORT=1962
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
```

### Frontend (.env in `/client` directory)

Create a `.env` file in the `client/` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:1962/api
```

## Installation

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

## Running the Application

You need to run both the backend and frontend servers simultaneously.

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on: **http://localhost:1962**

**Terminal 2 - Frontend Server:**
```bash
cd client
npm run dev
```

The frontend will run on: **http://localhost:5173**

### Option 2: Run Both with npm-run-all (if installed)

From the root directory:
```bash
npm install -g npm-run-all
npm-run-all --parallel server:start client:dev
```

## API Endpoints

The backend API is available at `http://localhost:1962/api`

### Products API

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Health Check

- `GET /api/test` - Server health check

## Frontend Routes

- `/` - Redirects to dashboard
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard (requires authentication)

## Architecture

### Backend (MVC Pattern)

- **Models** (`models/`): Database operations and data access
- **Views** (N/A): API returns JSON (no views)
- **Controllers** (`controllers/`): Request handling and business logic
- **Routes** (`routes/`): Route definitions and middleware
- **Middleware** (`middleware/`): Error handling, authentication, etc.

### Frontend

- **Components**: Organized by feature (auth, dashboard, profile)
- **API Client**: Centralized API communication (`lib/api.js`)
- **Routing**: React Router for client-side routing
- **Authentication**: Supabase Auth with protected routes

## Development

### Backend Development

```bash
cd server
npm run dev  # Auto-reload on file changes
```

### Frontend Development

```bash
cd client
npm run dev  # Vite dev server with hot reload
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure:
1. Backend has CORS enabled (already configured in `app.js`)
2. Frontend is using the correct API URL
3. Both servers are running

### Connection Issues

1. Verify both servers are running
2. Check environment variables are set correctly
3. Ensure ports 1962 (backend) and 5173 (frontend) are available
4. Check browser console for errors

### Supabase Connection

1. Verify Supabase credentials in `.env` files
2. Check Supabase project is active
3. Ensure database tables exist (`products`, `profiles`)

## Production Build

### Build Frontend

```bash
cd client
npm run build
```

The built files will be in `client/dist/`

### Run Backend in Production

```bash
cd server
NODE_ENV=production npm start
```

## License

ISC
