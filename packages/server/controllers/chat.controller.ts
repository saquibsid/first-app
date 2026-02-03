import z from 'zod';
import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
const chatRequestSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long max 1000 characters'),
   conversationId: z.string().uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatRequestSchema.safeParse(req.body);
      if (!parseResult.success) {
         return res.status(400).json({ error: parseResult.error.format() });
      }
      try {
         const { prompt, conversationId } = req.body;

         const response = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate response' });
      }
   },
};
