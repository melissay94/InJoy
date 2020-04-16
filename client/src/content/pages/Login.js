// Packages
import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';

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
    <div>
      <h2 className="fancy">Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p>
            Not a user? <Link to='/signup'>Sign up here</Link>
        </p>
    </div>
  )
}

export default Login
