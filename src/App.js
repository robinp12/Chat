import { useState } from 'react';
import './App.css';
import ChatPage from './ChatPage';

function App() {
  const [click, setClick] = useState(false);

  return (
    <div className="App">
      <div className="App-header">
       <ChatPage click={click} setClick={setClick}/>
      </div>
    </div>
  );
}

export default App;
