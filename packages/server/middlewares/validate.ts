import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError, ZodType } from 'zod';

export const validate =
   (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
      try {
         schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
         });
         next();
      } catch (error) {
         if (error instanceof ZodError) {
            const formattedErrors = error.issues.map((issue) => ({
               field: issue.path.slice(1).join('.'),
               message: issue.message,
            }));

            return next(
               new AppError('Validation failed', 400, formattedErrors)
            );
         }
         next(error);
      }
   };
