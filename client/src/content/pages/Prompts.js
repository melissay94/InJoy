import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default function Prompts(props) {
    const [prompt, setPrompt] = useState("");

    const getData = () => {
        axios.get(`http://www.boredapi.com/api/activity/`)
        .then(response => {
            console.log("DAT DATA", response.data)
            if (response.data.type == "charity" || response.data.type=="social") {
                getData();
            } else {
                setPrompt([response.data.activity]);
            }
        }).catch(err=>{console.log(err)})
    }

    useEffect(() => {
        getData();
    }, [])

    const selectPrompt = () => {
        // set the current user's current prompt
    }

    
    return (
        <div className="prompt slide">
            <h2>
                {prompt}
            </h2>
            <h3>Does this spark joy?</h3>
            <div className="prompt-buttons">
                <div className="button-div green" onClick={selectPrompt}>
                    <Link to={`/new/${prompt}`}>Yes</Link>
                </div>
                <div className="button-div red" onClick={getData}>
                    <a>No</a>
                </div>
            </div>
        </div>
    )
}