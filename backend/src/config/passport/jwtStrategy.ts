import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from '../environments.js';
import { User } from '../../models/users/index.js';
import { Request } from 'express';


const cookieExtractor = (req: Request): string | null => {
    if (req && req.cookies) {
        return req.cookies['token'] || null;

    }
    return null;
}

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
    ]),
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