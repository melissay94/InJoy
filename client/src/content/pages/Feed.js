import React, { useEffect, useState } from 'react';
import { Grid, Chip, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    post: {
        marginTop: "3em",
    }
    
}));

export default function Feed({user, setUser}) {

    const classes = useStyles();

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
            <Grid container >
                { feed.map(item => (
                <Grid item xs={12} key={`prompt-${item.id}`} className={classes.post}>
                    <Grid container>
                    <Grid item xs={2}>
                        <Avatar src="https://www.placecage.com/200/300" />
                    </Grid>
                    <Grid item xs={9}>
                        <h6>{item.user}</h6>
                        <h3>Prompt: {item.prompt}</h3>
                    </Grid>
                    </Grid>
                    <img src={item.link ? item.link : "http://www.placekitten.com/400/300"} width="100%" height="300px" />
                    <h3>Title: {item.title}</h3>
                    <p>{item.description}</p>
                </Grid>
                ))}
            </Grid>
        </div>
    )
}