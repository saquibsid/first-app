import express, { Request, Response } from 'express';
import { chatController } from '../controllers/chat.controller';
import { PrismaClient } from '../generated/prisma/client';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello, World!' });
});

router.post('/api/chat', async (req, res) => {
   chatController.sendMessage(req, res);
});

router.get('/api/product/:id/reviews', async (req, res) => {
   console.log('DATABASE_URL:', process.env.DATABASE_URL);
   const prisma = new PrismaClient();
   const productId = Number(req.params.id);
   if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
   }
   const reviews = await prisma.review.findMany({
      where: {
         productId: productId,
      },
   });
   res.json(reviews);
});

export default router;
