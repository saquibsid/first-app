import fs from 'fs';
import path from 'path';
import { llmClient } from '../llm/llm.client';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';

const parkInfo = fs.readFileSync(
   path.join(__dirname, '../prompts/chatbot.txt'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

interface ChatResponse {
   id: string;
   message: string;
}

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await llmClient.generateResponse({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.2,
         maxOutputTokens: 100,
         previousResponseId:
            conversationRepository.getLastResponseId(conversationId),
      });
      conversationRepository.setLastResponseId(conversationId, response.id);
      return {
         id: response.id,
         message: response.text,
      };
   },
};
