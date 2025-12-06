# Taaga Women - Full Stack Application

CSE471 PROJECT – TAAGA WOMEN
============================

Full‑stack web app:
- Backend: Node + Express (server/)
- Frontend: React + Vite (client/)
- Auth & Database: Supabase (Google login, Postgres)

## Project Structure

```
taaga_women/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── dashboard/   # Dashboard component
│   │   │   ├── profile/     # Profile component
│   │   │   ├── products/    # Product components
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
- Git
- Access to the shared Supabase project (ask project owner for URL + anon key)

## Environment Variables

### Backend (.env in `/server` directory)

Create a `.env` file in the `server/` directory:

```env
PORT=1962
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend (.env in `/client` directory)

Create a `.env` file in the `client/` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:1962/api
```

**Important:** These files are ignored by Git and MUST NOT be committed.

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

### Option 2: Run Both from Root

From the root directory:
```bash
npm run dev
```

This will start both servers simultaneously.

## API Endpoints

The backend API is available at `http://localhost:1962/api`

### Authentication API

- `POST /api/auth/login` - Login user with email and password

### Profile API

- `GET /api/profile/:userId` - Get user profile
- `PUT /api/profile/:userId` - Update user profile

### Products API

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Health Check

- `GET /api/test` - Server health check
- `POST /api/debug` - Debug endpoint to test request body

## Frontend Routes

- `/` - Redirects to dashboard
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard (requires authentication)

## Architecture

### Backend (MVC Pattern)

- **Models** (`models/`): Database operations and data access
- **Controllers** (`controllers/`): Request handling and business logic
- **Routes** (`routes/`): Route definitions and middleware
- **Middleware** (`middleware/`): Error handling, authentication, etc.

### Frontend

- **Components**: Organized by feature (auth, dashboard, profile, products)
- **API Client**: Centralized API communication (`lib/api.js`)
- **Routing**: React Router for client-side routing
- **Authentication**: Supabase Auth with protected routes
- **Styling**: Tailwind CSS for modern UI

## Branch Strategy

We use this branching model:

- **main** = protected, stable production code only
- **development** = main working branch for the team
- **feature/*** = individual feature branches

### Rules:

- DO NOT push directly to main
- All work must start from development
- Changes are merged into development via Pull Requests (PRs)
- Only the maintainer merges development into main after testing

### How to Work on a New Feature

1. Make sure you are on development and up to date:
   ```bash
   git checkout development
   git pull origin development
   ```

2. Create a feature branch from development:
   ```bash
   git checkout -b feature/your-name-task
   ```

3. Work on your changes, then commit:
   ```bash
   git add .
   git commit -m "Describe your change"
   ```

4. Push your feature branch:
   ```bash
   git push -u origin feature/your-name-task
   ```

5. Create a Pull Request (PR) on GitHub:
   - Go to the repo on GitHub
   - Click "Compare & pull request"
   - Base branch: development
   - Compare branch: feature/your-name-task

6. Ask a teammate to review and merge the PR into development

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

## Notes for Teammates

- Always work on a branch created from development, NOT from main
- Never commit any .env files or Supabase keys
- Ask the project owner for:
  - Supabase URL and anon key
  - Questions about backend routes or database structure

## License

ISC
