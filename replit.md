# Campus Nexus - replit.md

## Overview

Campus Nexus is a full-stack web application serving as a digital campus companion for IIT Ropar students. It consolidates campus life into a single platform with modules for mess menus, announcements, lost & found, marketplace, ride sharing, campus maps, academics, and an AI-powered chat assistant. The app uses Replit Auth for authentication and OpenAI (via Replit AI Integrations) for AI features like email summarization and conversational chat.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Overall Structure
The project follows a monorepo pattern with three main directories:
- `client/` — React frontend (SPA)
- `server/` — Express backend (API server)
- `shared/` — Shared types, schemas, and route definitions used by both client and server

### Frontend Architecture
- **Framework**: React with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support), custom fonts (Outfit, Plus Jakarta Sans)
- **Forms**: react-hook-form with zod resolvers for validation
- **Animations**: framer-motion for page transitions and micro-interactions
- **Icons**: lucide-react
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express.js running on Node with TypeScript (via tsx)
- **API Pattern**: RESTful JSON API endpoints under `/api/`
- **Route Registration**: Centralized in `server/routes.ts`, with feature-specific routes in `server/replit_integrations/`
- **Build**: Custom build script (`script/build.ts`) using esbuild for server and Vite for client. Production output goes to `dist/`
- **Dev Mode**: Vite dev server with HMR proxied through Express (`server/vite.ts`)
- **Static Serving**: In production, Express serves the built client from `dist/public/`

### Database
- **Database**: PostgreSQL (required, provided via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` (main), `shared/models/auth.ts` (auth/sessions), `shared/models/chat.ts` (conversations/messages)
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema synchronization
- **Session Store**: `connect-pg-simple` storing sessions in the `sessions` PostgreSQL table

### Key Database Tables
- `users` — User accounts (managed by Replit Auth)
- `sessions` — Session storage (mandatory for Replit Auth)
- `mess_menus` — Daily mess menu items with ratings
- `announcements` — Campus announcements with categories and priorities
- `lost_and_found` — Lost/found item reports
- `marketplace_items` — Student marketplace listings
- `rides` — Ride sharing posts
- `locations` — Campus locations
- `academic_events` — Academic calendar events
- `assignments` — Student assignments
- `conversations` / `messages` — AI chat history

### Authentication
- **Method**: Replit Auth (OpenID Connect) via `openid-client` and Passport.js
- **Session Management**: Express sessions stored in PostgreSQL with 1-week TTL
- **User Sync**: Users are upserted on login via the auth storage layer
- **Protected Routes**: `isAuthenticated` middleware from `server/replit_integrations/auth/replitAuth.ts`

### Shared Route Definitions
The `shared/routes.ts` file defines a typed API contract (`api` object) with paths, methods, input schemas (zod), and response schemas. Both client hooks and server routes reference this for consistency.

### Replit Integrations
Located in `server/replit_integrations/`, these are modular features:
- **auth/** — Replit Auth setup, routes, and storage
- **chat/** — AI chat with OpenAI (conversation CRUD + streaming responses)
- **audio/** — Voice chat capabilities (speech-to-text, text-to-speech, audio streaming)
- **image/** — AI image generation via `gpt-image-1`
- **batch/** — Batch processing utilities with rate limiting and retries

### Client-Side Data Hooks
Custom hooks in `client/src/hooks/` wrap TanStack Query for each domain:
- `use-auth.ts` — Authentication state
- `use-mess.ts` — Mess menu CRUD
- `use-announcements.ts` — Announcements + AI email summarization
- `use-exchange.ts` — Lost & found, marketplace, rides
- `use-academic.ts` — Academic events and assignments
- `use-locations.ts` — Campus locations

## External Dependencies

### Required Services
- **PostgreSQL Database**: Must be provisioned and accessible via `DATABASE_URL` environment variable
- **OpenAI API** (via Replit AI Integrations): Used for chat, email summarization, image generation, and voice features. Configured via `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Required Environment Variables
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — Secret for Express session encryption
- `REPL_ID` — Replit environment identifier (auto-set on Replit)
- `ISSUER_URL` — OpenID Connect issuer (defaults to `https://replit.com/oidc`)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — OpenAI API key
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — OpenAI API base URL

### Key NPM Packages
- **Server**: express, drizzle-orm, pg, passport, openid-client, openai, connect-pg-simple, express-session
- **Client**: react, wouter, @tanstack/react-query, framer-motion, react-hook-form, zod, recharts, date-fns
- **UI**: @radix-ui/* primitives, tailwindcss, class-variance-authority, lucide-react, cmdk, embla-carousel-react
- **Build**: vite, esbuild, tsx, drizzle-kit

### External Embeds
- Google Maps iframe embed for the campus map page (IIT Ropar location)