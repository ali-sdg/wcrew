import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';

// difine types for request
interface request extends Request {
  user?: any; // define exact types for users
}

export const authMiddleware = (req: request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedError('Token not provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;

    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};
