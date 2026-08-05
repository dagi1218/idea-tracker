import { body } from 'express-validator';
import { validateRequest } from './error.parser.js';

export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    validateRequest,
];


export const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
];