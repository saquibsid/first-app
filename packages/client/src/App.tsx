import ChatBot from './components/Chat/ChatBot';
import Header from './components/ui/Header';

function App() {
   return (
      <div className="flex flex-col h-screen w-full">
         <Header />
         <div className="p-4 h-screen w-full">
            <ChatBot />
         </div>
      </div>
   );
}

export default App;
