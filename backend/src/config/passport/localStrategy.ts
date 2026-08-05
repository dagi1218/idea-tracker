import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models/users/index.js';

export const localStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    async (email, password, done) => {
        try {

            const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
            if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);