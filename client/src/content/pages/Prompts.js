import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';

export default function Prompts({user, setUser}) {
    // To get an initial value to show on the prompt card
    useEffect(() => {
        getData();
    }, []);

    const [prompt, setPrompt] = useState("");
    const [slide, setSlide] = useState(false);

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
        });
        setSlide(true);
    }

    const sendPrompt = () => {
        console.log(user, prompt);
        axios.post(`http://localhost:4000/user/${user.id}/prompt`, {title: prompt.activity, type: prompt.type })
            .then(response => {
                if (response.data.message) {
                  setMessage(response.data.message);
                } else {
                  setMessage(null);
                  setUser(response.data);
                }
            }).catch(err => {
                setMessage("Error, something has gone wrong with adding this prompt to user");
                console.log(err);
            });
    }

    const [message, setMessage] = useState('');

    if (!user) {
        return <Redirect to='/login' />
    }
  
    return (
        <Slide direction="left" mountOnEnter unmountOnExit in={slide}>
            <div className="prompt slide">
                <h2>
                    {prompt.activity}
                </h2>
                <h3>Does this spark joy?</h3>
                <div className="prompt-buttons">
                    <div className="button-div green" onClick={() => sendPrompt()}>
                        <Link className="App-link" to={`/new/${prompt.activity}`}>Yes</Link>
                    </div>
                    <div className="button-div red" onClick={()=> {
                        setSlide(false);
                        getData();
                    }}>
                        <a>No</a>
                    </div>
                </div>
                <div>{message}</div>
            </div>
        </Slide>
    )
}