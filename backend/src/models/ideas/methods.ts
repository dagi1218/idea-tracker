import { Schema, Types } from 'mongoose';
import { IIdeaDocument, IIdeaModel } from './schema.js';


export const registerIdeaMethods = (
    ideaSchema: Schema<IIdeaDocument, IIdeaModel>
): void => {

    ideaSchema.methods.isOwnedBy = function (
        userId: string | Types.ObjectId
    ): boolean {
        return this.owner.toString() === userId.toString();
    };
};