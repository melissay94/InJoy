import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_PROMPT = gql`
    query randomPrompt {
        id
        title
        image
        tips
        category
    }
`

export default function Prompts({ isLoggedIn }) {
    // To get an initial value to show on the prompt card
    const { data, loading, error } = useQuery(GET_PROMPT);
    const [slide, setSlide] = useState(false);

    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    if (loading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>Error!</div>
    }

    if (data) console.log(data)

    // useEffect(() => {
    //     getPrompt();
    // }, []);

    const prompt = data.prompt;

    // const getData = () => {
    //     axios.get(`http://www.boredapi.com/api/activity/`)
    //     .then(response => {
    //         console.log("DAT DATA", response.data)
    //         if (response.data.type == "charity" || response.data.type=="social") {
    //             getData();
    //         } else {
    //             setPrompt(response.data);
    //             setMessage(null);
    //         }
    //     }).catch(err=>{
    //         setMessage("Error, unable to fetch prompt");
    //         console.log(err);
    //     });
    // }

    // const getRandomUserPrompt = () => {
    //     axios.get("http://localhost:4000/prompt/random")
    //         .then(response => {
    //             if (response.data.message) {
    //                 setMessage(response.data.message);
    //                 getData();
    //             } else {
    //                 setMessage(null);
    //                 setPrompt({
    //                     activity: response.data.title,
    //                     type: response.data.type
    //                 });
    //             }
    //         }).catch(err => {
    //             setMessage("Error, could not get a user generated prompt");
    //             console.log(err);
    //             getData();
    //         });
    // }

    // const getPrompt = () => {
    //     const randomChance = Math.random();
    //     if (randomChance < 0.5) {
    //         getData();
    //     } else {
    //         getRandomUserPrompt();
    //     }
    //     setTimeout(() => {
    //         setSlide(true);
    //     }, 500);
    // }

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


  
    return (
        <Slide direction="left" mountOnEnter unmountOnExit in={slide}>
            <div className="prompt slide">
                <h2>
                    {prompt.title}
                </h2>
                <h3>Does this activity spark joy?</h3>
                <div className="prompt-buttons">
                    <div className="button-div green" onClick={
                        console.log("here be a function to choose a prompt")
                    }>
                        <Link className="App-link" to={`/new/${prompt.title}`}>Yes</Link>
                    </div>
                    <div className="button-div green" onClick={()=> {
                        setSlide(false);
                    }}>
                        <a>No</a>
                    </div>
                </div>
            </div>
        </Slide>
    )
}