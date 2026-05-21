/**
 * Global error handler middleware
 * Catches and formats all errors in a consistent way
 */

import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export interface ApiError extends Error {
  statusCode?: number;
  details?: Record<string, any>;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(
    {
      statusCode,
      message,
      stack: err.stack,
      details: err.details,
    },
    "Error occurred"
  );

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(err.details && { details: err.details }),
    },
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
