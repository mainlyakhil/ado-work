# Ado Work — Gym, Nutrition & Fitness Tracker PWA

A mobile-first Progressive Web App (PWA) for workout logging, anatomical muscle-group targeting, macro/diet tracking, sleep scheduling, and body-transformation analytics.

## Key Features

- **Interactive Muscle-Group Selector (`/body-selector`, `/body/:part`):** Visual body-part selector with targeted exercise libraries and guided routines.
- **Workout & Split Planner (`/workout`, `/workouts`, `/plans`):** Log sets, reps, and weights, browse structured training splits, and track daily completion rings.
- **Diet & Macro Insights (`/diet`, `/diet-plan`, `/diet-insight`):** Track daily calorie and macronutrient intake with visual breakdowns and meal plans.
- **Recovery & Growth Analytics (`/sleep`, `/growth`):** Monitor sleep schedules, recovery metrics, and longitudinal body-transformation progress.
- **Installable PWA (`/install`):** Configured with `vite-plugin-pwa`, offline service worker caching, and home-screen install support.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Routing:** React Router v6
- **PWA:** `vite-plugin-pwa`
- **Styling & UI:** Tailwind CSS + shadcn/ui + Recharts + Lucide Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production PWA bundle
npm run build
```
