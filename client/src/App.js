import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Header from './wrappers/Header';
import Content from './content/Content';

function App() {
  const [user, setUser] = useState(null);

  return (
   <Router>
      <div className="wrapper"> 
        <Header user={user} setUser={setUser} />
        <main>
          <Content user={user} setUser={setUser} />
        </main>
      </div>
    </Router>
  );
}

export default App;
