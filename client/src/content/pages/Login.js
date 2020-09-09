// Packages
import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import useUser from '../../hooks/useUser';

export default function Login ({user, setUser}) {

  const sendUser = () => {
    axios.post("http://localhost:4000/user/login", {email: inputs.email, password: inputs.password })
      .then(response => {
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage(null);
          setUser(response.data);
        }
      }).catch(err => {
        setMessage("Error, something has gone wrong logging you in!");
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
      <div className="login-banner">
            <h1>Spark your quarantine days with joy.</h1>
            <p>Try something new during quarantine!</p>
      </div>
    {/* <Slide direction="up" mountOnEnter unmountOnExit in={true}> */}
      <h2 className="fancy">Sign in</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
            <TextField type="email" name="email" label="Email"onChange={handleInputChange} value={inputs.email} />
            <TextField type="password" name="password" label="Password" onChange={handleInputChange} value={inputs.password} />
          <Button type="submit">Sign in</Button>
        </form>
        <p>
            Not a user? <Link to='/signup'>Sign up here</Link>
        </p>
        {/* </Slide> */}
    </div>
  )
}
