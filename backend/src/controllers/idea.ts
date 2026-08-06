import { Request, Response, NextFunction } from 'express';
import { Idea } from '../models/ideas/index.js';
import { APIError } from '../errors/APIError.js';
import { IUserDocument } from '../models/users/schema.js';
import { ROLES } from '../utils/constants.js';

export const createIdea = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user as IUserDocument;
        const { title, description, tags } = req.body;

        const idea = await Idea.create({
            title,
            description,
            tags: tags || [],
            owner: user._id,
        });

        res.status(201).json({
            message: 'Idea created successfully',
            idea,
        });
    } catch (error) {
        next(error);
    }
};

export const getIdeas = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user as IUserDocument;

        // Admins retrieve all ideas; normal users access only their owned ideas
        const query = user.role === ROLES.ADMIN ? {} : { owner: user._id };
        const ideas = await Idea.find(query)
            .sort({ createdAt: -1 })
            .populate('owner', 'name email role');

        res.status(200).json({ count: ideas.length, ideas });
    } catch (error) {
        next(error);
    }
};

export const getIdeaById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user as IUserDocument;
        const { id } = req.params;

        const idea = await Idea.findById(id).populate('owner', 'name email role');
        if (!idea) {
            throw new APIError({
                message: 'Idea not found',
                status: 404,
                isPublic: true,
            });
        }


        if (user.role !== ROLES.ADMIN && !idea.isOwnedBy(user._id.toString())) {
            throw new APIError({
                message: 'Forbidden: You do not have access to this idea',
                status: 403,
                isPublic: true,
            });
        }

        res.status(200).json({ idea });
    } catch (error) {
        next(error);
    }
};

export const updateIdea = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user as IUserDocument;
        const { id } = req.params;

        const idea = await Idea.findById(id);
        if (!idea) {
            throw new APIError({
                message: 'Idea not found',
                status: 404,
                isPublic: true,
            });
        }


        if (user.role !== ROLES.ADMIN && !idea.isOwnedBy(user._id.toString())) {
            throw new APIError({
                message: 'Forbidden: You cannot modify ideas created by other users',
                status: 403,
                isPublic: true,
            });
        }

        const { title, description, tags } = req.body;
        if (title !== undefined) idea.title = title;
        if (description !== undefined) idea.description = description;
        if (tags !== undefined) idea.tags = tags;

        await idea.save();

        res.status(200).json({
            message: 'Idea updated successfully',
            idea,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteIdea = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user as IUserDocument;
        const { id } = req.params;

        const idea = await Idea.findById(id);
        if (!idea) {
            throw new APIError({
                message: 'Idea not found',
                status: 404,
                isPublic: true,
            });
        }



        if (user.role !== ROLES.ADMIN && !idea.isOwnedBy(user._id.toString())) {
            throw new APIError({
                message: 'Forbidden: You cannot delete ideas created by other users',
                status: 403,
                isPublic: true,
            });
        }

        await idea.deleteOne();

        res.status(200).json({ message: 'Idea deleted successfully' });
    } catch (error) {
        next(error);
    }
};