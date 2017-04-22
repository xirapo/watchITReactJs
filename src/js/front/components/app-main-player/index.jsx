import React from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'


export default class AppMoviesPlayer extends React.Component {
    constructor(props) {
        super(props);

        //Binding context to methods
        this.onReady = this.onReady.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onError = this.onError.bind(this);

        //Initial State
        this.state = {
            canPlay: false
        }
    }

    static get propTypes() {
        return {
            torrent: PropTypes.string.isRequired
        }
    }

    componentDidMount() {
        Streamer.playTorrent(
            this.props.torrent,
            this.onReady,
            this.onProgress,
            this.onError
        );

        this.player = videojs(this.videoNode, {
            autoplay: true,
            preload: true,
            controls:true
        }, function onPlayerReady() {
            console.log('onPlayerReady', this)
        });

    }


    onReady(url, flix) {

        this.setState({
            url: url,
            canPlay: true
        });

        //Handle ready
        if (this.props.onReady) {
            this.props.onReady(url, flix);
        }
    }

    onProgress(flix, percent, state) {

        //Handle progress
        if (this.props.onProgress) {
            this.props.onProgress(
                parseInt(percent), state, flix
            );
        }
    }

    onError(e) {

        //Handle error
        if (this.props.onError) {
            this.props.onError(e);
        }
    }

    render() {
        return (
            (

                <div className={this.state.canPlay && "left relative full-height full-width" || "invisible"}>
                    <video
                        src={this.state.url}
                        ref={ node => this.videoNode = node }
                        className=" vjs-matrix video-js full-width full-height"
                    />
                </div>
            )
        )
    }
}
