import React from 'react'
import AppMoviesListAvatar from '../app-main-movies-list-avatar/index.jsx'
import AppMovieDetailControlButtons from '../app-movie-details-controls-buttons/index.jsx'
import AppMoviesNavBarMenu from '../app-main-movies-nav-bar-menu/index.jsx'
import AppMovieDetailTitle from '../app-movie-details-title/index.jsx'
import AppMovieDetailInfo from '../app-movie-details-info/index.jsx'
import AppMovieDetailDescription from '../app-movie-details-description/index.jsx'
import ListCommaSplit from '../util-list-comma-split/index.jsx'
import BoxLoader from '../util-box-loader/index.jsx'

//Require for request
let setting = require('../../../backend/settings');
//Request
let axios = require('axios');

export default class AppMovieDetail extends React.Component {
    constructor(props) {
        super(props);
        //Initial state
        this.state = {
            loader: true,
            torrent: null
        };

        //Request movies
        axios({
            url: setting.ytsAPI.listMoviesDetails + '?movie_id=' + this.props.id,
            timeout: setting.ytsAPI.timeout
        }).then((e)=> {
            //Set state for rendering
            this.setState({
                movie: e.data.data.movie,
                loader: false
            });
        })
    }

    setInitialTorrent(def) {
        this.prepareDataToPlayer(
            def.action
        )
    }


    setTorrent(torrent) {
        this.prepareDataToPlayer(
            torrent
        )
    }

    prepareDataToPlayer(torrent) {
        let _to_url_object = {};
        
        _to_url_object['torrent'] = torrent;
        _to_url_object['id'] = this.state.movie.id;
        _to_url_object['title'] = this.state.movie.title;
        _to_url_object['imdb_code'] = this.state.movie.imdb_code;

        this.setState({
            torrent: ((
                new Buffer(
                    JSON.stringify(_to_url_object) || '', 'utf8'
                )
            ).toString('base64'))
        })
    }


    prepareTorrents(torrents) {
        //Prepare for menu structure
        return torrents.map((v, k)=> {

            let _torrents_menu = {};

            _torrents_menu['default'] = (k == 0);
            _torrents_menu['label'] = v.quality;
            _torrents_menu['action'] = v.url;

            return _torrents_menu;
        });
    }

    render() {
        return (
            !this.state.loader
            && (
                <div className="row">

                    {/*Aside*/}
                    <aside className="col l4 m4">

                        {/*Poster*/}
                        <div className="row max-height-750 overflow-hidden fixed-poster-resolution">
                            <AppMoviesListAvatar
                                className="full-width"
                                src={this.state.movie.large_cover_image}
                            />
                        </div>

                        {/*Controls*/}
                        <div className="row">
                            <div className="col l6 m6 padding-left-0">
                                <a href={"#/movie/play/" + this.state.torrent}>
                                    <AppMovieDetailControlButtons
                                        text="Play"
                                    />
                                </a>
                            </div>

                            <div className="col l6 m6 padding-right-0">
                                <AppMovieDetailControlButtons
                                    text="Add to Playlist"
                                    className="light-green"
                                    icon="icon-plus"
                                />
                            </div>
                        </div>

                    </aside>

                    {/*Main Section*/}
                    <section className="col l8 m8">
                        <header className="row">
                            {/*Title*/}
                            <AppMovieDetailTitle>
                                {this.state.movie.title}
                            </AppMovieDetailTitle>

                            {/*Movie Info*/}
                            <AppMovieDetailInfo
                                info={{
                                    year:this.state.movie.year,
                                    rating:this.state.movie.rating,
                                    runtime:this.state.movie.runtime,
                                    rate:this.state.movie.mpa_rating
                                }}
                            />
                        </header>

                        {/*Genres*/}
                        <section className="row no-margin">
                            <ListCommaSplit
                                list={this.state.movie.genres}
                            />
                        </section>

                        {/*Description*/}
                        <section className="row">
                            <AppMovieDetailDescription
                                description={this.state.movie.description_full}
                            />
                        </section>

                        {/*Footer*/}
                        <footer className="row">
                            <nav className="col s12 l12 m12 transparent z-depth-0">
                                <div className="nav-wrapper">
                                    {/*The resolution menu*/}
                                    <AppMoviesNavBarMenu
                                        btnText="Resolution"
                                        onChange={(torrent) => this.setTorrent(torrent)}
                                        getInitialItem={(t)=>this.setInitialTorrent(t)}
                                        list={this.prepareTorrents(
                                            this.state.movie.torrents
                                        )}
                                    />
                                    <ul>
                                        <li className="dropdown">
                                            <a className="dropdown-button" href="#modal-trailer">
                                                <span className="font-light-gray right">Watch Trailer</span>
                                                <i className="icon-video tiny relative top-2 left margin-left-4"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </footer>

                    </section>
                </div>
            )
            || <BoxLoader size="100"/>
        )
    }
}
