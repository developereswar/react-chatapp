import React from 'react';

import './App.css';
// import Header from './components/Header' 
import Sidebar from './components/Sidebar'
import MessageList from './components/MessageList'
// import { Provider } from 'react-redux'
// import { store } from "./store";

function App() {
	

  return (

    <div className="chatAppWrapper">
    	
		<Sidebar/>
        <MessageList />
    </div>
  
  );
}

export default App;
