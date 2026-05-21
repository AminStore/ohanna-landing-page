/**
 * Request logging middleware
 * Logs incoming requests and outgoing responses
 */

import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  // Log request
  logger.info(
    {
      method: req.method,
      path: req.path,
      query: req.query,
      ip: req.ip,
    },
    "Incoming request"
  );

  // Capture response
  const originalSend = res.send;
  res.send = function (data: any) {
    const duration = Date.now() - startTime;
    logger.info(
      {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      },
      "Request completed"
    );
    return originalSend.call(this, data);
  };

  next();
};
