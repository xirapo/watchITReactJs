import React from 'react'
import ReactPlayer from 'react-player'


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
            torrent: React.PropTypes.string.isRequired
        }
    }

    componentDidMount() {
        Streamer.playTorrent(
            this.props.torrent,
            this.onReady,
            this.onProgress,
            this.onError
        )
    }


    onReady(url, flix) {

        //Change state
        this.setState({
            canPlay: true,
            url: url
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
            this.state.canPlay && (
                <div className="left relative full-height">
                    <ReactPlayer
                        url={this.state.url}
                        playing width="100%" height="100%"
                        controls={true}
                    />
                </div>
            )
        )
    }
}
