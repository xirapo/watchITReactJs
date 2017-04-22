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
        //The player
        this.player = videojs(
            'my-video', {
                autoplay: true,
                preload: true,
                controls: false
            }, () => {
                this.player.on('canplay', ()=> {
                    //Set controls true
                    this.player.controls(true);

                    //Handle ready
                    if (this.props.canPlay) {
                        this.props.canPlay(this.player);
                    }
                })
            }
        );

        //Start streamer
        Streamer.playTorrent(
            this.props.torrent,
            this.onReady,
            this.onProgress,
            this.onError
        );


    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    onReady(url, flix) {
        //Set url
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
                    <video id="my-video"
                           src={this.state.url}
                           className=" vjs-matrix video-js full-width full-height"
                    />
                </div>
            )
        )
    }
}
