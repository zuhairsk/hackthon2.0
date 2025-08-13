# Overview

This is an AI-Powered Code Debugging Assistant built with React and Express. The application allows users to debug code using AI assistance, participate in timed debugging challenges, track their progress, and compete on leaderboards. It features a modern, responsive interface with dark theme styling and smooth animations throughout.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript and follows a component-based architecture:

- **UI Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state and React hooks for local state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

The app uses a modular structure with reusable UI components, custom hooks for business logic, and a clean separation between pages, components, and utilities.

## Backend Architecture

The backend follows a simple Express.js REST API pattern:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage**: In-memory storage with interfaces designed for easy PostgreSQL migration
- **API Design**: RESTful endpoints for authentication, debugging sessions, and game functionality
- **Middleware**: Custom logging and error handling middleware

The server is structured with route handlers, storage abstraction layer, and development tooling integration.

## Authentication System

- **Strategy**: Simple token-based authentication stored in localStorage
- **User Management**: Email/username registration with password authentication
- **Session Handling**: Client-side token storage with automatic logout on invalid tokens
- **Security**: Input validation using Zod schemas and basic password requirements

## Data Storage Design

The application uses Drizzle ORM with PostgreSQL schema definitions but currently implements in-memory storage:

- **Users**: Profile information, scores, and challenge completion tracking
- **Debug Sessions**: Code analysis history with original/fixed code and explanations
- **Game Scores**: Leaderboard data with performance metrics
- **Local Storage**: Client-side caching for offline functionality and user preferences

## Key Features Architecture

- **Code Editor**: Textarea-based editor with syntax highlighting and file upload support
- **AI Debugging**: Mock AI responses with structured error analysis and code suggestions
- **Game Mode**: Timed challenges with scoring system and progress tracking
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Offline Support**: Local storage fallbacks for core functionality

# External Dependencies

## Core Libraries

- **@neondatabase/serverless**: PostgreSQL connection for production database
- **drizzle-orm**: Type-safe database ORM and query builder
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth UI transitions
- **wouter**: Lightweight routing solution for React
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod
- **zod**: TypeScript-first schema validation

## UI Components

- **@radix-ui/***: Headless UI primitives for accessibility and behavior
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **lucide-react**: Icon library with consistent design

## Development Tools

- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Potential Integrations

The application is designed to integrate with:
- **PostgreSQL**: Database backend (Drizzle config already configured)
- **AI APIs**: OpenAI, Anthropic, or similar for actual code analysis
- **Real-time Features**: WebSocket support for live challenges
- **File Storage**: Cloud storage for code file uploads
- **Analytics**: User behavior tracking and performance monitoring