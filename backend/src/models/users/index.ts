import mongoose from 'mongoose';
import { userSchema, IUserDocument, IUserModel } from './schema.js';
import { registerUserMethods } from './methods.js';
import { registerUserStatics } from './statics.js';
import { MODEL_NAMES } from '../../utils/constants.js';

registerUserMethods(userSchema);
registerUserStatics(userSchema);

export const User = mongoose.model<IUserDocument, IUserModel>(
    MODEL_NAMES.USER,
    userSchema
);

export * from './schema.js';