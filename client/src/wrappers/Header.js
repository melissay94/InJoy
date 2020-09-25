import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
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

export default function Header({ isLoggedIn }) {
    // TODO add a link to feed that only shows if they posted today
    const [anchorEl, setAnchorEl] = useState(null);
    const client = useApolloClient();

    const logout = () => {
      client.clearStore();
      client.writeData({ data: { isLoggedIn: false } });
      localStorage.removeItem('token');
      return <Redirect to="/" />;
    };


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
        }

    ]

    if (!isLoggedIn) {
        return (
            <div className="login-banner desktop">
                <h1>Spark your quarantine days with joy.</h1>
                <p>Try something new during quarantine!</p>
            </div>
        )
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let links = (
        <List>
            {linkInfo.map(link => {
                return(
                    <ListItem onClick={() => {
                        if (link.logout) {
                            logout()
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
    )

    let mobileLinks = (<Drawer 
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {links}
            </Drawer>
        );

    let desktopLinks = (
        <div className="nav-menu-desktop desktop">
             {links}
        </div>
    )

    
    return (
        <header>
            <Button className="mobile" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {/* <img className="menu-icon" alt="show menu" src="https://static.thenounproject.com/png/696519-200.png" /> */}
                <MenuIcon />
            </Button>
            {mobileLinks}
            {desktopLinks}
            <h1 className="fancy logo"><Link className="App-link" to='/'>InJoy</Link></h1>
            <div>{/* This is an empty div for flex to center the logo */}</div>
        </header>
    )
}