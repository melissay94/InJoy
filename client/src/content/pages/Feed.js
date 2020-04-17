import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import axios from "axios";

export default function Feed({user, setUser}) {

    const [feed, setFeed] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        getFeed();
    }, []);

    const getFeed = () => {
        axios.get("http://localhost:4000/feed")
            .then(response => {
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

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h2>Today's Feed</h2>
            <Grid container>
                { feed.map(item => (
                <Grid item xs={4}>
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