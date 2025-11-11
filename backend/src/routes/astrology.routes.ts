import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getAstrology } from '../controllers/astrology.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', getAstrology);

export default router;
