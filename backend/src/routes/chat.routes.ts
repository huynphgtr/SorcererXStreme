import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { sendMessage, getChatHistory } from '../controllers/chat.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', sendMessage);
router.get('/history', getChatHistory);

export default router;
