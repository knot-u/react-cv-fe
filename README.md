<p align="center"> A premium, animation-driven developer portfolio built for immersion, performance, and elegance. </p> <p align="center"> <img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js" /> <img src="https://img.shields.io/badge/TailwindCSS-Styling-0f172a?style=for-the-badge&logo=tailwindcss" /> <img src="https://img.shields.io/badge/MUI-Components-1e293b?style=for-the-badge&logo=mui" /> <img src="https://img.shields.io/badge/anime.js-Cinematic_Animations-111827?style=for-the-badge" /> <img src="https://img.shields.io/badge/Framer_Motion-UI_Animations-4c1d95?style=for-the-badge" /> </p>
🌌 Preview
<p align="center"> <!-- Replace with your real screenshots --> <img src="https://via.placeholder.com/900x500/000000/FFFFFF?text=Infinite+Scroll+Portfolio" width="90%" /> </p>
✨ Experience

This is not a traditional CV.

It’s a scroll-based interactive experience where projects emerge dynamically through motion, depth, and subtle visual feedback.

Designed around:

Infinite exploration
Smooth animation flow
Minimalist dark aesthetic
Modular, reusable UI components
🎬 Animation System

A hybrid animation architecture:

🎥 anime.js (Cinematic Layer)
Page intro sequences
Staggered content reveals
Timeline-based animations
⚡ Framer Motion (UI Layer)
Hover effects
Layout transitions
Component state animations
Animation Breakdown
Initial Load
Staggered fade-in (anime.js)
Scroll Behavior
Intersection-triggered reveals
Microinteractions
Hover scale + glow (Framer Motion)
Loading States
Animated skeletons + transitions
🧩 UI System
Tailwind CSS → Layout + styling foundation
Material UI (MUI) → reusable components:
Modals (project details)
Menus / navigation
Inputs (future admin panel)

👉 MUI is used selectively to avoid design conflicts and keep performance high.

🧱 Tech Stack
Next.js (App Router)
React
Tailwind CSS
MUI (Material UI)
anime.js
Framer Motion
📁 Architecture

/app
  page.tsx
  /about

/components
  ProjectCard.tsx
  ProjectList.tsx
  Navbar.tsx
  Loader.tsx
  Modal.tsx (MUI-based)

/hooks
  useInfiniteProjects.ts
  useAnimateOnScroll.ts

/lib
  api.ts

/styles
  globals.css

🔁 Data Flow
Initial render → Server-side fetch
Scroll → Trigger infinite loading
API → /api/projects?page=1&limit=10
Render → Append + animate
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
CI/CD via GitHub
⚠️ Design Philosophy
Avoid UI clutter
Keep animations meaningful (not excessive)
Prioritize performance over visual noise
Maintain consistency across animation systems
🧠 Future Vision
Advanced motion system (parallax, depth layers)
Theme engine (multiple color schemes)
Interactive project storytelling
Admin dashboard with MUI components
