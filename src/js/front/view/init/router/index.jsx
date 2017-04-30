//Basic
import React from 'react'
import {render} from 'react-dom'
import {Route, Redirect} from 'react-router'
import {HashRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

//Drag Bar
import DragBar from '../drag-bar/index.jsx'

//Components
import Login from '../../index/login-view/index.jsx'
import App from '../../app/main-view/index.jsx'
import Movie from '../../app/movie-view/index.jsx'
import Player from '../../app/movie-player-view/index.jsx'

//Require for auth
import Auth from '../../../../resources/database/auth'
import Setting from '../../../../backend/settings'

//Check for auth
const auth = new Auth();
const history = createBrowserHistory();


//Check Auth for logged
function checkOut() {
    return !auth.isAuth ? (
        <DragBar>
            <Login/>
        </DragBar>
    ) : (<Redirect to={Setting.appView}/>)
}

//Require logged
function requireAuth(Component, navigate) {
    return auth.isAuth ? (
        <DragBar>
            <Component {...navigate}/>
        </DragBar>
    ) : (<Redirect to={Setting.loginView}/>)
}

render(
    <HashRouter history={history}>
        <section id="screen" className="full-height full-width absolute">
            <Route name="login" exact path="/" render={checkOut}/>
            <Route name="app" exact path="/app" render={(n)=>(requireAuth(App,n))}/>
            <Route name="movie" exact path="/app/movie/:imdb" render={(n)=>(requireAuth(Movie,n))}/>
            <Route name="movie" path="/app/movie/play/:torrent" render={(n)=>(requireAuth(Player,n))}/>
        </section>
    </HashRouter>,
    document.getElementById('main_app')
);