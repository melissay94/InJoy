import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    // TODO add a link to feed that only shows if they posted today

    let links = props.user?
        (<ul>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/prompts'>Choose a Prompt</Link></li>
        </ul>)
        :"";

    return (
        <header>
            <h1><Link to='/'>InJoy</Link></h1>
            <nav>
                {links}
            </nav>
        </header>
    )
}