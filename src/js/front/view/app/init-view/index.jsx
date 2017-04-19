//Basic
import React from 'react'
import {render} from 'react-dom'
import {Router, Route} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

//Components
import App from '../main-view/index.jsx'
//import Movie from '../movie-view/index.jsx'
//import Player from '../movie-player-view/index.jsx'

//Require for auth
import Auth from '../../../../resources/database/auth'
//Default settings
import Setting from '../../../../backend/settings'

//Check for auth
let _authenticated = new Auth();
const history = createBrowserHistory();

//Check auth
function requireAuth(Component) {
    return !_authenticated.isAuth ?
        location.href = Setting.loginView : <Component/>
}

render(
    <Router history={history}>
        <div>
            <Route path="/" render={()=>requireAuth(App)}/>
        </div>
    </Router>,
    document.getElementById('main_app')
);
//<Route path="/movie/:id" render={()=>requireAuth(Movie)}/>
// <Route path="/movie/play/:torrent" render={()=>requireAuth(Player)}/>