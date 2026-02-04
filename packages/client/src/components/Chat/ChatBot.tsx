import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import type { Messages } from './ChatMessages';
import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Messages[]>([]);
   const [typing, setTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setTyping(true);
         setError(null);
         setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { role: 'bot', content: data.message },
         ]);
      } catch (error) {
         console.log(error);
         setError('Something went wrong. Please try again.');
      } finally {
         setTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-3 overflow-y-auto">
            <ChatMessages messages={messages} />
            {typing && <TypingIndicator />}
            {error && <div className="text-red-500">{error}</div>}
         </div>
         <ChatInput onChatFormSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
