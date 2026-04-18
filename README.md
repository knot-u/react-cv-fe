🖤 Frontend README (Next.js CV App)
🖤 Interactive CV — Frontend
<p align="center"> A premium, animation-driven developer portfolio built for immersion, performance, and elegance. </p> <p align="center"> <img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js" /> <img src="https://img.shields.io/badge/TailwindCSS-Styling-0f172a?style=for-the-badge&logo=tailwindcss" /> <img src="https://img.shields.io/badge/anime.js-Animations-111827?style=for-the-badge" /> <img src="https://img.shields.io/badge/Status-In%20Progress-9333ea?style=for-the-badge" /> </p>
🌌 Preview
<p align="center"> <!-- Replace with your real screenshots --> <img src="https://via.placeholder.com/900x500/000000/FFFFFF?text=Main+Infinite+Scroll+View" width="90%" /> </p>
✨ Experience

This is not a traditional CV.

It’s a scroll-based interactive experience where projects emerge dynamically through motion, depth, and subtle visual feedback. The UI is designed around:

Infinite exploration
Smooth animation flow
Minimalist dark aesthetic
Developer-focused storytelling
🎬 Animation System

Powered by anime.js, the interface feels alive through:

Initial Load
Staggered fade-in of UI elements
Smooth opacity + translate transitions
Scroll Behavior
Progressive reveal of project cards
Intersection-based animations
Microinteractions
Hover glow + scale
Soft elevation transitions
Loading States
Skeleton placeholders
Seamless content transitions
🧱 Tech Stack
Next.js (App Router)
React
Tailwind CSS
anime.js
📁 Architecture
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
🔁 Data Flow
Initial render → Server-side fetch (fast load)
Scroll → Client-side pagination
API call → /api/projects?page=1&limit=10
Animate → Inject + animate new cards
⚙️ Setup
Clone
git clone https://github.com/your-username/frontend-repo.git
cd frontend-repo
Install
npm install
Environment

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
Run
npm run dev
🚀 Deployment
Hosted on Vercel (free tier)
Connected to GitHub for CI/CD
🧠 Future Vision
Interactive project filtering
Admin content panel
AI-enhanced descriptions
