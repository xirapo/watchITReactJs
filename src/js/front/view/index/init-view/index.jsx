//Basic
import {Router, Route} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import React from 'react'
import {render} from 'react-dom'

//Components
import Login from '../login-view/index.jsx'
//Require for auth
import Auth from '../../../../resources/database/auth'
//Default settings
import Setting from '../../../../backend/settings'
//Check for auth
let _authenticated = new Auth();
const history = createBrowserHistory();

//Check Auth
function checkAuth(nextState, replace) {
    return _authenticated.isAuth ?
        location.href = Setting.appView : <Login/>

}

render(
    <Router history={history}>
        <Route path="/" render={checkAuth}/>
    </Router>,
    document.getElementById('main_app')
);