import {Router, Route, hashHistory} from 'react-router'
import React from 'react'
import {render} from 'react-dom'

import App from '../app-view/index.jsx'
import Movie from '../movie-view/index.jsx'
import Player from '../movie-player-view/index.jsx'


render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/movie/:id" component={Movie}/>
        <Route path="/movie/play/:torrent" component={Player}/>
    </Router>,
    document.getElementById('main_app')
);