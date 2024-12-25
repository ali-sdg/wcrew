import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import { rateLimiter } from './middlewares/rateLimiter';
import { requestLogger } from './middlewares/logging.middleware';

export const createApp = (): Application => {
  const app = express();

  // Security and optimization middlewares
  app.use(helmet());
  app.use(compression());
  app.use(cors());

  // Request processing middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware for session management

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default-fallback-key',
      resave: false,
      saveUninitialized: true,
    })
  );

  // Setting up Passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // Rate limiting
  app.use(rateLimiter);

  // Middleware for logging requests
  app.use(requestLogger);

  // Routes for authentication
  app.use('/auth', authRoutes);

  return app;
};
