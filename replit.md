# Overview

This is a mobile-first park community app called "สวนธนบุรีรมย์" (Thonburi Park) built for Thai users. The application serves as a comprehensive platform for park visitors to access information, participate in activities, connect with the community, and track their fitness activities. The app follows a park management and community engagement model with features like weather information, activity registration, community posts, and user profiles.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with a mobile-first navigation approach
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **State Management**: TanStack Query for server state management and caching
- **Mobile Design**: Bottom navigation with five main sections (Home, Map, Activities, Community, Profile)

## Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **API Design**: RESTful API structure with organized route handlers
- **Development Setup**: Vite integration for hot module replacement in development
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Request/response logging middleware for API monitoring

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **In-Memory Storage**: Fallback memory storage implementation for development/testing
- **Data Models**: Users, activities, posts, activity registrations, and user activity tracking

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Management**: User profiles with levels, statistics tracking, and activity history
- **Security**: CORS configuration and secure session handling

## External Dependencies
- **Database Provider**: Neon Database serverless PostgreSQL
- **UI Components**: Comprehensive Radix UI component library for accessible interfaces
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Icons**: Font Awesome for consistent iconography
- **Development Tools**: Replit integration with cartographer plugin and runtime error overlay
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Date Handling**: date-fns library for internationalized date formatting
- **Charts**: Recharts for data visualization components