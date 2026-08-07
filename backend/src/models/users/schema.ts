import { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { MODEL_NAMES, ROLES, Role } from '../../utils/constants.js';

export interface IUser {
    name: string;
    email: string;
    password?: string;
    role: Role;
    isEmailVerified: boolean;
    googleId?: string;
    facebookId?: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IUserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
    toJSON(options?: any): Omit<IUser, 'password'>;
}


export interface IUserDocument extends IUser, IUserMethods, Document {
    toJSON(options?: any): Omit<IUser, 'password'>;
}


export interface IUserModel extends Model<IUserDocument> {
    findByEmail(email: string): Promise<IUserDocument | null>;
}


export const userSchema = new Schema<IUserDocument, IUserModel>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {

            type: String,
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false,

        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        facebookId: {
            type: String,
            sparse: true,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});