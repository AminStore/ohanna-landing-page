# Development Setup Guide

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Git

## Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd ohanna-landing-page
```

### 2. Install Dependencies

**Backend:**
```bash
cd api-server
npm install --legacy-peer-deps
```

**Frontend:**
```bash
cd ../ohanna
npm install
```

### 3. Environment Configuration

**Backend** - Create `.env` file in `api-server/`:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3001
NODE_ENV=development
# Optional: Add Stripe key for real payments
# STRIPE_SECRET_KEY=sk_test_your_key_here
```

**Frontend** - No `.env` needed for local development

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd api-server
npm run dev
```

Backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd ohanna
npm run dev
```

Frontend will start on `http://localhost:5173`

### 5. Verify Setup

- Frontend: Open `http://localhost:5173` in browser
- Backend: Open `http://localhost:3001` in browser
- API Docs: Open `http://localhost:3001/api-docs` in browser

## Project Structure

```
ohanna-landing-page/
├── ohanna/              # Frontend React app
├── api-server/          # Backend Express API
├── docs/                # Documentation
└── README.md
```

## Available Scripts

### Backend (api-server/)

```bash
# Development with auto-reload
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Type checking
npm run typecheck
```

### Frontend (ohanna/)

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck
```

## API Development

### Updating API Specification

1. Edit `api-server/api-spec/openapi.json`
2. Regenerate client types:
   ```bash
   cd api-server/api-spec
   npm run codegen
   ```
3. This updates:
   - `ohanna/src/api/generated/` (frontend client)
   - `api-server/src/api/generated/` (backend types)

### Testing API Endpoints

**Using Swagger UI:**
- Open `http://localhost:3001/api-docs`
- Try out endpoints directly in browser

**Using curl:**
```bash
# Health check
curl http://localhost:3001/api/healthz

# Contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello"
  }'

# Checkout
curl -X POST http://localhost:3001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product": {"name": "Shirt", "price": 50}, "quantity": 1}],
    "successUrl": "http://localhost:5173/success",
    "cancelUrl": "http://localhost:5173/cancel"
  }'
```

## Troubleshooting

### Port Already in Use

**Backend:**
```bash
PORT=3002 npm run dev
```

**Frontend:**
```bash
npm run dev -- --port 5174
```

### CORS Errors

Ensure `CORS_ORIGINS` in backend `.env` includes frontend URL:
```
CORS_ORIGINS=http://localhost:5173
```

### Module Not Found

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Build Errors

Check TypeScript errors:
```bash
npm run typecheck
```

### Stripe Integration Issues

- Test mode: Use `sk_test_...` keys
- Live mode: Use `sk_live_...` keys
- Without key: Uses mock checkout

## Code Style

### TypeScript
- Strict mode enabled
- No implicit any
- Proper type annotations

### Formatting
- Prettier configured
- ESLint for linting

### Naming Conventions
- camelCase for variables/functions
- PascalCase for components/classes
- UPPER_SNAKE_CASE for constants

## Git Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### Commit Messages
```
type(scope): description

feat(api): add checkout endpoint
fix(frontend): resolve CORS issue
docs(setup): update installation steps
```

## Database Setup (Future)

When database is configured:

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Reset database
npm run db:reset
```

## Performance Tips

### Frontend
- Use React DevTools for profiling
- Check bundle size: `npm run build`
- Lazy load components when possible

### Backend
- Monitor logs for slow requests
- Check database query performance
- Use Swagger UI to test endpoints

## Debugging

### Backend
- Logs are structured with Pino
- Check `dist/` for compiled output
- Use `--inspect` flag for Node debugger:
  ```bash
  node --inspect --enable-source-maps ./dist/index.mjs
  ```

### Frontend
- Use React DevTools browser extension
- Check Network tab for API calls
- Use Console for errors

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
2. Read [API.md](./API.md) for API documentation
3. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

## Support

For issues or questions:
1. Check existing documentation
2. Review error messages carefully
3. Check backend logs: `npm run dev` output
4. Check browser console for frontend errors
