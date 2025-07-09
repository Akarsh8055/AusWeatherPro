# Weather Dashboard Application

## Overview

This is a full-stack weather dashboard application that displays real-time weather information for all Australian states and territories. The application features a modern React frontend with dynamic weather backgrounds and a Node.js/Express backend that integrates with the OpenWeather API.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple
- **API Integration**: OpenWeather API for real-time weather data

### Data Storage
- **Primary Database**: PostgreSQL (configured via Drizzle)
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Caching**: In-memory caching for weather data with 5-minute expiry
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Frontend Components
- **WeatherDashboard**: Main page displaying weather cards for all states with modal integration
- **WeatherCard**: Clickable individual state weather display with local time
- **WeatherDetailModal**: Detailed popup showing analog clock and comprehensive weather data
- **AnalogClock**: Real-time analog clock component with timezone support
- **WeatherBackground**: Dynamic background that changes based on dominant weather
- **WeatherEffects**: Animated weather effects (clouds, rain, sun rays)

### Backend Services
- **Storage Layer**: Abstract storage interface with in-memory implementation
- **Weather API**: Integration with OpenWeather API for current conditions
- **State Management**: Predefined Australian states with timezone information

### Shared Schema
- **WeatherData**: Temperature, humidity, wind speed, conditions, weather type
- **StateInfo**: State codes, names, cities, and timezone information
- **Data Validation**: Zod schemas for runtime type checking

## Data Flow

1. **Frontend Request**: User loads dashboard, React Query fetches data
2. **API Routes**: Express routes handle `/api/weather` and `/api/states`
3. **Weather Integration**: Backend calls OpenWeather API for each state
4. **Data Processing**: Raw weather data mapped to standardized format
5. **Response**: JSON data sent to frontend with proper error handling
6. **UI Updates**: React components update with new weather information
7. **Background Effects**: Dominant weather type determines visual effects

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL via Neon Database serverless
- **Weather API**: OpenWeatherMap API for current weather conditions
- **UI Components**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS for utility-first styling

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Development**: Hot module replacement and error overlay
- **Code Quality**: TypeScript for static type checking

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `OPENWEATHER_API_KEY` or `WEATHER_API_KEY`: OpenWeather API key

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Node.js server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Production Setup
- **Entry Point**: `dist/index.js` for production server
- **Static Assets**: Served from `dist/public` directory
- **Environment**: Production mode disables development features
- **Database**: Requires provisioned PostgreSQL instance

### Development Workflow
- **Local Development**: `npm run dev` starts development server
- **Type Checking**: `npm run check` validates TypeScript
- **Database Updates**: `npm run db:push` applies schema changes

## Architecture Decisions

### Why Drizzle ORM
- **Type Safety**: Full TypeScript support with inferred types
- **Performance**: Lightweight with minimal runtime overhead
- **PostgreSQL**: Native PostgreSQL support with advanced features
- **Developer Experience**: Excellent tooling and migration system

### Why TanStack Query
- **Caching**: Intelligent caching with automatic background updates
- **Error Handling**: Built-in error states and retry logic
- **Real-time**: Easy refetch intervals for live weather updates
- **Developer Tools**: Excellent debugging and inspection tools

### Why Shadcn/ui
- **Accessibility**: Built on Radix UI for WCAG compliance
- **Customization**: Copy-paste components for full control
- **Design System**: Consistent theming with CSS variables
- **Modern**: Latest React patterns and best practices

## Recent Updates - January 2025

### Enhanced UI and Modal Features  
- **Enhanced Text Readability**: Added text shadows and improved contrast for all weather backgrounds
- **Interactive Weather Cards**: Made cards clickable to open detailed weather modal
- **Analog Clock Component**: Created real-time analog clock with timezone support
- **Weather Detail Modal**: Added comprehensive popup with analog clock, detailed metrics, and live weather effects
- **Improved Glass Effects**: Enhanced glass morphism with better transparency and shadows
- **Demo Weather Data**: Added realistic fallback data when API is unavailable
- **Footer Updates**: Updated to "© 2025 Copyright | Designed by Anshul Chauhan | All rights reserved"
- **Netlify Deployment**: Added netlify.toml configuration for easy deployment

### Professional Weather App Design (Latest)
- **Realistic Weather Backgrounds**: Implemented authentic sky blue, storm gray, and night purple gradients
- **iOS-Style Glass Effects**: Enhanced with professional blur effects and transparency
- **3D Realistic Clouds**: Added gradient-based clouds with depth, shadows, and inset lighting
- **Improved Modal Sizing**: Fixed responsive design to properly fit all screen sizes (max-height: 90vh)
- **Enhanced Cloud Animation**: Slower, more realistic cloud movement with varying depths and opacity
- **Professional Overlay**: Added iOS-style gradient overlay for sophisticated appearance
- **Deployment Ready**: Updated Netlify configuration with proper redirects and security headers