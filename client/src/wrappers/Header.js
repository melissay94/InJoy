import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

export default function Header({user, setUser}) {
    // TODO add a link to feed that only shows if they posted today
    const [anchorEl, setAnchorEl] = useState(null);

    const linkInfo = [
        {
            text: "Home",
            link: "/",
            icon: <HomeOutlinedIcon />
        },
        {
            text: "Profile",
            link: "/profile",
            icon: <AccountCircleOutlinedIcon />
        },
        {
            text: "Generate Joy",
            link: "/prompts",
            icon: <InsertEmoticonIcon />
        },
        {
            text: "Likes",
            link: "/likes",
            icon: <FavoriteBorderIcon />
        },
        {
            text: "Contact us",
            link: "/contact",
            icon: <MailOutlineIcon />
        },
        {
            text: "Sign out",
            link: "/",
            icon: <ExitToAppIcon />, 
            logout: true
        },
        {
            text: "Help",
            link: "/help",
            icon: <HelpOutlineIcon />
        },
        {
            text: "Policies",
            link: "/terms",
            icon: <AssignmentOutlinedIcon />
        },

    ]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let links = (<Drawer
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <List>
                   {linkInfo.map(link => {
                       return(
                           <ListItem onClick={() => {
                               if (link.logout) {
                                   setUser(null)
                               }
                           }}>
                               <Link to={link.link} className="App-link header-link">
                                    <span className="header-menu-icon">{link.icon}</span>
                                    <span className="header-menu-icon">{link.text}</span>
                               </Link>
                           </ListItem>
                       )
                   })}
                </List>
            </Drawer>
        );

    return (
        <header>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {/* <img className="menu-icon" alt="show menu" src="https://static.thenounproject.com/png/696519-200.png" /> */}
                <MenuIcon />
            </Button>
            {links}
            <h1 className="fancy logo"><Link className="App-link" to='/'>InJoy</Link></h1>
            <div>{/* This is an empty div for flex to center the logo */}</div>
        </header>
    )
}