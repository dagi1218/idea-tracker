import { body, param } from 'express-validator';
import { validateRequest } from './error.parser.js';

export const validateIdeaCreate = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ min: 3, max: 150 })
        .withMessage('Title must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array of strings'),
    body('tags.*')
        .optional()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Tag items cannot be empty strings'),
    validateRequest,
];

export const validateIdeaUpdate = [
    param('id').isMongoId().withMessage('Invalid Idea ID format'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be an empty string')
        .isLength({ min: 3, max: 150 })
        .withMessage('Title must be between 3 and 150 characters'),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description cannot be an empty string')
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array of strings'),
    validateRequest,
];

export const validateIdeaIdParam = [
    param('id').isMongoId().withMessage('Invalid Idea ID format'),
    validateRequest,
];