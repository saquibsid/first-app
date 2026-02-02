import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return (
      <div className="pl-4">
         <p className="font-bold">{message}</p>
         <Button>Click Me!</Button>
      </div>
   );
}

export default App;
