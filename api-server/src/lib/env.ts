/**
 * Environment variable management
 * Centralized configuration for the application
 */

export const env = {
  // Server
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  
  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  
  // Database
  databaseUrl: process.env.DATABASE_URL,
  
  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
};

export const isProduction = env.nodeEnv === "production";
export const isDevelopment = env.nodeEnv === "development";
