// Packages
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import Slide from '@material-ui/core/Slide';
import useUser from '../../hooks/useUser';

export default function Signup({user, setUser}) {
   const [step, setStep] = useState("One");
   const [selected, setSelected] = useState([]);

    const handleSelect = (e, index) => {
        e.preventDefault();
        if (selected.includes(index)) {
            setSelected(selected.splice(index, 1));
        } else {
            setSelected([...selected, index])
        }
    }



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
    setStep("Two");
  }

  // Destructure hook here
  const { handleInputChange, handleSubmit, inputs } = useUser(sendNewUser);
  // Declare and initialize state variables
  let [message, setMessage] = useState(null);

//   if (user) {
//     return (<Redirect to="/profile" />);
//   }

  let content = "";

  if (step == "One") {
      content = (
        <div>
            <div className="steps">
                <div className="step highlight left"> 
                    <h4>Step 1:</h4>
                    <p>Set up a personal account</p>
                </div>
                <div className="step middle">
                    <h4>Step 2:</h4>
                    <p>Choose your preferences</p>
                </div>
                <div className="step right">
                    <h4>Step 3:</h4>
                    <p>Start InJoying!</p>
                </div>
            </div>
            <h3>Create your personal account</h3>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" type="text"  name="name"onChange={handleInputChange} value={inputs.name} />
                <TextField label="Email" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                <TextField label="Password" type="password" name="password"  onChange={handleInputChange} value={inputs.password} required />
                <Button type="submit">Continue</Button>
            </form>
        </div>
    )
  } else if (step == "Two") {
      content = (<div>
        <div className="steps">
            <div className="step left"> 
                <h4>Step 1:</h4>
                <p>Set up a personal account</p>
            </div>
            <div className="step highlight middle">
                <h4>Step 2:</h4>
                <p>Choose your preferences</p>
            </div>
            <div className="step right">
                <h4>Step 3:</h4>
                <p>Start InJoying!</p>
            </div>
        </div>
        <h3>Set your preferences</h3>
        <p className="signup-info">
            Choose some activities you didn't have time to try before quarantine.
        </p>
        <div className="signup-options">
            <ListItem button selected={selected.includes(0)} onClick={(e)=>{handleSelect(e, 0)}} className="signup-option button-div">Arts & Crafts</ListItem>
            <ListItem button selected={selected.includes(1)} onClick={(e)=>{handleSelect(e, 1)}} className="signup-option button-div">Writing Prompts</ListItem>
            <ListItem button selected={selected.includes(2)} onClick={(e)=>{handleSelect(e, 2)}} className="signup-option button-div">Physical Activity</ListItem>
            <ListItem button selected={selected.includes(3)} onClick={(e)=>{handleSelect(e, 3)}} className="signup-option button-div">Cooking</ListItem>
            <ListItem button selected={selected.includes(4)} onClick={(e)=>{handleSelect(e, 4)}} className="signup-option button-div">Learn a New Skill</ListItem>
            <ListItem button selected={selected.includes(5)} onClick={(e)=>{handleSelect(e, 5)}} className="signup-option button-div">Home Improvement</ListItem>
            <ListItem button selected={selected.includes(6)} onClick={(e)=>{handleSelect(e, 6)}} className="signup-option button-div">Outdoors</ListItem>
        </div>
        <br />
        <Button onClick={()=>{setStep("One")}}>Back</Button>
        <Button onClick={() => {setStep("Three")}} type="submit">Continue</Button>
    </div>)
  } else if (step == "Three") {
      content = (
    <div>
    <div className="steps">
        <div className="step left"> 
            <h4>Step 1:</h4>
            <p>Set up a personal account</p>
        </div>
        <div className="step middle">
            <h4>Step 2:</h4>
            <p>Choose your preferences</p>
        </div>
        <div className="step highlight right">
            <h4>Step 3:</h4>
            <p>Start InJoying!</p>
        </div>
    </div>
    <h3>You're all set!</h3>
    <div className="allset">
        <div className="allset-img">
        </div>
        <div className="button-div allset-button">
            <Link className="App-link button-div green greener" to='/prompts'>Find out your first topic!</Link>
        </div>
    </div>
</div>)
  }

  return (
    <Slide direction="up" mountOnEnter unmountOnExit in="true">
        <div>
        <h2 className="fancy">Join InJoy</h2>
        <span className="red">{message}</span>
        {content}
        </div>
    </Slide>
  )
}
