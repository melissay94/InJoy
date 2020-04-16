import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './wrappers/Header';
import Content from './content/Content';

function App() {
  // const [user, updateUser] = useState(null);

  let [user, updateUser] = useState({
    id: 1,
    name: "Erik",
    email: "erik@test.com",
    password: "password"
  })

  return (
   <Router>
      <div class="wrapper"> 
        <Header user={user} />
        <main>
          <Content user={user} updateUser={updateUser} />
        </main>
      </div>
    </Router>
  );
}

export default App;
