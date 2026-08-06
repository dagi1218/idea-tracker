import { Router } from 'express';
import testRouter from '../routes/test.js';
import userRouter from '../routes/user.js';
import ideaRouter from '../routes/idea.js';

const router = Router();

router.use('/test', testRouter);
router.use('/users', userRouter);
router.use('/ideas', ideaRouter);

export default router;