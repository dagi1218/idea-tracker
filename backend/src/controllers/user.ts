import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users/index.js';
import { APIError } from '../errors/APIError.js';
import { generateToken } from '../utils/index.js';
import { IUserDocument } from '../models/users/schema.js';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new APIError({
                message: 'User with this email already exists',
                status: 400,
                isPublic: true,
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
        });

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user as IUserDocument;

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: user.toJSON(),
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user as IUserDocument;
    res.status(200).json({ user: user.toJSON() });
};

export const getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ count: users.length, users });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new APIError({
                message: 'User not found',
                status: 404,
                isPublic: true,
            });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};