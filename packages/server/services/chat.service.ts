import { llmClient } from '../llm/llm.client';
import { conversationRepository } from '../repositories/conversation.repository';

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
         prompt,
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
