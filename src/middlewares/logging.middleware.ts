import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  logger.info({
    message: 'Incoming Request',
    method: req.method,
    path: req.path,
    userAgent: req.get('user-agent'),
    ip: req.ip,
  });

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.info({
      message: 'Request Processed',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
