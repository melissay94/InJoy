// Packages
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import useUser from '../../hooks/useUser';

export default function Signup({user, setUser}) {

  const sendNewUser = () => {
    axios.post("http://localhost:4000/user/signup", inputs)
      .then(response => {
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage(null);
          setUser(response.data);
        }
      }).catch(err => {
        setMessage("Error, something has gone wrong creating a user!");
        console.log(err);
      });
  }

  // Destructure hook here
  const { handleInputChange, handleSubmit, inputs } = useUser(sendNewUser);
  // Declare and initialize state variables
  let [message, setMessage] = useState(null);

  if (user) {
    return (<Redirect to="/profile" />);
  }

  return (
    <Slide direction="up" mountOnEnter unmountOnExit in="true">
        <div>
        <h2 className="fancy">Sign up</h2>
        <span className="red">{message}</span>
        <form onSubmit={handleSubmit}>
            <TextField label="Name" type="text"  name="name"onChange={handleInputChange} value={inputs.name} />
            <TextField label="Email" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
            <TextField label="Password" type="password" name="password"  onChange={handleInputChange} value={inputs.password} required />
            <Button type="submit">Join now!</Button>
        </form>
        </div>
    </Slide>
  )
}
