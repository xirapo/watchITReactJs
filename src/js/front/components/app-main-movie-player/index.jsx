import React from 'react'
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

    static get defaultProps() {
        return {
            subs: {}
        }
    }

    static get propTypes() {
        return {
            torrent: PropTypes.string.isRequired
        }
    }

    componentDidMount() {

        //Videojs
        this.player = videojs(
            this.videoNode, {
                autoplay: true,
                preload: true,
                controls: false
            }, () => {

                //When player load
                this.player.one('loadedmetadata', ()=> {
                    //If has subs
                    if (this.props.subs) {
                        // for (let sub in this.props.subs) {
                        if ('spanish' in this.props.subs) {
                            //Convert to vtt
                            Sub.urlSrt2VttFile(
                                this.props.subs['spanish'].link
                            ).then((vtt)=> {
                                console.log('Adding remote ' + vtt);
                                let _elem = document.createElement('track');
                                _elem.src = vtt;
                                _elem.kind = "captions";
                                _elem.srclang = 'es';
                                _elem.label = 'Spanish';
                                _elem.mode = 'showing';
                                _elem.default = true;
                                this.videoNode.appendChild(_elem);
                            })
                        } else {
                            console.log('no spanish sub');
                        }
                    }
                });


                //When get ready to play;;
                this.player.on('canplay', ()=> {
                    //Set controls true
                    this.player.controls(true);

                    //Set canPlay
                    this.setState({
                        canPlay: true
                    });

                    //Handle ready
                    if (this.props.onCanPlay) {
                        this.props.onCanPlay(
                            this.state.url,
                            this.state.flix
                        );
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
            flix: flix
        });

        //Handle ready
        if (this.props.onReady) {
            this.props.onReady(
                url, flix
            );
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
                    <video ref={ node => this.videoNode = node }
                           src={this.state.url} autoPlay={true} controls={true}
                           className=" vjs-matrix video-js full-width full-height"
                    />
                </div>
            )
        )
    }
}
