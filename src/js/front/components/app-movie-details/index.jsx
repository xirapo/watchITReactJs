//Basic
import React from 'react'
//Components
import BoxImage from '../app-image/index.jsx'
import NavBarMenu from '../app-nav-bar-menu/index.jsx'
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
        this.setState({
            torrent: ((
                new Buffer(
                    JSON.stringify({
                        torrent: torrent,
                        imdb_code: this.props.movie.imdb_code,
                        title: this.props.movie.title

                    }) || '', 'utf8'
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
                    <BoxImage
                        className="full-width"
                        src={this.props.movie.large_cover_image}
                    />
                </aside>

                {/*Main Section*/}
                <section className="col l8 m8">
                    <header className="row">
                        {/*Title*/}
                        <div className="col l12 m12 s12 width-55-vw">
                            <h1 className="white-text margin-top-0 font-type-titles truncate">
                                {this.props.movie.title}
                            </h1>
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
                    <section className="row movie-details-description">
                        <CustomScrollbars
                            autoHide
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            thumbMinSize={30}
                            universal={true}>
                            <FlowText>
                                <span>{this.props.movie.description_full}</span>
                            </FlowText>
                        </CustomScrollbars>

                    </section>

                    {/*Footer*/}
                    <footer className="row nav-bar-movie-details">
                        <nav className="col l12 m12 transparent z-depth-0">
                            <div className="nav-wrapper">
                                {/*Play*/}
                                <ul>
                                    <li className="dropdown">
                                        <a className="dropdown-button flow-text clearfix"
                                           href={"#/app/movie/play/" + this.state.torrent }>
                                            <span className="font-light-gray right">Play</span>
                                            <i className="icon-controller-play normalize-small-icon left margin-left-4"/>
                                        </a>
                                    </li>
                                </ul>

                                {/*The resolution menu*/}
                                <NavBarMenu
                                    btnText="Resolution"
                                    onChange={(torrent) => this.setTorrent(torrent)}
                                    getInitialItem={(t)=>this.setInitialTorrent(t)}
                                    list={this.prepareTorrents(
                                        this.props.movie.torrents
                                    )}
                                />

                                {/*Watch Trailer
                                 <ul>
                                 <li className="dropdown">
                                 <a className="dropdown-button flow-text" href="#modal-trailer">
                                 <span className="font-light-gray right">Trailer</span>
                                 <i className="icon-video relative top-2 left margin-left-4"/>
                                 </a>
                                 </li>
                                 </ul>*/}
                            </div>
                        </nav>
                    </footer>
                </section>
            </div>

        )
    }
}
