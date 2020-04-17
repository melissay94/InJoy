// Packages
import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import useUser from '../../hooks/useUser';

export default function Login ({user, setCurrentUser}) {

  const sendUser = () => {
    axios.post("http://localhost:4000/user/login", {email: inputs.email, password: inputs.password })
      .then(response => {
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage(null);
          setCurrentUser(response.data);
        }
      }).catch(err => {
        setMessage("Error, something has gone wrong creating a user!");
        console.log(err);
      });
  }

  const { handleInputChange, handleSubmit, inputs } = useUser(sendUser);
  // Declare and initialize state variables
  let [message, setMessage] = useState('');
  
  if (user) {
    return <Redirect to='/prompts' />
  }

  return (
    <div>
      <h2 className="fancy">Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleInputChange} value={inputs.email} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handleInputChange} value={inputs.password} />
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p>
            Not a user? <Link to='/signup'>Sign up here</Link>
        </p>
    </div>
  )
}
