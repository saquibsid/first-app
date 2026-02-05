import express, { Request, Response } from 'express';
import { chatController } from '../controllers/chat.controller';
import { reviewController } from '../controllers/review.controller';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello, World!' });
});

router.post('/api/chat', async (req, res) => {
   chatController.sendMessage(req, res);
});

router.get('/api/product/:id/reviews', async (req, res) => {
   reviewController.getReviews(req, res);
});

export default router;
