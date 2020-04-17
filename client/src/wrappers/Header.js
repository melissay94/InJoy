import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({user, setUser}) {
    // TODO add a link to feed that only shows if they posted today

    let links = user?
        (<ul>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/prompts'>Choose a Prompt</Link></li>
            <li><Link to='/' onClick={() => setUser(null)}>Logout</Link></li>
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