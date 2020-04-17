import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/MenuIcon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Header({user, setUser}) {
    // TODO add a link to feed that only shows if they posted today
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let links = user?
        (<Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/prompts'>Choose a Prompt</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/' onClick={() => setUser(null)}>Logout</Link></MenuItem>
            </Menu>
        )
        :"";

    return (
        <header>
            <h1 className="fancy"><Link className="App-link" to='/'>InJoy</Link></h1>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img className="menu-icon" src="https://static.thenounproject.com/png/696519-200.png" />
            </Button>
            {links}
        </header>
    )
}