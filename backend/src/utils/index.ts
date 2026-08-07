import jwt from 'jsonwebtoken';
import { config } from '../config/environments.js';
import { Role } from './constants.js';

export interface TokenPayload {
  id: string;
  email: string;
  role: Role;
}


export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
  });
};


export const refreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.refresh.secret, { expiresIn: config.refresh.expiresIn as jwt.SignOptions['expiresIn'] });
}


export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwt.secret) as TokenPayload
}