//Basic
import React from 'react'
//Components
import AppMoviePlayer from 'front/components/app-main-movie-player/index.jsx'
import AppMoviePlayerLoader from 'front/components/app-main-movie-player-loader/index.jsx'
import AppMoviePlayerChat from 'front/components/app-main-movie-player-chat/index.jsx'
import AppMoviePlayerChatHeader from 'front/components/app-main-movie-player-chat-header/index.jsx'
import AppMoviePlayerChatToggle from 'front/components/app-main-movie-player-chat-toggle/index.jsx'
import AppMoviesPlayerSwarm from 'front/components/app-main-movie-player-swarm/index.jsx'
import MainLoader from 'front/components/util-main-loader/index.jsx'
import BtnClose from 'front/components/util-btn-close/index.jsx'
//Database (Api Handler)
import Auth from 'resources/database/auth'
import Movie from 'resources/database/movies'
//Helpers
import cryptHelper from 'resources/helpers/cryptHelper'
import logHelper from 'resources/helpers/logHelper'


//Movie player view class
export default class MoviePlayer extends React.Component {
    constructor(props) {
        super(props);

        //Movie
        this.movie = new Movie();
        this.auth = new Auth();
        this.timeout = null;

        //Decode string and pass to json object
        this.state = {
            state: 'Connecting',
            percent: 0,
            canPlay: false,
            stopped: false,
            toggle_screen: false
        };

    }

    componentDidMount() {
        //Decode param
        let _movieInfo = JSON.parse(
            cryptHelper.fromBase64(
                this.props.match.params.torrent
            )
        );

        //Set subs
        this.movie.get(
            _movieInfo.imdb_code,
            this.auth.token
        ).then((res)=> {

            //Get better sub
            for (let s in res.subtitles) {
                res.subtitles[s] = res.subtitles[s].reduce((pre, act, i, arr)=> {
                    pre.rating = +pre.rating;
                    act.rating = +act.rating;
                    return pre.rating > act.rating
                        ? pre : act
                }, {});
            }

            //Set new subs
            this.setState({
                movieSubs: res.subtitles,
                movieInfo: _movieInfo,
                movieSelectedSub: this.props.match.params.sub
            });

        }).catch((d)=> {
            console.log(d);
        })
    }

    onProgress(percent, state) {
        //Change state
        this.setState({
            state: state,
            percent: percent
        })
    }

    onReady(url, flix) {

        //Interval to check for swarm info
        this.timeout = setInterval(()=> {
            this.setState({
                movieStat: {
                    dSpeed: (flix.swarm.downloadSpeed() / 1024).toFixed(2),
                    uSpeed: (flix.swarm.uploadSpeed() / 1024).toFixed(2),
                    dLoaded: parseInt(((flix.swarm.cachedDownload + flix.swarm.downloaded) / 1024) / 1024, 10),
                    fSize: parseInt((flix.fileSize / 1024) / 1024, 10),
                    aPeers: (flix.swarm.wires.filter(function (w) {
                        return !w.peerChoking
                    }).length).toString()
                }
            })
        }, 1000);


        //Change state
        this.setState({
            state: 'Fetching Subtitles',
            percent: 100
        })
    }

    onCanPlay(url, flix) {
        this.setState({
            canPlay: true
        })
    }

    onClose() {
        //Log
        logHelper.warn('STREAMING STOPPED');
        //Stop Torrent
        Streamer.stopTorrent();
        //Stopped
        this.setState({
            stopped: true
        });

        //Stop watching for flix
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        //Redirect
        setTimeout(()=> {
            location.href = '#/app/movie/' + this.state.movieInfo.imdb_code
        }, 1000);
    }

    toggleView(e) {
        //Change state
        this.setState({
            toggle_screen: !this.state.toggle_screen
        })
    }

    render() {
        return (
            <div className="movie-player full-width full-height">
                {
                    (
                        !this.state.canPlay &&
                        <div className="absolute full-width full-height player-overlay-loader">
                            <AppMoviePlayerLoader
                                stateText={this.state.state}
                                statePercent={this.state.percent}
                                onClose={(e)=>{this.onClose(e)}}
                            />
                        </div>
                    )
                }

                {
                    (
                        this.state.movieInfo &&
                        <section
                            className={`absolute full-height clearfix video-stream ${this.state.toggle_screen && 'video-stream-fixed'}`}>
                            {/*Close button*/}
                            <BtnClose onClose={()=>{this.onClose()}}/>

                            {/*Movie torrent info*/}
                            {
                                (
                                    this.state.movieStat && this.state.canPlay &&
                                    <header className="row absolute z-index-100 top-2-vh left-2-vw clearfix">
                                        <div className="row">
                                            <h4 className="white-text bold font-type-titles">
                                                {this.state.movieInfo.title}
                                            </h4>
                                        </div>
                                        <div>
                                            <AppMoviesPlayerSwarm
                                                swarm={Object.assign({},
                                                    this.state.movieStat, {sub:this.state.movieSelectedSub}
                                                )}
                                            />
                                        </div>
                                    </header>
                                )
                            }

                            {/*Main player*/}
                            {/*
                             <div className="full-width full-height">*/}
                            <div className="full-height movie-box">
                                <AppMoviePlayer
                                    torrent={this.state.movieInfo.torrent}
                                    subs={this.state.movieSubs}
                                    sub_selected={this.state.movieSelectedSub}
                                    onProgress={(p,s)=>{this.onProgress(p,s)}}
                                    onReady={(u, flix)=>{this.onReady(u, flix)}}
                                    onCanPlay={(u)=>{this.onCanPlay(u)}}
                                />
                            </div>

                            {
                                !this.state.toggle_screen && this.state.canPlay &&
                                <AppMoviePlayerChatToggle
                                    onToggle={(e)=> this.toggleView(e)}
                                    icon="icon-chat"
                                />
                            }
                        </section>

                    )
                }

                {/*Chat box*/}
                {
                    this.state.canPlay && this.state.movieInfo &&
                    <div className={`chat-box full-height ${this.state.toggle_screen && 'chat-box-fixed'}`}>
                        {
                            this.state.toggle_screen &&
                            <AppMoviePlayerChatToggle
                                onToggle={(e)=> this.toggleView(e)}
                                icon="icon-chat"
                            />
                        }
                        {
                            this.state.toggle_screen &&
                            <AppMoviePlayerChatHeader
                                onClose={(e)=> this.toggleView(e)}
                                channel={this.state.movieInfo.title}
                            />

                        }
                        {
                            this.state.toggle_screen &&
                            <AppMoviePlayerChat
                                channel={this.state.movieInfo.imdb_code}
                            />
                        }
                    </div>
                }

                {/*Loader box*/}
                { this.state.stopped && <MainLoader />}
            </div>
        )
    }
}

