import passport from 'passport';
import { localStrategy } from './localStrategy.js';
import { jwtStrategy } from './jwtStrategy.js';
import { registerGoogleStrategy } from './googleStrategy.js';
import { registerFacebookStrategy } from './facebookStrategy.js';

export const configurePassport = (): void => {
    passport.use('local', localStrategy);
    passport.use('jwt', jwtStrategy);

    const googleStrat = registerGoogleStrategy();
    if (googleStrat) {
        passport.use('google', googleStrat);
    }

    const facebookStrat = registerFacebookStrategy();
    if (facebookStrat) {
        passport.use('facebook', facebookStrat);
    }
};

export default passport;