// Packages
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Slide from '@material-ui/core/Slide';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SIGNUP_USER = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
        token
    }
  }
`;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const client = useApolloClient();
  const [signup, { data, loading, error }]  = useMutation(SIGNUP_USER, {
    onCompleted({ signup }) {
      localStorage.setItem('token', signup.token);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      if (password != confirmPassword) {
          setMessage('Your passwords do not match.');
          return;
      }

      signup({ variables: { email, password, name }})
  };

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  if (data) return (<Redirect to="/" />)
  
  return (
    <div>
        <h2 className="fancy">Join InJoy</h2>
        <form onSubmit={handleSubmit}>
            {message}
            <TextField label="Name" type="text"  name="name"onChange={e => setName(e.target.value)} required />
            <TextField label="Email" type="email" name="email" onChange={e => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" name="password"  onChange={e => setPassword(e.target.value)} required />
            <TextField label="Confirm Password" type="password" name="confirm-password"  onChange={e => setConfirmPassword(e.target.value)} required />
            <Button type="submit">Sign Up</Button>
            <p>By signing up, you agree to our <Link to="/terms">Terms, Data Policy, and Cookies Policy</Link></p>
        </form>
    </div>
  )
}
