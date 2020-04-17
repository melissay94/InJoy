import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Header from './wrappers/Header';
import Content from './content/Content';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
   <Router>
      <div className="wrapper"> 
        <Header user={currentUser} setCurrentUser={setCurrentUser} />
        <main>
          <Content user={currentUser} setCurrentUser={setCurrentUser} />
        </main>
      </div>
    </Router>
  );
}

export default App;
