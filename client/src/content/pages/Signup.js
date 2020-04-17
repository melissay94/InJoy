// Packages
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import axios from 'axios';

export default function Signup({user, setCurrentUser}) {

  const sendNewUser = () => {
    axios.post("http://localhost:4000/user/signup", inputs)
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

  // Destructure hook here
  const { handleInputChange, handleSubmit, inputs } = useUser(sendNewUser);
  // Declare and initialize state variables
  let [message, setMessage] = useState(null);

  if (user) {
    return (<Redirect to="/profile" />);
  }

  return (
    <div>
      <h2 className="fancy">Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" maxLength="11" name="name" onChange={handleInputChange} value={inputs.name} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} value={inputs.password} required />
        </div>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}
