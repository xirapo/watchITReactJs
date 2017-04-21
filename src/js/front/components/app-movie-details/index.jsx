//Basic
import React from 'react'
//Components
import BoxButton from '../app-buttons/index.jsx'
import NavBarMenu from '../app-nav-bar-menu/index.jsx'
import MoviePoster from '../app-movie-poster/index.jsx'
import AppMovieDetailInfo from '../app-movie-details-info/index.jsx'
import FlowText from '../util-flow-text/index.jsx'
import CustomScrollbars from '../util-scroller/index.jsx';
import ListCommaSplit from '../util-list-comma-split/index.jsx'


export default class AppMovieDetail extends React.Component {
    constructor(props) {
        super(props);
        //Default state
        this.state = {
            torrent: null
        }
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
        _to_url_object['id'] = this.props.movie.id;
        _to_url_object['title'] = this.props.movie.title;
        _to_url_object['imdb_code'] = this.props.movie.imdb_code;


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
            return {
                default: (k == 0),
                label: v.quality,
                action: v.url
            };
        });
    }

    render() {
        return (
            <div className="row">
                {/*Aside*/}
                <aside className="col l4 m4">
                    {/*Poster*/}
                    <div className="row max-height-750 overflow-hidden fixed-poster-resolution">
                        <MoviePoster className="full-width" src={this.props.movie.large_cover_image}/>
                    </div>
                    {/*Controls*/}
                    <div className="row">
                        <div className="col l6 m6 padding-left-0">
                            <a href={"#/movie/play/" + this.state.torrent }>
                                <BoxButton className="darken-4">
                                    <span className="z-index-top font-size-small bold capitalize">
                                        Play
                                    </span>
                                </BoxButton>
                            </a>
                        </div>

                        <div className="col l6 m6 padding-right-0">
                            <BoxButton className="darken-4 light-green">
                                <span className="z-index-top  font-size-small bold capitalize">
                                    Add
                                </span>
                            </BoxButton>
                        </div>
                    </div>
                </aside>

                {/*Main Section*/}
                <section className="col l8 m8">
                    <header className="row">
                        {/*Title*/}
                        <div className="col l12 m12 s12">
                            <h3 className="white-text margin-top-0 font-type-titles font-size-50 padding-bottom-5 truncate">
                                {this.props.movie.title}
                            </h3>
                        </div>

                        {/*Movie Info*/}
                        <AppMovieDetailInfo
                            info={{
                                    year:this.props.movie.year,
                                    rating:this.props.movie.rating,
                                    runtime:this.props.movie.runtime,
                                    rate:this.props.movie.mpa_rating
                                }}
                        />
                    </header>

                    {/*Genres*/}
                    <section className="row">
                        <ListCommaSplit
                            list={this.props.movie.genres}
                        />
                    </section>

                    {/*Description*/}
                    <section className="row">
                        <CustomScrollbars
                            autoHide
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            autoHeight
                            autoHeightMin={200}
                            thumbMinSize={30}
                            universal={true}>
                            <FlowText content={this.props.movie.description_full}/>
                        </CustomScrollbars>

                    </section>

                    {/*Footer*/}
                    <footer className="row">
                        <nav className="col s12 l12 m12 transparent z-depth-0">
                            <div className="nav-wrapper">
                                {/*The resolution menu*/}
                                <NavBarMenu
                                    btnText="Resolution"
                                    onChange={(torrent) => this.setTorrent(torrent)}
                                    getInitialItem={(t)=>this.setInitialTorrent(t)}
                                    list={this.prepareTorrents(
                                 this.props.movie.torrents
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
    }
}
