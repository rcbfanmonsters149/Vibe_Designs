# Vibe Designs - AI-Powered Startup Ideas & Hackathon Platform

An AI-driven platform for discovering, generating, tracking, and executing curated startup ideas and hackathon projects. Built with Next.js, Tailwind CSS, Google Gemini AI, and Supabase.

## Features

- **Daily Autonomous AI Startup Ideas**: Automatically generated innovative startup concepts curated by Google Gemini AI.
- **Hackathon Directory & Matchmaking**: Curated hackathon tracks with project generation, skill requirements, and difficulty breakdowns.
- **Interactive Project Tracker**: Step-by-step milestone execution roadmap with AI assistance for each phase.
- **Authentication & User Profiles**: Supabase SSR authentication for saving, bookmarking, and managing projects.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: [Supabase](https://supabase.com/)
- **AI Engine**: [Google Gen AI SDK (@google/genai)](https://ai.google.dev/)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase Project credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- Google Gemini API Key (`GEMINI_API_KEY`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rcbfanmonsters149/Vibe_Designs.git
   cd Vibe_Designs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   GEMINI_API_KEY=your_gemini_api_key
   CRON_SECRET=your_cron_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
