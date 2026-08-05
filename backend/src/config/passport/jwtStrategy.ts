import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from '../environments.js';
import { User } from '../../models/users/index.js';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
};

export const jwtStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.id);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});