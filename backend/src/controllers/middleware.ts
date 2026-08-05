import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport/index.js';
import { APIError } from '../errors/APIError.js';
import { IUserDocument } from '../models/users/schema.js';
import { Role } from '../utils/constants.js';