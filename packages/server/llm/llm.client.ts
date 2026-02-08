import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';

const client = new OpenAI({
   apiKey: process.env.OPEN_AI_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

type llmInputType = {
   model?: string;
   prompt: string;
   instructions?: string;
   temperature?: number;
   maxOutputTokens?: number;
   previousResponseId?: string;
};

export type llmResponseType = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateResponse({
      model = 'gpt-4o-mini',
      instructions,
      prompt,
      temperature = 0.2,
      maxOutputTokens = 100,
      previousResponseId,
   }: llmInputType): Promise<llmResponseType> {
      const response = await client.responses.create({
         model,
         instructions,
         input: prompt,
         temperature,
         max_output_tokens: maxOutputTokens,
         previous_response_id: previousResponseId,
      });
      return {
         id: response.id,
         text: response.output_text,
      };
   },

   async summarizeReviews(reviews: string) {
      const chatCompletion = await inferenceClient.chatCompletion({
         model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
         messages: [
            {
               role: 'system',
               content:
                  'You are a helpful assistant that summarizes product reviews into concise summaries that capture the main sentiments and points mentioned in the reviews.',
            },
            {
               role: 'user',
               content: reviews,
            },
         ],
      });
      return chatCompletion.choices[0]?.message?.content || '';
   },
};
