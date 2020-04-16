// Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

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
    <div>
      <h2 className="fancy">Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" maxLength="11" name="name" onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}

