import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import pages here
import Feed from './pages/Feed';
import Prompts from './pages/Prompts';
import Onboard from './pages/Onboard';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import Landing from './pages/Landing';

export default function Content(props) {
    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Landing user={props.user} setUser={props.setUser}  /> } />
                <Route path="/login" render={() => <Login user={props.user} setUser={props.setUser}  /> } />
                <Route path="/signup" render={() => <Signup user={props.user} setUser={props.setUser}  /> } />
                <Route path="/onboard" render={() => <Onboard user={props.user} setUser={props.setUser}  /> } />
                <Route path="/prompts" render={() => <Prompts user={props.user} setUser={props.setUser}  /> } />
                <Route path="/profile" render={() => <Profile user={props.user} setUser={props.setUser}  /> } />
                <Route path="/feed" render={() => <Feed user={props.user} setUser={props.setUser}  /> } />
                <Route path="/new/:id" render={() => <NewPost user={props.user} setUser={props.setUser}  /> } />
            </Switch>
        </div>
    )

}