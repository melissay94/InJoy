// Packages
import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Slide from '@material-ui/core/Slide';
import { useApolloClient } from '@apollo/react-hooks';
import useRedirect from '../../hooks/useRedirect';
import useSignup from '../../hooks/useSignup';


export default function Signup({ isLoggedIn }) {
  const client = useApolloClient();
  // Moved all form logic to a hook to help with file sizes and seperation of concerns
  const history = useHistory();
  const signupHook = useSignup(client);

  // Need to pass in should redirect instead of figuring it out in the hook because should redirect is different for if they're trying to access a page when they are logged in or not.
  const shouldRedirect = !isLoggedIn ? false : true;
  useRedirect(shouldRedirect, isLoggedIn, useHistory());

  useEffect(() => {
    if (signupHook.data) {
      history.push('/onboard');
    }
  }, [signupHook.data, history]);

  if (signupHook.loading) return <div>Loading...</div>
  
  return (
    <div>
        <h2 className="fancy">Join InJoy</h2>
        <form onSubmit={signupHook.handleSubmit}>
            {signupHook.message}
            <TextField 
              label="Name"
              type="text"
              name="name"
              value={signupHook.name}
              onChange={signupHook.handleNameChange} />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={signupHook.email}
              onChange={signupHook.handleEmailChange}
              required />
            <TextField
              label="Username"
              type="text"
              name="username"
              value={signupHook.username}
              onChange={signupHook.handleUsernameChange}
              required />
            <TextField
              label="Password"
              type="password"
              name="password" 
              value={signupHook.password}
              helperText='Passwords must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number. Must also be at least 12 characters long.'
              onChange={signupHook.handlePasswordChange}
              required
               />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirm-password"
              value={signupHook.confirmPassword}
              onChange={signupHook.handleConfirmPasswordChange}
              required />
            <Button type="submit">Sign Up</Button>
            <p>By signing up, you agree to our <Link to="/terms">Terms, Data Policy, and Cookies Policy</Link></p>
        </form>
    </div>
  );
}
