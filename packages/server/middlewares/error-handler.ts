import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
   err: any,
   request: Request,
   response: Response,
   next: NextFunction
) => {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         success: false,
         message: err.message,
         errors: err.details || null,
      });
   }

   return response.status(500).json({
      success: false,
      message: 'Internal server error',
      errors: err.details || null,
   });
};
