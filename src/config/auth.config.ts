import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { config } from './index'; 

type VerifyCallback = (error: any, user?: any, info?: any) => void;

type User = {
  accessToken: string;
  refreshToken: string;
  profile: any;
};

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://www.meta.com/oauth/authorize',
      tokenURL: 'https://www.meta.com/oauth/token',
      clientID: config.META_CLIENT_ID,
      clientSecret: config.META_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/meta/callback',
    },
    
    (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      done(null, { accessToken, refreshToken, profile });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User | null, done) => {
  done(null, user);
});
