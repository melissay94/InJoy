import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    // TODO add a link to feed that only shows if they posted today

    let links = props.user?
        (<ul>
            <li><Link to='/profile' className="App-link">Profile</Link></li>
            <li><Link to='/prompts' className="App-link">Choose a Prompt</Link></li>
        </ul>)
        :"";

    return (
        <header>
            <h1 className="fancy"><Link className="App-link" to='/'>InJoy</Link></h1>
            <nav>
                {links}
            </nav>
        </header>
    )
}