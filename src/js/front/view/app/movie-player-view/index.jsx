//Basic
import React from 'react'
//Components
import AppMoviePlayer from '../../../components/app-main-movie-player/index.jsx'
import AppMoviePlayerLoader from '../../../components/app-main-movie-player-loader/index.jsx'
import MainLoader from '../../../components/util-main-loader/index.jsx'
//Data
import Movie from '../../../../resources/database/movies'


//Login view class
export default class MoviePlayer extends React.Component {
    constructor(props) {
        super(props);

        //Movie
        this.movie = new Movie();
        this.timeout = null;

        //Decode string and pass to json object
        this.state = {
            state: 'Connecting',
            percent: 0,
            canPlay: false,
            stopped: false
        };

    }

    componentDidMount() {
        //Decode param
        let _movieInfo = JSON.parse(
            (
                new Buffer(
                    this.props.match.params.torrent,
                    'base64'
                ).toString()
            )
        );

        //Set subs
        this.movie.get(
            _movieInfo.imdb_code
        ).then((res)=> {
            console.log(res.subtitles);

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
                movieInfo: _movieInfo
            });

        }).catch(()=> {
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
                    dSpeed: (flix.swarm.downloadSpeed() / 1024).toFixed(2) + ' kb/s',
                    uSpeed: (flix.swarm.uploadSpeed() / 1024).toFixed(2) + ' kb/s',
                    dLoaded: parseInt(((flix.swarm.cachedDownload + flix.swarm.downloaded) / 1024) / 1024) + ' mb',
                    fSize: parseInt((flix.fileSize / 1024) / 1024, 10) + ' mb',
                    aPeers: (flix.swarm.wires.filter(function (w) {
                        return !w.peerChoking
                    }).length).toString()
                }
            })
        }, 1000);


        //Change state
        this.setState({
            state: 'Ready',
            percent: 100
        })
    }

    onCanPlay(url, flix) {
        this.setState({
            canPlay: true
        })
    }

    onClose() {
        //Stop Torrent
        Streamer.stopTorrent();
        //Stopped
        this.setState({
            stopped: true
        });

        //Stop watching for flix
        clearTimeout(this.timeout);

        //Redirect
        setTimeout(()=> {
            location.href = '#/app/movie/' + this.state.movieInfo.imdb_code
        }, 1000);


    }


    render() {
        return (
            <div>

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
                        <section className="absolute full-width full-height clearfix video-stream">
                            {/*Close button*/}
                            <a href="javascript:void(0);" onClick={(e)=>this.onClose(e)}
                               className="btn-close clearfix font-size-45 top-15 right-10">
                                <i className="icon-cross white-text"/>
                            </a>

                            {/*Movie torrent info*/}
                            {
                                (
                                    this.state.movieStat &&
                                    <header className="row absolute z-index-100 top-2-p left-2-p clearfix">
                                        <div>
                                            <h4 className="white-text bold font-type-titles">
                                                {this.state.movieInfo.title}
                                            </h4>
                                        </div>
                                        <div>
                                            <ul>
                                                <li className="white-text">
                                                    <span className="bold">Peers: </span>
                                                    <span>{this.state.movieStat.aPeers}</span>
                                                </li>
                                                <li className="white-text">
                                                    <span className="bold">D/Speed: </span>
                                                    <span>{this.state.movieStat.dSpeed}</span>
                                                </li>
                                                <li className="white-text">
                                                    <span className="bold">U/Speed: </span>
                                                    <span>{this.state.movieStat.uSpeed}</span>
                                                </li>
                                                <li className="white-text">
                                                    <span className="bold">File Size: </span>
                                                    <span>{this.state.movieStat.fSize}</span>
                                                </li>
                                                <li className="white-text">
                                                    <span className="bold">Downloaded: </span>
                                                    <span>{this.state.movieStat.dLoaded}</span>
                                                </li>
                                            </ul>
                                        </div>

                                    </header>
                                )
                            }

                            {/*Main player*/}
                            <AppMoviePlayer
                                torrent={this.state.movieInfo.torrent}
                                subs={this.state.movieSubs}
                                onProgress={(p,s)=>{this.onProgress(p,s)}}
                                onReady={(u, flix)=>{this.onReady(u, flix)}}
                                onCanPlay={(u)=>{this.onCanPlay(u)}}
                            />
                        </section>
                    )
                }

                { this.state.stopped && <MainLoader />}
            </div>
        )
    }
}

