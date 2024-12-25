import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/meta',
  passport.authenticate('oauth2', {
    scope: ['public_profile', 'email'],
  })
);

router.get(
  '/meta/callback',
  passport.authenticate('oauth2', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.json({ message: 'Authentication successful', user: req.user });
  }
);

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Authentication failed' });
});

export default router;
