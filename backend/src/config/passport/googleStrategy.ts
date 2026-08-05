import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../environments.js';
import { User } from '../../models/users/index.js';
import { logger } from '../winston.js';

export const registerGoogleStrategy = (): GoogleStrategy | null => {
    if (!config.oauth.google.clientId || !config.oauth.google.clientSecret) {
        logger.warn('Google OAuth credentials not provided. Skipping Google strategy initialization.');
        return null;
    }

    return new GoogleStrategy(
        {
            clientID: config.oauth.google.clientId,
            clientSecret: config.oauth.google.clientSecret,
            callbackURL: '/api/users/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error('No email address provided in Google profile'), false);
                }

                let user = await User.findOne({
                    $or: [{ googleId: profile.id }, { email: email.toLowerCase() }],
                });

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        user.isEmailVerified = true;
                        await user.save();
                    }
                    return done(null, user);
                }

                user = await User.create({
                    name: profile.displayName || 'Google User',
                    email: email.toLowerCase(),
                    googleId: profile.id,
                    isEmailVerified: true,
                });

                return done(null, user);
            } catch (error) {
                return done(error as Error, false);
            }
        }
    );
};