import { Router } from 'express';
import {
    register,
    login,
    getProfile,
    getAllUsers,
    deleteUser,
} from '../controllers/user.js';
import { validateRegister, validateLogin } from '../validators/user.validator.js';
import { authenticateJwt, authenticateLocal, authorizeRoles } from '../controllers/middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

// Public Authentication
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, authenticateLocal, login);

// Protected User Profile
router.get('/profile', authenticateJwt, getProfile);

// Admin-Only Routes
router.get('/', authenticateJwt, authorizeRoles(ROLES.ADMIN), getAllUsers);
router.delete('/:id', authenticateJwt, authorizeRoles(ROLES.ADMIN), deleteUser);

export default router

