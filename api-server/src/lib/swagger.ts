/**
 * Swagger/OpenAPI configuration
 * Generates API documentation
 */

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "OHANNA API",
    description: "Egyptian Streetwear E-commerce API",
    version: "1.0.0",
    contact: {
      name: "OHANNA Support",
      email: "support@ohanna.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
    {
      url: "https://api.ohanna.com",
      description: "Production server",
    },
  ],
  paths: {
    "/api/healthz": {
      get: {
        summary: "Health check",
        description: "Check if the API is running",
        tags: ["Health"],
        responses: {
          "200": {
            description: "API is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/checkout": {
      post: {
        summary: "Create checkout session",
        description: "Create a Stripe checkout session or mock order",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["items", "successUrl", "cancelUrl"],
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        product: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            price: { type: "number" },
                            description: { type: "string" },
                          },
                        },
                        quantity: { type: "number" },
                      },
                    },
                  },
                  successUrl: { type: "string", format: "uri" },
                  cancelUrl: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Checkout session created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: { type: "string", format: "uri" },
                    sessionId: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request",
          },
        },
      },
    },
    "/api/contact": {
      post: {
        summary: "Send contact message",
        description: "Submit a contact form message",
        tags: ["Contact"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "message"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  subject: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Message received",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation error",
          },
        },
      },
    },
    "/api/track-order": {
      get: {
        summary: "Track order",
        description: "Get order status by ID and email",
        tags: ["Orders"],
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "Order ID",
          },
          {
            name: "email",
            in: "query",
            required: true,
            schema: { type: "string", format: "email" },
            description: "Customer email",
          },
        ],
        responses: {
          "200": {
            description: "Order found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    order: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        status: { type: "string" },
                        total: { type: "number" },
                        created_at: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Order not found",
          },
        },
      },
    },
    "/api/products": {
      get: {
        summary: "Get products",
        description: "Retrieve list of products",
        tags: ["Products"],
        responses: {
          "200": {
            description: "Products list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/setup": {
      get: {
        summary: "API setup status",
        description: "Check API setup and configuration",
        tags: ["Health"],
        responses: {
          "200": {
            description: "Setup status",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: { type: "string" },
              statusCode: { type: "number" },
              details: { type: "object" },
            },
          },
        },
      },
    },
  },
};
