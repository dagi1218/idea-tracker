import { Schema, Types } from 'mongoose';
import { IIdeaDocument, IIdeaModel } from './schema.js';

export const registerIdeaStatics = (
    ideaSchema: Schema<IIdeaDocument, IIdeaModel>
): void => {

    ideaSchema.statics.findByOwner = function (
        ownerId: string | Types.ObjectId
    ): Promise<IIdeaDocument[]> {
        return this.find({ owner: ownerId }).sort({ createdAt: -1 });
    };
};