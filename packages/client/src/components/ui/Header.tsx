import { Link } from 'react-router';

const Header = () => {
   return (
      <div className="flex bg-gray-800 text-white p-4 w-full justify-between">
         <h1 className="text-2xl font-bold">AI Chatbot</h1>
         <nav>
            <ul className="flex space-x-4 mt-2">
               <li>
                  <Link to="/" className="hover:underline">
                     Knowledge Base Chatbot
                  </Link>
               </li>
               <li>
                  <Link to="/reviews" className="hover:underline">
                     Product Review Summarizer
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Header;
