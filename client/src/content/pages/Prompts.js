import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Prompts(props) {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        // for (let i=0; i < 5; i++){
            axios.get(`http://www.boredapi.com/api/activity/`)
            .then(response => {
                console.log("DAT DATA", response.data)
        //         if (!prompts.includes(response.data.activity)) {
                    setPrompts([response.data.activity]);
        //         } else {
        //             setPrompts(["yo", "yo", "yo", "yo", "yo"]);
        //         }
            }).catch(err=>{console.log(err)})
        // }
    }, [])

    let promptsList = (prompts.length < 1) ? "" : prompts.map(prompt => {
        return <div>{prompt}</div>
    })
    
    return (
        <div>Here be a list of prompts: {promptsList}</div>
    )
}