# OHANNA Project Architecture

## Overview

OHANNA is a full-stack Egyptian Streetwear e-commerce platform built with modern web technologies. The project is organized into two main applications: a React frontend and an Express.js backend API.

## Project Structure

```
ohanna-landing-page/
├── ohanna/                    # Frontend React application
│   ├── src/
│   │   ├── api/              # API client and generated types
│   │   ├── components/       # React components
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   ├── package.json
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   └── tsconfig.json
│
├── api-server/               # Backend Express API
│   ├── src/
│   │   ├── api/              # Generated API types
│   │   ├── api-spec/         # OpenAPI specification
│   │   ├── db/               # Database configuration
│   │   ├── lib/              # Utilities and services
│   │   ├── middlewares/      # Express middlewares
│   │   ├── routes/           # API route handlers
│   │   ├── app.ts            # Express app setup
│   │   └── index.ts          # Server entry point
│   ├── api-spec/             # API specification (root)
│   ├── dist/                 # Compiled output
│   ├── package.json
│   ├── build.mjs             # Build script
│   └── tsconfig.json
│
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # This file
│   ├── SETUP.md              # Setup instructions
│   ├── API.md                # API documentation
│   └── DEPLOYMENT.md         # Deployment guide
│
└── README.md                 # Project overview
```

## Frontend (React + Vite)

### Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Custom fetch wrapper with React Query
- **Language**: TypeScript

### Key Features
- Server-side rendering ready
- Component-based architecture
- Responsive design with Tailwind CSS
- Type-safe API client generated from OpenAPI spec
- Dark mode support

### Directory Structure
```
ohanna/src/
├── api/                      # API integration
│   ├── custom-fetch.ts       # Custom fetch implementation
│   ├── generated/            # Generated from OpenAPI
│   │   ├── api.ts
│   │   └── api.schemas.ts
│   └── index.ts
├── components/
│   ├── cart/                 # Shopping cart components
│   ├── layout/               # Layout components
│   ├── product/              # Product components
│   └── ui/                   # UI components (shadcn/ui)
├── App.tsx
└── main.tsx
```

## Backend (Express.js)

### Technology Stack
- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database**: PostgreSQL (with Drizzle ORM)
- **Validation**: Zod
- **Logging**: Pino
- **Payment**: Stripe (optional)
- **API Docs**: Swagger UI + OpenAPI 3.1

### Key Features
- RESTful API with TypeScript
- Request validation with Zod
- Structured logging with Pino
- CORS configured for frontend
- Stripe payment integration (with mock fallback)
- Comprehensive error handling
- Swagger documentation

### Directory Structure
```
api-server/src/
├── api/                      # Generated API types
│   ├── generated/
│   │   ├── api.ts
│   │   └── types/
│   └── index.ts
├── api-spec/                 # OpenAPI specification
│   └── openapi.json
├── db/                       # Database
│   ├── index.ts
│   └── schema/
├── lib/                      # Utilities
│   ├── env.ts               # Configuration
│   ├── logger.ts            # Logging setup
│   └── stripe.ts            # Stripe service
├── middlewares/              # Express middlewares
│   ├── error-handler.ts     # Error handling
│   ├── validation.ts        # Request validation
│   ├── request-logger.ts    # Request logging
│   └── index.ts
├── routes/                   # API routes
│   ├── health.ts            # Health check
│   ├── ohanna.ts            # Main routes
│   └── index.ts
├── app.ts                    # Express app setup
└── index.ts                  # Server entry point
```

## API Specification

### OpenAPI 3.1.0
The API is fully documented using OpenAPI 3.1.0 specification located at `api-server/src/api-spec/openapi.json`.

### Endpoints
- `GET /` - Root health check
- `GET /api/healthz` - Health status
- `POST /api/checkout` - Create checkout session
- `POST /api/contact` - Submit contact form
- `GET /api/track-order` - Track order
- `GET /api/products` - Get products
- `GET /api/setup` - Setup status
- `GET /api-docs` - Swagger UI
- `GET /api-docs.json` - OpenAPI spec

## Data Flow

### Frontend to Backend
1. User interacts with React component
2. Component calls API client (generated from OpenAPI)
3. Custom fetch wrapper adds headers and handles errors
4. Request sent to backend with CORS headers
5. Backend validates request with Zod middleware
6. Route handler processes request
7. Response returned to frontend

### Backend Processing
1. Request received by Express
2. CORS middleware validates origin
3. Body/query validation middleware validates input
4. Route handler processes request
5. Error handler catches any errors
6. Response sent back to client

## Configuration

### Environment Variables

**Backend** (`.env`):
```
PORT=3001
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...  # Optional
CORS_ORIGINS=http://localhost:5173  # Optional
```

**Frontend** (Vite):
- API base URL configured in `src/api/custom-fetch.ts`
- Default: `/api` (relative to frontend origin)

## Development Workflow

### Local Development
1. Start backend: `npm run dev` (in `api-server/`)
2. Start frontend: `npm run dev` (in `ohanna/`)
3. Frontend available at `http://localhost:5173`
4. Backend available at `http://localhost:3001`
5. API docs at `http://localhost:3001/api-docs`

### Code Generation
API client types are generated from OpenAPI spec using Orval:
```bash
cd api-server/api-spec
npm run codegen
```

This generates:
- Frontend client: `ohanna/src/api/generated/`
- Backend types: `api-server/src/api/generated/`

## Security Considerations

### CORS
- Configured to allow specific origins
- Credentials enabled for session cookies
- Configurable via `CORS_ORIGINS` env var

### Input Validation
- All request bodies validated with Zod
- Query parameters validated
- Email format validation
- URL validation for checkout

### Error Handling
- Sensitive errors not exposed to client
- Structured logging for debugging
- Proper HTTP status codes

### Stripe Integration
- Secret key stored in environment variable
- Mock checkout fallback when not configured
- Proper error handling and logging

## Performance Considerations

### Frontend
- Code splitting with Vite
- Lazy loading of components
- CSS optimization with Tailwind
- Image optimization

### Backend
- Request logging with Pino (structured)
- Connection pooling for database
- Middleware optimization
- Error handling efficiency

## Monitoring & Logging

### Backend Logging
- Structured logging with Pino
- Request/response logging
- Error tracking with full context
- Configuration logging on startup

### Frontend
- Console logging in development
- Error boundary for React errors
- API error handling

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## Contributing

See [SETUP.md](./SETUP.md) for development setup.
