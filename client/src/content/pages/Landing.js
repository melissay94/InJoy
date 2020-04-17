import React from 'react';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';


export default function Landing(props) {
    return (
        <Fade mountOnEnter unmountOnExit in="true">

            <ul className="splash">
                <div className="prompt-buttons">
                    <li className="button-div green"><Link className="App-link" to='/signup'>Join</Link></li>
                    <li className="button-div green"><Link className="App-link" to='/login'>Sign in</Link></li>
                </div>
            </ul>
        </Fade>
        
    )
}
