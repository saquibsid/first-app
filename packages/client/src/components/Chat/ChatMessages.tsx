import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Messages = {
   role: 'user' | 'bot';
   content: string;
};

type Props = {
   messages: Messages[];
};
const ChatMessages = ({ messages }: Props) => {
   // to auto scroll down
   const lastMessageRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      if (lastMessageRef.current) {
         lastMessageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
         });
      }
   }, [messages]);

   const onCopyContent = (e: React.ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
   return (
      <div className="flex flex-col gap-3">
         {messages.map((msg, index) => (
            <div
               key={index}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               onCopy={onCopyContent}
               className={`px-2 py-3 rounded-2xl
                        ${msg.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black'}`}
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
