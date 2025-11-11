import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getFortune } from '../controllers/fortune.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', getFortune);

export default router;
