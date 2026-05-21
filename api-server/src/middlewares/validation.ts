/**
 * Request validation middleware
 * Validates incoming requests against Zod schemas
 */

import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "./error-handler";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      const apiError: ApiError = new Error("Validation failed");
      apiError.statusCode = 400;
      apiError.details = error.errors || error.message;
      next(apiError);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.query);
      req.query = validated as any;
      next();
    } catch (error: any) {
      const apiError: ApiError = new Error("Query validation failed");
      apiError.statusCode = 400;
      apiError.details = error.errors || error.message;
      next(apiError);
    }
  };
};
