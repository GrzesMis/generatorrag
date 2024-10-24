import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error('Unexpected error:', err);
  
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred'
  });
};