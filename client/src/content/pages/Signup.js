// Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';


export default function Signup(props) {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [name, setName] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  useEffect(()=> {
    setMessage("");
  }, [email, name, password])

  const handleSubmit = e => {
    e.preventDefault();
    // add user to json file
    // props.setUser( whatever the user is)
  }

  if (props.user) {
    return (<Redirect to="/profile" />);
  }

  return (
    <Slide direction="up" mountOnEnter unmountOnExit in="true">
        <div>
        <h2 className="fancy">Sign up</h2>
        <span className="red">{message}</span>
        <form onSubmit={handleSubmit}>
            <TextField label="Name" type="text"  name="name" onChange={e => setName(e.target.value)} />
            <TextField label="Email" type="email" name="email" onChange={e => setEmail(e.target.value)} />
            <TextField label="Password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
            <Button type="submit">Join now!</Button>
        </form>
        </div>
    </Slide>
  )
}

