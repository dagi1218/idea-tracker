import mongoose from 'mongoose';
import { ideaSchema, IIdeaDocument, IIdeaModel } from './schema.js';
import { registerIdeaMethods } from './methods.js';
import { registerIdeaStatics } from './statics.js';
import { MODEL_NAMES } from '../../utils/constants.js';


registerIdeaMethods(ideaSchema);
registerIdeaStatics(ideaSchema);

export const Idea = mongoose.model<IIdeaDocument, IIdeaModel>(
    MODEL_NAMES.IDEA,
    ideaSchema
);

export * from './schema.js';