//Basic
import React from 'react'
//Components
import AppMoviePlayer from '../../../components/app-main-movie-player/index.jsx'
import AppMoviePlayerLoader from '../../../components/app-main-movie-player-loader/index.jsx'
//Data
import Movie from '../../../../resources/database/movies'


//Login view class
export default class MoviePlayer extends React.Component {
    constructor(props) {
        super(props);

        //Movie
        this.movie = new Movie();

        //Decode string and pass to json object
        this.state = {
            state: 'Connecting',
            percent: 0,
            canPlay: false,
            movieSubs: null,
            movieInfo: JSON.parse(
                (new Buffer(
                    this.props.match.params.torrent, 'base64'
                ).toString())
            )
        };

        //Set subs
        this.movie.get(
            this.state.movieInfo.imdb_code
        ).then((res)=> {
            //Get better sub
            for (let s in res.subtitles) {
                res.subtitles[s] = res.subtitles[s].reduce((pre, act, i, arr)=> {
                    return pre.rating > act.rating ? pre : act
                }, {});
            }

            //Set new subs
            this.setState({
                movieSubs: res.subtitles
            })
            
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

    onReady(url) {
        this.setState({
            canPlay: true
        })
    }


    render() {
        return (
            <div>
                {
                    !this.state.canPlay && (
                        <div className="absolute full-width full-height player-overlay-loader">
                            <AppMoviePlayerLoader
                                stateText={this.state.state}
                                statePercent={this.state.percent}
                                movieInfo={this.state.movieInfo}
                            />
                        </div>
                    )
                }

                <section className="absolute full-width full-height clearfix video-stream">
                    <AppMoviePlayer
                        torrent={this.state.movieInfo.torrent}
                        subs={this.state.movieSubs}
                        onProgress={(p,s)=>{this.onProgress(p,s)}}
                        onReady={(u)=>{this.onReady(u)}}
                    />
                </section>
            </div>
        )
    }
}

