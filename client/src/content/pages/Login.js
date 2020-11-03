// Packages
import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Slide from '@material-ui/core/Slide';
import gql from 'graphql-tag';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;  

export default function Login ({ isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const client = useApolloClient();

  const [login, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      client.writeData({ data: { isLoggedIn: true }})
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email, password }});
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  if (data) return <Redirect to="/prompts" />


  return (
    <div className="login-container">
      <div className="login-image desktop">
        <img src="./phone.png" alt="injoy on iPhone" />
      </div>
      <div className="login-container2">
      {/* <Slide direction="up" mountOnEnter unmountOnExit in={true}> */}
        <div className="well">
          <h2 className="fancy">InJoy</h2>
          <form onSubmit={handleSubmit}>
                <TextField type="email" name="email" label="Email"onChange={(e) => setEmail(e.target.value)} />
                <TextField type="password" name="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit">Sign in</Button>
            </form>
        </div>
        <div className="well">
          <p>
              Don't have an account? <Link to='/signup'>Sign up here</Link>
          </p>
        </div>
          {/* </Slide> */}
      </div>
    </div>
  )
}
