import OpenAI from 'openai';

const client = new OpenAI({
   apiKey: process.env.OPEN_AI_KEY,
});

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
};
