import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CloudinaryContext } from 'cloudinary-react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


import Header from './wrappers/Header';
import Content from './content/Content';
import Footer from './wrappers/Footer';


const GET_IS_LOGGEDIN = gql`{
  isLoggedIn @client
}`;

function App() {
  const { data } = useQuery(GET_IS_LOGGEDIN)

  return (
   <Router>
     <CloudinaryContext cloudname={process.env.REACT_APP_CLOUD_NAME}>
        <div className="wrapper"> 
          <Header isLoggedIn={ data ? data.isLoggedIn : "" } />
          <main>
            <div className="content-container">
              <Content isLoggedIn={ data ? data.isLoggedIn : "" } />
            </div>
          </main>
          <Footer />
        </div>
      </CloudinaryContext>
    </Router>
  );
}

export default App;
