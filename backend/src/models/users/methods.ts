import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import { IUserDocument, IUserModel } from './schema.js';

export const registerUserMethods = (userSchema: Schema<IUserDocument, IUserModel>): void => {
    // Compares a plaintext candidate password against the hashed password
    userSchema.methods.comparePassword = async function (
        candidatePassword: string
    ): Promise<boolean> {
        if (!this.password) {
            return false;
        }
        return await bcrypt.compare(candidatePassword, this.password);
    };

    // Custom JSON transformation to sanitize outgoing user objects
    userSchema.methods.toJSON = function (): Record<string, unknown> {
        const userObject = this.toObject();
        delete userObject.password;
        delete userObject.__v;
        return userObject;
    };
};