import { Schema } from 'mongoose';
import { IUserDocument, IUserModel } from './schema.js';

export const registerUserStatics = (userSchema: Schema<IUserDocument, IUserModel>): void => {
    // Normalizes lookups by lowercase email
    userSchema.statics.findByEmail = function (
        email: string
    ): Promise<IUserDocument | null> {
        return this.findOne({ email: email.toLowerCase().trim() });
    };
};