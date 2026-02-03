import express from 'express';
import OpenAI from 'openai';
import z from 'zod';
const app = express();
app.use(express.json());

const client = new OpenAI({
   apiKey: process.env.OPEN_AI_KEY,
});
app.get('/api/hello', (req, res) => {
   res.json({ message: 'Hello, World!' });
});

const chatRequestSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long max 1000 characters'),
   conversationId: z.string().uuid(),
});

const conversations = new Map<string, string>();
app.post('/api/chat', async (req, res) => {
   const parseResult = chatRequestSchema.safeParse(req.body);
   if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.format() });
   }
   const { prompt, conversationId } = req.body;
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversations.get(conversationId) || undefined,
   });
   conversations.set(conversationId, response.id);
   res.json({ result: response.output_text });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
