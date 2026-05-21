import express, { type Express } from "express";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { corsConfig, errorHandler, requestLogger } from "./middlewares";
import { swaggerConfig } from "./lib/swagger";

const app: Express = express();

// Logging middleware
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// CORS middleware
app.use(corsConfig);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// API routes
app.use("/api", router);

// Swagger/OpenAPI documentation
app.get("/api-docs", (_req, res) => {
  res.json(swaggerConfig);
});

// Health check at root
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "OHANNA API is running" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: {
      message: "Not Found",
      statusCode: 404,
    },
  });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
