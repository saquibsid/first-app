import { BrowserRouter, Route, Routes } from 'react-router';
import ChatBot from './components/Chat/ChatBot';
import { ReviewList } from './components/review/ReviewList';
import Header from './components/ui/Header';

function App() {
   return (
      <BrowserRouter>
         <div className="flex flex-col h-screen w-full">
            <Header />
            <div className="p-4 h-screen w-full">
               <Routes>
                  <Route path="/" element={<ChatBot />} />
                  <Route
                     path="/reviews"
                     element={<ReviewList productId={2} />}
                  />
               </Routes>
            </div>
         </div>
      </BrowserRouter>
   );
}

export default App;
