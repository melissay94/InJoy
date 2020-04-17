import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default function Prompts(props) {
    const [prompt, setPrompt] = useState("");

    const getData = () => {
        axios.get(`http://www.boredapi.com/api/activity/`)
        .then(response => {
            console.log("DAT DATA", response.data)
            setPrompt([response.data.activity]);
        }).catch(err=>{console.log(err)})
    }

    useEffect(() => {
        getData();
    }, [])

    const selectPrompt = () => {
        // set the current user's current prompt
    }

    
    return (
        <div>
            <h2>
                {prompt}
            </h2>
            <h3>Does this spark joy?</h3>
            <div>
                <Link to={`/new/${prompt}`} onClick={selectPrompt}>Yes</Link>
                <button onClick={getData}>No</button>
            </div>
        </div>
    )
}