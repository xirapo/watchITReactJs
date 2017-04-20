//Basic
import React from 'react'
import {render} from 'react-dom'
import {Route, Redirect} from 'react-router'
import {HashRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

//Components
import Login from '../../index/login-view/index.jsx'
import App from '../../app/main-view/index.jsx'
//import Movie from '../app/movie-view/index.jsx'
//import Player from '../app/movie-player-view/index.jsx'

//Require for auth
import Auth from '../../../../resources/database/auth'
import Setting from '../../../../backend/settings'

//Check for auth
const auth = new Auth();
const history = createBrowserHistory();


//Check Auth for logged
function checkOut() {
    return !auth.isAuth
        ? (<Login/>)
        : (<Redirect to={Setting.appView}/>)
}

//Require logged
function requireAuth(Component) {
    return auth.isAuth
        ? (<Component />)
        : (<Redirect to={Setting.loginView}/>)
}

render(
    <HashRouter history={history}>
        <div className="full-height">
            <Route exact path="/" render={checkOut}/>
            <Route path="/app" render={()=>(requireAuth(App))}/>
        </div>
    </HashRouter>,
    document.getElementById('main_app')
);