// Packages
import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  useEffect(() => {
    setMessage('')
  }, [email, password]);

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault();
    // props.setUser(whatever the user is)
  }
  
  if (props.user) {
    return <Redirect to='/prompts' />
  }

  return (
    <Slide direction="up" mountOnEnter unmountOnExit in="true">
    <div>
      <h2 className="fancy">Sign in</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
            <TextField type="email" name="email" label="Email" onChange={e => setEmail(e.target.value)} />
            <TextField type="password" name="password" label="Password" onChange={e => setPassword(e.target.value)} />
          <Button type="submit">Sign in</Button>
        </form>
        <p>
            Not a user? <Link to='/signup'>Sign up here</Link>
        </p>
    </div>
    </Slide>
  )
}

export default Login
