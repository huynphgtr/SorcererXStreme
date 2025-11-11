import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getNumerology } from '../controllers/numerology.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', getNumerology);

export default router;
