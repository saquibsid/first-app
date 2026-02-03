import express, { Request, Response } from 'express';
import { chatController } from '../controllers/chat.controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello, World!' });
});

router.post('/api/chat', async (req, res) => {
   chatController.sendMessage(req, res);
});

export default router;
