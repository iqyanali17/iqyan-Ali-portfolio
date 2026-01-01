# Portfolio Website - Khwaja Iqyan Ali

## Overview
This is a purely static personal portfolio website for a Full-Stack Web Developer. It is built as a Single Page Application (SPA) with React and Vite.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Data Management**: Static data file (`client/src/lib/data.ts`)

### Directory Structure
```
├── client/           # React frontend source
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks (Data access)
│   │   ├── lib/         # Utilities & Static Data
│   │   └── pages/       # Page components
│   └── public/          # Static assets (images, resume)
├── dist/             # Production build output
└── package.json      # Project configuration
```

### Development
- Run `npm run dev` to start the development server on port 5000.
- The project uses `client/src/lib/data.ts` for all portfolio content.

## Deployment to Vercel

### Step-by-Step
1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Vercel will automatically detect Vite. Use these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

## Recent Changes
- 2026-01-01: Removed all backend/database logic. Project is now purely frontend.
- 2026-01-01: Migrated database content to `client/src/lib/data.ts`.
- 2026-01-01: Cleaned up project structure and dependencies.
