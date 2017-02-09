import React from 'react'
import AppMoviePlayer from '../../components/app-main-player/index.jsx'
import AppMoviePlayerLoader from '../../components/app-main-player-loader/index.jsx'

//Login view class
export default class MoviePlayer extends React.Component {
    constructor(props) {
        super(props);

        //Decode string and pass to json object
        this.state = {
            state: 'Connecting',
            percent: 0,
            canPlay: false,
            movieInfo: JSON.parse(
                (new Buffer(
                    this.props.params.torrent, 'base64'
                ).toString())
            )
        };
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
                            />
                        </div>
                    )
                }
                <section className="absolute full-width full-height clearfix video-stream">
                    <AppMoviePlayer
                        torrent={this.state.movieInfo.torrent}
                        onProgress={(p,s)=>{this.onProgress(p,s)}}
                        onReady={(u)=>{this.onReady(u)}}
                    />
                </section>
            </div>
        )
    }
}