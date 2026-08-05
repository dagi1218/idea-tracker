import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from '../environments.js';
import { User } from '../../models/users/index.js';
import { logger } from '../winston.js';

export const registerFacebookStrategy = (): FacebookStrategy | null => {
    if (!config.oauth.facebook.appId || !config.oauth.facebook.appSecret) {
        logger.warn('Facebook OAuth credentials not provided. Skipping Facebook strategy initialization.');
        return null;
    }

    return new FacebookStrategy(
        {
            clientID: config.oauth.facebook.appId,
            clientSecret: config.oauth.facebook.appSecret,
            callbackURL: '/api/users/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'emails'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const facebookId = profile.id;

                let user = await User.findOne({
                    $or: [
                        { facebookId },
                        ...(email ? [{ email: email.toLowerCase() }] : []),
                    ],
                });

                if (user) {
                    if (!user.facebookId) {
                        user.facebookId = facebookId;
                        await user.save();
                    }
                    return done(null, user);
                }

                user = await User.create({
                    name: profile.displayName || 'Facebook User',
                    email: email ? email.toLowerCase() : `${facebookId}@facebook.user`,
                    facebookId,
                    isEmailVerified: true,
                });

                return done(null, user);
            } catch (error) {
                return done(error as Error, false);
            }
        }
    );
};