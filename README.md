CSE471 PROJECT – TAAGA WOMEN
============================

Full‑stack web app:
- Backend: Node + Express (server/)
- Frontend: React + Vite (client/)
- Auth & Database: Supabase (Google login, Postgres)

This file explains:
- How to run backend + frontend
- How to set up environment variables
- How the branches and teamwork workflow work

--------------------------------------------------
1. PROJECT STRUCTURE
--------------------------------------------------

CSE471_project/
  server/
    app.js
    config/
    controllers/
    models/
    routes/
  client/
    src/
      components/
      lib/
      App.jsx
  .gitignore
  README.md

- server/ = Node/Express backend using MVC style.
- client/ = React + Vite frontend with Supabase auth.

--------------------------------------------------
2. PREREQUISITES
--------------------------------------------------

You need:
- Node.js (LTS)
- npm
- Git
- Access to the shared Supabase project (ask project owner for URL + anon key)

--------------------------------------------------
3. CLONE THE REPOSITORY
--------------------------------------------------

Clone and enter the project:

git clone https://github.com/Kingkor-Sarker/CSE471_project.git
cd CSE471_project

We use two main branches:
- main        = protected, stable code only
- development = main working branch for the team

After cloning, switch to development:

git checkout development

--------------------------------------------------
4. BACKEND SETUP (server)
--------------------------------------------------

From the project root:

cd server
npm install

Create server/.env (DO NOT COMMIT THIS FILE):

PORT=8000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY

Ask the project owner for the correct Supabase values.

Run the backend:

node app.js

Backend runs at:

http://localhost:8000

Test in browser or Postman:

GET http://localhost:8000/api/test

Expected response:

{ "message": "Test route is working" }

--------------------------------------------------
5. FRONTEND SETUP (client)
--------------------------------------------------

From the project root:

cd client
npm install

Create client/.env (DO NOT COMMIT THIS FILE):

VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

Use the same Supabase URL and anon key provided by the project owner.

Run the frontend:

npm run dev

Frontend runs at (default):

http://localhost:5173/

Open this URL in your browser.
You should see the React app, including a “Continue with Google” button using Supabase Auth.

--------------------------------------------------
6. ENVIRONMENT VARIABLES & SECRETS
--------------------------------------------------

Each developer must create their own:
- server/.env
- client/.env

These files are ignored by Git and MUST NOT be committed.

Shared values (ask the project owner):
- SUPABASE_URL
- SUPABASE_KEY (if backend needs it)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY (Supabase anon key)

Example:

server/.env

PORT=8000
SUPABASE_URL=THE_SHARED_SUPABASE_URL
SUPABASE_KEY=THE_SHARED_SERVICE_OR_ANON_KEY

client/.env

VITE_SUPABASE_URL=THE_SHARED_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=THE_SHARED_ANON_KEY

These values are shared privately (WhatsApp/Messenger), not stored in the repo.

--------------------------------------------------
7. .GITIGNORE (IMPORTANT)
--------------------------------------------------

Important entries in root .gitignore:

node_modules/
dist/
build/

.env
client/.env
server/.env

This keeps dependencies and secrets out of the repo.

--------------------------------------------------
8. BRANCH STRATEGY
--------------------------------------------------

We use this branching model:

- main        = protected, stable production code only
- development = main working branch for the team
- feature/*   = individual feature branches

Rules:
- DO NOT push directly to main.
- All work must start from development.
- Changes are merged into development via Pull Requests (PRs).
- Only the maintainer merges development into main after testing.

--------------------------------------------------
9. HOW TO WORK ON A NEW FEATURE
--------------------------------------------------

1) Make sure you are on development and up to date:

git checkout development
git pull origin development

2) Create a feature branch from development:

git checkout -b feature/your-name-task

Examples:
feature/kingkor-user-profile
feature/teammate-cart-ui

3) Work on your changes, then commit:

git add .
git commit -m "Describe your change"

4) Push your feature branch:

git push -u origin feature/your-name-task

5) Create a Pull Request (PR) on GitHub:
- Go to the repo on GitHub.
- Click “Compare & pull request”.
- Base branch: development
- Compare branch: feature/your-name-task

6) Ask a teammate to review and merge the PR into development.

--------------------------------------------------
10. MERGING INTO MAIN
--------------------------------------------------

- Only the maintainer (project owner) merges development into main.
- This should happen after testing or at project milestones.
- Nobody pushes directly to main.

Typical flow:

feature branch → PR into development → test → maintainer merges development into main

--------------------------------------------------
11. NOTES FOR TEAMMATES
--------------------------------------------------

- Always work on a branch created from development, NOT from main.
- Never commit any .env files or Supabase keys.
- Ask the project owner for:
  - Supabase URL and anon key
  - Questions about backend routes or database structure.
