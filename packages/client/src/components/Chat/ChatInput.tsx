import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { FaArrowUp } from 'react-icons/fa';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onChatFormSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onChatFormSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const chatSubmitHandler = (data: ChatFormData) => {
      reset({
         prompt: '',
      });
      onChatFormSubmit(data);
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(chatSubmitHandler)();
      }
   };

   return (
      <form
         onSubmit={handleSubmit(chatSubmitHandler)}
         onKeyDown={onKeyDown}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (value) => value.trim().length > 0,
            })}
            autoFocus
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask anything"
            maxLength={1000}
         ></textarea>
         <Button
            type="submit"
            disabled={!formState.isValid}
            className="rounded-full w-9 h-9"
         >
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
