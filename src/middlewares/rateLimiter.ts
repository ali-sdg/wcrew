import rateLimit from 'express-rate-limit';
import RateLimitRedisStore from 'rate-limit-redis';

import Redis from 'ioredis';

const redisClient = new Redis();

export const rateLimiter = rateLimit({
  store: new RateLimitRedisStore({
    sendCommand: (...args: (string | number)[]) => {
      return redisClient.call(...(args as [string, ...Array<string | number>])) as Promise<any>;
    },
  }),
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests. Please try again later.',
});
