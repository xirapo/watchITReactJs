//Basic
import {Route, Redirect} from 'react-router'
import {HashRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import React from 'react'
import {render} from 'react-dom'

//Components
import Login from '../../index/login-view/index.jsx'
import App from '../../app/main-view/index.jsx'
//import Movie from '../app/movie-view/index.jsx'
//import Player from '../app/movie-player-view/index.jsx'

//Require for auth
import Auth from '../../../../resources/database/auth'

//Check for auth
let _authenticated = new Auth();
const history = createBrowserHistory();


if (_authenticated.isAuth) {
    location.hash = '/app'
}

//Check Auth
function checkAuth(Component) {
    return _authenticated.isAuth
        ? (<Component />) : (<Redirect to="/"/>)
}

render(
    <HashRouter history={history}>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/app" render={()=>(checkAuth(App))}/>
        </div>
    </HashRouter>,
    document.getElementById('main_app')
);