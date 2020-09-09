import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <div className="footer">
            <ul>
                <li><Link className="App-link" to="/">HOME</Link></li>
                <li><Link className="App-link" to="/help">HELP</Link></li>
                <li><Link className="App-link" to="/terms">TERMS & POLICIES</Link></li>
            </ul>
        </div>
    )
}