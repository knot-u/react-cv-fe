---
description: Load these instructions for work on the frontend CV/portfolio app built with Next.js, Tailwind, animations, API integration, and deployment configuration.
paths:
  - "app/**/*.ts"
  - "app/**/*.tsx"
  - "components/**/*.ts"
  - "components/**/*.tsx"
  - "lib/**/*.ts"
  - "lib/**/*.tsx"
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Frontend agent instructions

## Project scope
- This repository is the frontend for a modern CV/portfolio experience.
- The backend is a separate Express.js project. Do not move backend logic into this repo.
- Keep all implementation choices friendly to free-tier hosting and simple CI/CD.

## Product goals
- Prioritize a premium dark UI, polished interactions, and fast perceived performance.
- The first screen should load quickly and feel production-ready on desktop and mobile.
- Animations should enhance the experience, not block content or reduce usability.

## Core architecture principle
- The frontend must remain modular, scalable, predictable, and easy to maintain.
- All code should follow separation of concerns and single responsibility.
- Any code that mixes concerns should be refactored.

## Folder structure rules
- Prefer this structure as the default architecture:
  - app for routes and pages
  - components/ui for reusable presentational components
  - components/layout for structural page components
  - components/features for feature-level composition
  - hooks for shared stateful logic
  - lib for API clients, utilities, and shared helpers
  - styles for design-system level styling needs

## Architecture rules
- Use Next.js App Router patterns that match the version installed in the repo. Check local Next.js docs before using framework-specific APIs.
- Prefer a hybrid rendering approach:
  - initial project list page rendered on the server
  - additional pages fetched on the client through infinite scrolling
- Keep server and client responsibilities clearly separated.
- Do not hardcode API URLs, secrets, or environment-specific values.

## Component rules
- Components must be small, reusable, and focused.
- One component should have one clear responsibility.
- Avoid oversized multi-purpose components.
- UI components should be pure and reusable with minimal business logic.
- Layout components should define structure and spacing.
- Feature components may compose UI and hooks to deliver page-level behavior.

## Data fetching rules
- Centralize API access in lib, using a shared API layer such as lib/api.
- Do not place ad hoc fetch logic across random components.
- Use custom hooks for stateful data logic such as project loading and pagination.
- Every data-loading flow must handle loading, error, empty, and end-of-list states.

## State management rules
- Use React local state and reducers by default.
- Keep local state local.
- Move shared logic into custom hooks before introducing broader state solutions.
- Avoid unnecessary global state.

## Separation of logic
- Never mix UI rendering, data fetching, and business logic in the same place without need.
- UI belongs in components.
- Shared logic belongs in hooks.
- API integration and utilities belong in lib.

## Naming conventions
- Components should use PascalCase.
- Hooks should use camelCase with the use prefix.
- Files and folders should stay lowercase or kebab-case where appropriate.

## Styling rules
- Tailwind CSS is the primary styling system.
- Use Tailwind for layout, spacing, color, and responsive design.
- Keep spacing and sizing consistent.
- Avoid inline styles unless there is a clear reason.
- Do not mix styling systems randomly.

## MUI usage rules
- Material UI is limited and optional.
- Use it only for complex primitives such as modals, menus, and inputs when it adds clear value.
- Do not use MUI for general layout.
- Keep the visual language aligned with the Tailwind-driven design system.

## Styling and animation
- Use Tailwind CSS for layout, spacing, and design consistency.
- Keep the visual system clean, modern, and minimal.
- Use animation sparingly and intentionally for page entrance, hover polish, and newly appended cards.
- Prefer transform and opacity animations for performance.
- Respect reduced-motion preferences and avoid layout thrashing.

## Animation system rules

### Ownership rule
- Each DOM element must be controlled by only one animation system at a time.
- Never apply anime.js and Framer Motion to the same element.
- Never animate the same CSS property from multiple libraries simultaneously.

### Library responsibilities
- Use anime.js only for cinematic page-level sequences, initial load effects, staggered entrances, and timeline-based motion.
- Do not use anime.js for React state-driven updates, layout transitions, or interaction logic.
- Use Framer Motion for hover, tap, focus, mount and unmount transitions, layout animation, and state-based UI animation.
- Use Material UI for structure and UI primitives only, such as modals, menus, and inputs.
- If a Material UI element needs animation, wrap its content in a Framer Motion element rather than animating the MUI root directly.

### Separation pattern
- When anime.js and Framer Motion are both needed, separate them into nested elements.
- Parent elements may own cinematic anime.js motion.
- Child elements may own interactive Framer Motion behavior.

### Conflict and layout rules
- Never animate transform from both anime.js and Framer Motion on the same element.
- If both types of motion are needed, split responsibility across parent and child wrappers.
- Never use anime.js to animate layout properties such as width, height, top, or left.
- Use Framer Motion layout features for layout transitions.

### Performance rules
- Prefer animating opacity and transform only.
- Avoid animating width, height, top, and left whenever possible.
- Avoid animating too many nodes at once.
- Prefer staggered reveals over mass simultaneous animation.

### Tailwind and purpose rules
- Use Tailwind for simple transitions such as hover color changes and subtle scale effects.
- Do not replace straightforward CSS transitions with JavaScript animation unnecessarily.
- Motion should guide attention, improve clarity, and reinforce hierarchy.
- Motion must not be excessive or delay interaction.

### Mental model
- anime.js = cinematic sequences
- Framer Motion = UI interactions and state-driven motion
- Tailwind = styling and simple transitions
- Material UI = structural components
- Any implementation that violates this separation should be corrected.

## Performance and scalability rules
- Use lazy loading when it improves perceived performance.
- Avoid unnecessary re-renders.
- Memoize heavy components only where there is a real benefit.
- Do not fetch unnecessary data.
- Large collections should use pagination or infinite scroll.
- The architecture should support future expansion such as admin or dashboard features without breaking the current structure.

## Reusability rule
- Before creating a new component, check whether an existing one can be reused.
- If a reusable primitive is needed, prefer placing it in the UI component layer.

## API integration rules
- All endpoints must be configurable through environment variables such as NEXT_PUBLIC_API_URL.
- Never hardcode production or preview URLs.

## Error handling
- Every data-fetching hook must handle loading, error, and empty states explicitly.
- Degrade gracefully when API data is missing or delayed.

## Images and assets
- Use lightweight images and optimize for fast loading.
- Prefer public URLs or approved static asset hosting strategies.
- Store and consume image URLs only; do not introduce paid asset storage assumptions.
- Configure image rendering in a way that remains compatible with deployment.

## Environment and deployment
- Keep the app ready for Vercel deployment at all times.
- Use environment variables for API base URLs and any public configuration.
- Keep example environment files updated without exposing secrets.
- Avoid dependencies or patterns that are likely to break on free-tier hosting.

## Clean code expectations
- Write TypeScript-first code with explicit types at API and component boundaries.
- Favor readability over clever abstractions.
- Keep functions and components small and easy to test.
- Add comments only when intent is not obvious from the code.
- Remove dead code, commented-out blocks, and production console logs.
- Keep output readable, consistent, and minimal.

## Mental model for enforcement
- Components = UI
- Hooks = logic
- Lib = API and utilities
- Styles = design system
- Code that mixes these concerns should be refactored.

## CV transformation workflow
- Before implementation, create a concise task checklist and normalized data structure.
- Do not paste raw CV text directly into the interface.
- Convert all CV content into structured, reusable data objects first.
- Keep content concise, scannable, and component-based.

### Required implementation to do list
- Create a landing page structure with Hero, About, Skills, Experience, Education, Languages, Projects preview, and Contact sections.
- Build a dedicated Projects route for the full project feed.
- Normalize all CV content into structured data collections for projects, experience, skills, education, languages, and contact.
- Convert long summaries and job descriptions into short paragraphs or bullet lists.
- Group skills into clear categories such as frontend, backend, cloud and devops, databases, and tools.
- Transform each work experience entry into a timeline item with company, role, dates, and three to five clear bullet points.
- Generate mock portfolio projects from real experience when the CV does not list explicit projects.
- Ensure every generated project includes a title, description, tech stack, category, image, GitHub link, and live link placeholders.
- Design the Projects page as an infinite-scrolling card grid with modal details.
- Keep navigation clear with links to Home, About, Skills, Experience, Projects, and Contact.
- Preserve strong spacing, hierarchy, and readability across all sections.

## Review checklist
Before finishing any change, verify that:
- the initial load still works cleanly
- infinite scroll behavior remains stable
- mobile responsiveness is preserved
- error and empty states are handled
- no secrets or environment-specific values were committed
