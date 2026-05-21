# API Documentation

## Overview

The OHANNA API is a RESTful API built with Express.js and fully documented with OpenAPI 3.1.0. All endpoints are available at `http://localhost:3001/api`.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently, the API does not require authentication. Future versions will support JWT tokens.

## Response Format

All responses are JSON with the following structure:

### Success Response
```json
{
  "data": {},
  "status": "success"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": []
}
```

## Endpoints

### Health Check

#### GET /healthz
Returns server health status.

**Response:**
```json
{
  "status": "ok"
}
```

**Status Code:** 200

---

### Checkout

#### POST /checkout
Create a checkout session for payment processing.

**Request Body:**
```json
{
  "items": [
    {
      "product": {
        "name": "Product Name",
        "description": "Optional description",
        "price": 100
      },
      "quantity": 1
    }
  ],
  "successUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel"
}
```

**Validation:**
- `items`: Array with at least 1 item (required)
- `items[].product.name`: String, non-empty (required)
- `items[].product.price`: Positive number (required)
- `items[].quantity`: Positive integer (required)
- `successUrl`: Valid URL (required)
- `cancelUrl`: Valid URL (required)

**Response (Stripe enabled):**
```json
{
  "url": "https://checkout.stripe.com/pay/...",
  "sessionId": "cs_test_..."
}
```

**Response (Mock checkout):**
```json
{
  "url": "https://example.com/success?order_id=OHN-1234567890&total=100",
  "sessionId": "OHN-1234567890"
}
```

**Status Codes:**
- 200: Success
- 400: Validation error
- 500: Server error

**Example:**
```bash
curl -X POST http://localhost:3001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "product": {
          "name": "Egyptian Shirt",
          "price": 50
        },
        "quantity": 2
      }
    ],
    "successUrl": "http://localhost:5173/success",
    "cancelUrl": "http://localhost:5173/cancel"
  }'
```

---

### Contact Form

#### POST /contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Optional subject",
  "message": "Your message here"
}
```

**Validation:**
- `name`: String, non-empty (required)
- `email`: Valid email format (required)
- `subject`: String, optional
- `message`: String, non-empty (required)

**Response:**
```json
{
  "success": true,
  "message": "Message received. We'll reply within 24 hours."
}
```

**Status Codes:**
- 200: Success
- 400: Validation error
- 500: Server error

**Example:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "subject": "Product Inquiry",
    "message": "I am interested in your products"
  }'
```

---

### Order Tracking

#### GET /track-order
Track an order by ID and email.

**Query Parameters:**
- `id`: Order ID (required)
- `email`: Customer email (required)

**Response:**
```json
{
  "order": {
    "id": "OHN-1234567890",
    "items": [],
    "total": 100,
    "status": "confirmed",
    "created_at": "2024-05-21T10:00:00Z"
  }
}
```

**Status Codes:**
- 200: Order found
- 400: Missing parameters or validation error
- 404: Order not found

**Example:**
```bash
curl "http://localhost:3001/api/track-order?id=OHN-1234567890&email=john@example.com"
```

---

### Products

#### GET /products
Get list of available products.

**Response:**
```json
{
  "products": []
}
```

**Status Code:** 200

**Example:**
```bash
curl http://localhost:3001/api/products
```

---

### Setup Status

#### GET /setup
Get API setup and configuration status.

**Response:**
```json
{
  "status": "ok",
  "message": "OHANNA API ready"
}
```

**Status Code:** 200

**Example:**
```bash
curl http://localhost:3001/api/setup
```

---

## Error Handling

### Validation Errors

When request validation fails, the API returns a 400 status with detailed error information:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["name"],
      "message": "Expected string, received number"
    }
  ]
}
```

### Application Errors

Application-specific errors return appropriate status codes:

```json
{
  "error": "Order not found"
}
```

### Server Errors

Unexpected errors return 500 status:

```json
{
  "error": "Internal server error"
}
```

## CORS

The API is configured to accept requests from:
- `http://localhost:5173` (Frontend dev)
- `http://localhost:3000`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`
- `http://192.168.100.8:5173`

Configure additional origins via `CORS_ORIGINS` environment variable.

## Rate Limiting

Currently, no rate limiting is implemented. This will be added in future versions.

## Pagination

Currently, no pagination is implemented. This will be added when product listing is implemented.

## Filtering & Sorting

Currently, no filtering or sorting is implemented. This will be added when product listing is implemented.

## Webhooks

Currently, no webhooks are implemented. This will be added for order status updates.

## API Documentation

### Swagger UI
Interactive API documentation available at:
```
http://localhost:3001/api-docs
```

### OpenAPI Specification
Raw OpenAPI 3.1.0 specification available at:
```
http://localhost:3001/api-docs.json
```

## Client Libraries

### JavaScript/TypeScript
The frontend uses an auto-generated client from the OpenAPI specification:

```typescript
import { healthCheck, createCheckout, submitContact } from '@/api'

// Health check
const health = await healthCheck()

// Create checkout
const checkout = await createCheckout({
  items: [{ product: { name: 'Shirt', price: 50 }, quantity: 1 }],
  successUrl: 'http://localhost:5173/success',
  cancelUrl: 'http://localhost:5173/cancel'
})

// Submit contact
const contact = await submitContact({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello'
})
```

## Versioning

The API is currently at version 0.1.0. Breaking changes will increment the major version.

## Changelog

### v0.1.0 (Current)
- Initial API release
- Health check endpoint
- Checkout endpoint with Stripe integration
- Contact form endpoint
- Order tracking endpoint
- Products endpoint
- Setup status endpoint

## Support

For API issues or questions:
1. Check this documentation
2. Review error messages
3. Check backend logs
4. Review OpenAPI specification at `/api-docs.json`

## Future Enhancements

- [ ] Authentication & Authorization
- [ ] Rate limiting
- [ ] Pagination
- [ ] Filtering & Sorting
- [ ] Webhooks
- [ ] GraphQL support
- [ ] API versioning
- [ ] Caching
