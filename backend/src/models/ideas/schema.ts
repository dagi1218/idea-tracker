import { Schema, Document, Model, Types } from 'mongoose';

import { MODEL_NAMES } from '../../utils/constants.js';

export interface IIdea {
    title: string;
    description: string;
    tags?: string[];
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IIdeaMethods {
    isOwnedBy(userId: string | Types.ObjectId): boolean;
}

export interface IIdeaDocument extends IIdea, IIdeaMethods, Document { }

export interface IIdeaModel extends Model<IIdeaDocument> {
    findByOwner(ownerId: string | Types.ObjectId): Promise<IIdeaDocument[]>;
}


export const ideaSchema = new Schema<IIdeaDocument, IIdeaModel>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long'],
            maxlength: [150, 'Title cannot exceed 150 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            minlength: [5, 'Description must be at least 5 characters long'],
        },
        tags: {
            type: [String],
            default: [],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: MODEL_NAMES.USER,
            required: [true, 'Idea owner reference is required'],
            index: true,
        },
    },
    {
        timestamps: true,
    }
);