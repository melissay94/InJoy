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
import Terms from './pages/Terms';
import Help from './pages/Help';
import Contact from './pages/Contact';

export default function Content({ isLoggedIn }) {
    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Landing isLoggedIn={ isLoggedIn } /> } />
                <Route path="/login" render={() => <Login  isLoggedIn={ isLoggedIn } /> } />
                <Route path="/signup" render={() => <Signup  isLoggedIn={ isLoggedIn } /> } />
                <Route path="/onboard" render={() => <Onboard isLoggedIn={ isLoggedIn } /> } />
                <Route path="/prompts" render={() => <Prompts isLoggedIn={ isLoggedIn } /> } />
                <Route path="/profile" render={() => <Profile isLoggedIn={ isLoggedIn } /> } />
                <Route path="/feed" render={() => <Feed isLoggedIn={ isLoggedIn } /> } />
                <Route path="/new/:id" render={() => <NewPost isLoggedIn={ isLoggedIn } /> } />
                <Route path="/likes/:id" render={() => <NewPost isLoggedIn={ isLoggedIn } /> } />
                <Route path="/help" component={Help} />
                <Route path="/terms" component={Terms} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </div>
    )

}
