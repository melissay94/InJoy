import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CloudinaryContext } from 'cloudinary-react';
import './App.css';

import Header from './wrappers/Header';
import Content from './content/Content';

function App() {
  const [user, setUser] = useState(null);

  return (
   <Router>
     <CloudinaryContext cloudname={process.env.REACT_APP_CLOUD_NAME}>
        <div className="wrapper"> 
          <Header user={user} setUser={setUser} />
          <main>
            <Content user={user} setUser={setUser} />
          </main>
        </div>
      </CloudinaryContext>
    </Router>
  );
}

export default App;
