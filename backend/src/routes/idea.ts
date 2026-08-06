import { Router } from 'express';
import {
    createIdea,
    getIdeas,
    getIdeaById,
    updateIdea,
    deleteIdea,
} from '../controllers/idea.js';
import {
    validateIdeaCreate,
    validateIdeaUpdate,
    validateIdeaIdParam,
} from '../validators/idea.validator.js';
import { authenticateJwt } from '../controllers/middleware.js';

const router = Router();


router.use(authenticateJwt);

router.route('/')
    .post(validateIdeaCreate, createIdea)
    .get(getIdeas);

router.route('/:id')
    .get(validateIdeaIdParam, getIdeaById)
    .put(validateIdeaUpdate, updateIdea)
    .delete(validateIdeaIdParam, deleteIdea);

export default router;