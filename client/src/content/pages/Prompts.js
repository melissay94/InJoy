import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import useRedirect from '../../hooks/useRedirect';
import useRandomPrompt from '../../hooks/query/useRandomPrompt';

export default function Prompts({ isLoggedIn }) {
    const [prompt, setPrompt] = useState('');
    const [slide, setSlide] = useState(false);
    const [message, setMessage] = useState('');

    const shouldRedirect = isLoggedIn ? false : true;
    useRedirect(shouldRedirect, isLoggedIn, useHistory());
    
    const { data } = useRandomPrompt();

    const getData = () => {
        axios.get(`http://www.boredapi.com/api/activity/`)
        .then(response => {
            if (response.data.type === "charity" 
                || response.data.type === "social") {
                getData();
            } else {
                setPrompt(response.data);
                setMessage(null);
            }
        }).catch(err=>{
            setMessage("Error, unable to fetch prompt");
            console.log(err);
        });
    }

    const getPrompt = () => {
        const randomChance = Math.random();
        if (randomChance < 0.5) {
            getData();
        } else {
            data ? setPrompt(data.randomPrompt) : getData();
        }
        setTimeout(() => {
            setSlide(true);
        }, 500);
    }

    useEffect(() => {
        getPrompt();
    }, [])

    // Commenting this out because we can't use axios to make calls to our own db
    // Because of GraphQL it's not set up to use get/post requests.
    // If you look in the hooks folder, you'll see different db calls I've set up for other parts
    // Also, I couldn't find anything in our backend that is tracking current user prompts?
    // const sendPrompt = () => {
    //     axios.post(`http://localhost:4000/user/${user.id}/prompt`, {title: prompt.activity, type: prompt.type })
    //         .then(response => {
    //             if (response.data.message) {
    //               setMessage(response.data.message);
    //             } else {
    //               setMessage(null);
    //               setUser(response.data);
    //             }
    //         }).catch(err => {
    //             setMessage("Error, something has gone wrong with adding this prompt to user");
    //             console.log(err);
    //         });
    // }

    console.log(prompt);
  
    return (
        <Slide direction="left" mountOnEnter unmountOnExit in={slide}>
            <div className="prompt slide">
                <h2>
                    {prompt.activity || prompt.title}
                </h2>
                <h3>Does this activity spark joy?</h3>
                <div className="prompt-buttons">
                    {/* <div className="button-div green" onClick={() => sendPrompt()}>
                        <Link className="App-link" to={`/new/${prompt.activity}`}>Yes</Link>
                    </div> */}
                    <div className="button-div green" onClick={()=> {
                        setSlide(false);
                        getPrompt();
                    }}>
                        <a>No</a>
                    </div>
                </div>
                <div>{message}</div>
            </div>
        </Slide>
    )
}
