📄 Frontend README (Next.js CV App)
Interactive CV – Frontend

A modern, animation-driven developer portfolio built with Next.js. This application showcases projects through an infinite scroll experience with smooth transitions and a premium dark UI.

🚀 Tech Stack
Next.js (App Router)
React
Tailwind CSS
anime.js
Fetch API (or Axios)
✨ Features
Infinite scroll project listing
Smooth animations (page load, scroll, hover)
Dark, elegant UI design
Responsive layout (mobile + desktop)
Skeleton loaders and lazy loading
Clean component-based architecture
📁 Project Structure

/app
  page.tsx
  /about
/components
  ProjectCard.tsx
  ProjectList.tsx
  Navbar.tsx
  Loader.tsx
/hooks
  useInfiniteProjects.ts
/lib
  api.ts
/styles
  globals.css

⚙️ Getting Started
1. Clone repo

git clone https://github.com/your-username/frontend-repo.git

cd frontend-repo

2. Install dependencies

npm install

3. Setup environment variables

Create a .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

4. Run development server

npm run dev

App runs on:
http://localhost:3000

🔌 API Integration

The frontend consumes data from the backend:

GET /api/projects?page=1&limit=10

Supports:

Pagination
Infinite scroll
Error handling + loading states
🎬 Animations

Animations are powered by anime.js:

Page load (fade + stagger)
Scroll-triggered card entry
Hover interactions
Loading transitions
📦 Deployment

Deployed on Vercel (free tier):

Push to GitHub
Import project in Vercel
Add environment variable:
NEXT_PUBLIC_API_URL
🧠 Future Improvements
Admin dashboard
Authentication
Project filtering/search
Analytics tracking
