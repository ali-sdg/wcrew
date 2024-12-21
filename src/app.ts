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

  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
  app.use(rateLimiter);

  app.use('/auth', authRoutes);
  app.use(requestLogger);



  return app;
};
