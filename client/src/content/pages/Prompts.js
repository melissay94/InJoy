import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default function Prompts({user, setCurrentUser}) {
    // To get an initial value to show on the prompt card
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(`http://www.boredapi.com/api/activity/`)
        .then(response => {
            console.log("DAT DATA", response.data)
            if (response.data.type == "charity" || response.data.type=="social") {
                getData();
            } else {
                setPrompt(response.data);
            }
        }).catch(err=>{
            setMessage("Error, unable to fetch prompt");
            console.log(err);
        })
    }

    const sendPrompt = () => {
        console.log(user, prompt);
        axios.post(`http://localhost:4000/user/${user.id}/prompt`, {title: prompt.activity, type: prompt.type })
            .then(response => {
                if (response.data.message) {
                  setMessage(response.data.message);
                } else {
                  setMessage(null);
                  setCurrentUser(response.data);
                }
            }).catch(err => {
                setMessage("Error, something has gone wrong with adding this prompt to user");
                console.log(err);
            });
    }

    const [prompt, setPrompt] = useState("");
    const [message, setMessage] = useState('');

    if (!user) {
        return <Redirect to='/login' />
    }
  
    return (
        <div className="prompt slide">
            <h2>
                {prompt.activity}
            </h2>
            <h3>Does this spark joy?</h3>
            <div className="prompt-buttons">
                <div className="button-div green" onClick={() => sendPrompt()}>
                    <Link to={`/new/${prompt}`}>Yes</Link>
                </div>
                <div className="button-div red" onClick={getData}>
                    <a>No</a>
                </div>
            </div>
            <div className="red">{message}</div>
        </div>
    )
}