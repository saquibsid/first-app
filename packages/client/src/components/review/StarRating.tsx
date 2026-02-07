import { FaStar } from 'react-icons/fa';

type props = {
   value: number; // rating value from 0 to 5
};

export const StarRating = ({ value }: props) => {
   const placeholder = [1, 2, 3, 4, 5];
   return (
      <div className="flex gap-1">
         {placeholder.map((_, i) => (
            <FaStar
               className={`${i < value ? 'text-yellow-400' : 'text-gray-300'}`}
            />
         ))}
      </div>
   );
};
