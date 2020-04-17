import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Chip } from "@material-ui/core";
import axios from "axios";

export default function Feed({user, setUser}) {

    const [feed, setFeed] = useState([]);
    const [message, setMessage] = useState(null);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [promptTitles, setPromptTitles] = useState([]);

    useEffect(() => {
        getFeed();
        getPromptTitles();
    }, []);

    const getFeed = () => {
        axios.get("http://localhost:4000/feed")
            .then(response => {
                console.log(response.data);
                if (response.data.message) {
                    setMessage(response.data.message);
                } else {
                    setMessage(null);
                    setFeed(response.data);
                }
            }).catch(err => {
                setMessage("Error, could not get feed");
                console.log(err);
            });
    }

    const getFeedByPrompt = () => {
        if (selectedPrompt){
            axios.get(`http://localhost:4000/prompt/${selectedPrompt}`)
                .then(response => {
                    if (response.data.message) {
                        setMessage(response.data.message);
                    } else {
                        setMessage(null);
                        setFeed(response.data);
                    }
                }).catch(err => {
                    setMessage(`Error, could not get feed of ${selectedPrompt}`);
                    console.log(err);
                });
        }
    }

    const getPromptTitles = () => {
        axios.get("http://localhost:4000/prompt/")
            .then(response => {
                if (response.data.message) {
                    setMessage(response.data.message);
                } else {
                    setMessage(null);
                    setPromptTitles(response.data);
                    console.log(response.data);
                }
            }).catch(err => {
                setMessage("Error getting prompt titles");
                console.log(err);
            });
    }

    // if (!user) {
    //     return <Redirect to="/" />
    // }

    return (
        <div>
            <h2>Today's Feed</h2>
            <div className="prompt-selection">
                { promptTitles.map((item, index) => (
                    <Chip key={index} label={item} />
                ))}
            </div>
            <Grid container>
                { feed.map(item => (
                <Grid item xs={4} key={`prompt-${item.id}`}>
                    <h3>Prompt: {item.prompt}</h3>
                    <h3>Title: {item.title}</h3>
                    <h6>Submitted by: {item.user}</h6>
                    <p>{item.description}</p>
                </Grid>
                ))}
            </Grid>
        </div>
    )
}