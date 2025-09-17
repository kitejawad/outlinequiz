# Quiz Application

## Overview

This is a modern web-based quiz application built with React and Express. The application features a registration system, interactive quiz interface, and progress tracking. Users can register with their details, take quizzes with multiple-choice questions, and navigate through questions with real-time progress feedback.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system following Google Forms/Kahoot aesthetic
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Storage**: In-memory storage (MemStorage) for development, designed to be easily replaceable with database implementation
- **Schema Validation**: Zod for runtime type validation and Drizzle for database schema definition
- **Session Management**: Ready for connect-pg-simple session store integration

### Data Storage Solutions
- **Development**: In-memory storage with sample quiz data
- **Production Ready**: Drizzle ORM configured for PostgreSQL with Neon Database integration
- **Schema**: Well-defined database tables for users, quizzes, and quiz responses with proper relationships

### Authentication and Authorization
- **Registration System**: User registration with name, school, and phone number
- **Session-based**: Configured for session management (credentials: include)
- **Data Validation**: Server-side validation using Zod schemas

### Component Architecture
- **QuizContainer**: Main orchestrator component managing registration flow and quiz state
- **RegistrationModal**: Modal-based user registration with form validation
- **QuizQuestion**: Individual question display with radio button options
- **ProgressIndicator**: Real-time progress tracking with visual feedback
- **QuizNavigation**: Navigation controls with previous/next/submit functionality

### Design System
- **Color Palette**: Google-inspired colors (Primary: #4285F4, Success: #34A853, Error: #EA4335)
- **Typography**: Inter/Roboto font family with consistent hierarchy
- **Layout**: Centered card-based design with 640px max-width containers
- **Spacing**: Tailwind's 4px-based spacing system for consistency

## External Dependencies

### Core Technologies
- **Neon Database**: PostgreSQL-compatible serverless database for production
- **Drizzle ORM**: TypeScript-first ORM for database operations
- **TanStack Query**: Server state management and caching
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

### UI and Styling
- **Shadcn/ui**: Pre-built component library
- **Class Variance Authority**: Utility for creating component variants
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Typography (Inter, Roboto, DM Sans, Geist Mono)

### Database and Validation
- **Drizzle Kit**: Database migration and schema management
- **Zod**: Runtime type validation and schema definition
- **Connect PG Simple**: PostgreSQL session store (configured but not yet implemented)

### Replit Integration
- **Replit Vite Plugins**: Runtime error overlay and cartographer for Replit environment
- **Development Banner**: Replit-specific development experience enhancements