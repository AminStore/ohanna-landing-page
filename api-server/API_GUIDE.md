# OHANNA API Guide

## Overview

The OHANNA API is a Node.js/Express backend that provides endpoints for an Egyptian streetwear e-commerce platform. It includes Stripe integration for payments, contact management, and order tracking.

## Architecture

### Directory Structure

```
src/
├── api/              # Generated API types and schemas
├── db/               # Database configuration and schemas
├── lib/              # Utility libraries (logger, env, swagger, etc.)
├── middlewares/      # Express middleware (CORS, validation, error handling)
├── routes/           # API route handlers
├── app.ts            # Express app configuration
└── index.ts          # Server entry point
```

### Middleware Stack

1. **Logging** - Pino HTTP logger for request/response logging
2. **CORS** - Cross-origin resource sharing configuration
3. **Body Parsing** - JSON and URL-encoded body parsing
4. **Request Logger** - Custom request timing and logging
5. **Error Handler** - Global error handling and formatting

## API Endpoints

### Health Check

#### `GET /health`
Root health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "OHANNA API is running"
}
```

#### `GET /api/healthz`
API health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

### Documentation

#### `GET /api-docs`
Returns OpenAPI/Swagger documentation in JSON format.

### Checkout

#### `POST /api/checkout`
Create a Stripe checkout session or mock order.

**Request Body:**
```json
{
  "items": [
    {
      "product": {
        "id": "prod_123",
        "name": "Product Name",
        "price": 99.99,
        "description": "Product description"
      },
      "quantity": 1
    }
  ],
  "successUrl": "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://example.com/cancel"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

**Error Response (400):**
```json
{
  "error": "Cart is empty"
}
```

### Contact

#### `POST /api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question about..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received. We'll reply within 24 hours."
}
```

**Error Response (400):**
```json
{
  "error": "Name, email, and message are required."
}
```

### Order Tracking

#### `GET /api/track-order?id=OHN-123&email=user@example.com`
Track an order by ID and email.

**Query Parameters:**
- `id` (required) - Order ID
- `email` (required) - Customer email

**Response:**
```json
{
  "order": {
    "id": "OHN-123",
    "items": [...],
    "total": 99.99,
    "status": "confirmed",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Order not found."
}
```

### Products

#### `GET /api/products`
Get list of products.

**Response:**
```json
{
  "products": []
}
```

### Setup

#### `GET /api/setup`
Check API setup status.

**Response:**
```json
{
  "status": "ok",
  "message": "OHANNA API ready"
}
```

## Environment Variables

```bash
# Server
PORT=3001
NODE_ENV=development

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# CORS
CORS_ORIGIN=http://localhost:5173

# Database
DATABASE_URL=postgresql://...

# Logging
LOG_LEVEL=info
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "details": {}
  }
}
```

### Common Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## CORS Configuration

The API accepts requests from:
- `http://localhost:5173` (frontend dev)
- `http://localhost:3000`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`
- Custom origin via `CORS_ORIGIN` env var

## Stripe Integration

### Setup

1. Get your Stripe API keys from https://dashboard.stripe.com/apikeys
2. Set `STRIPE_SECRET_KEY` environment variable
3. The API will automatically use Stripe for checkout if the key is configured

### Fallback

If Stripe is not configured or fails, the API falls back to creating mock orders with the following format:

```json
{
  "id": "OHN-1234567890",
  "items": [...],
  "total": 99.99,
  "status": "confirmed",
  "created_at": "2024-01-01T12:00:00Z"
}
```

## Development

### Build

```bash
npm run build
```

### Start

```bash
PORT=3001 npm run start
```

### Type Check

```bash
npm run typecheck
```

## Middleware Details

### Error Handler
- Catches all errors and formats them consistently
- Logs errors with full stack traces
- Returns appropriate HTTP status codes

### Validation
- Validates request bodies against Zod schemas
- Returns 400 with validation details on failure

### Request Logger
- Logs incoming requests with method, path, and query
- Logs outgoing responses with status code and duration
- Redacts sensitive headers (Authorization, Cookie)

### CORS
- Allows credentials
- Supports all standard HTTP methods
- Configurable allowed origins
- 24-hour max age for preflight requests

## Logging

The API uses Pino for structured logging:

```typescript
logger.info({ key: "value" }, "Message");
logger.error({ err }, "Error message");
logger.warn({ duration: "100ms" }, "Warning");
```

In development, logs are pretty-printed. In production, they're JSON formatted.

## Testing Endpoints

### Using curl

```bash
# Health check
curl http://localhost:3001/health

# API health
curl http://localhost:3001/api/healthz

# Swagger docs
curl http://localhost:3001/api-docs

# Contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello"
  }'

# Track order
curl "http://localhost:3001/api/track-order?id=OHN-123&email=user@example.com"
```

### Using PowerShell

```powershell
# Health check
Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing

# Contact form
$body = @{
  name = "John"
  email = "john@example.com"
  message = "Hello"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/contact" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure all required environment variables
3. Use a process manager (PM2, systemd, etc.)
4. Set up reverse proxy (nginx, Apache)
5. Enable HTTPS
6. Configure appropriate CORS origins
7. Set up monitoring and logging aggregation

## Support

For issues or questions, contact support@ohanna.com
