import React from 'react'
import PropTypes from 'prop-types'
import PulseLoader from 'front/components/util-pulse-loader/index.jsx'

export default class BoxImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            loaded: false
        };
    }

    static get propTypes() {
        return {
            src: PropTypes.string.isRequired
        }
    }

    static get defaultProps() {
        return {
            allow_preload: true,
            placeholder: {
                w: 161,
                h: 250,
                c: false
            }
        }
    }

    handleImageLoaded(e, status = 1, loaded = true) {
        this.setState({
            status: status,
            loaded: loaded
        });

        //If need a hook :)
        if (this.props.handleImageLoaded) {
            this.props.handleImageLoaded(e)
        }
    }


    handleImageError(e) {
        this.setState({
            status: -1
        });
    }

    render() {
        return (
            <figure className="image-container no-margin">
                {
                    /*No poster found*/
                    this.state.status < 0 && <img
                        alt="" className={this.state.status > -2 ? "hidden" : "center-block responsive-img"}
                        src={ "http://lorempixel.com/" + this.props.placeholder.w + "/" + this.props.placeholder.h + (this.props.placeholder.c && "/abstract/NO IMAGE" ||"/abstract/" )}
                        onLoad={(e)=>this.handleImageLoaded(e, -2)}
                    />
                }

                {
                    /*Spinner loader*/
                    (this.props.allow_preload && this.state.status == 0 || (this.state.status < 0 && this.state.status > -2)) &&
                    <PulseLoader className="center-block margin-top-50-p margin-bottom-50-p width-30-p responsive-img"/>
                }

                {
                    /*The image*/
                    <img
                        className={this.state.status < 0 ? "hidden" : (this.state.loaded && "loaded-img responsive-img visible" || "locked-img invisible")}
                        src={this.props.src}
                        onLoad={(e)=>this.handleImageLoaded(e, 1)}
                        onError={(e)=>{this.handleImageError(e)}}
                    />

                }
            </figure>

        )
    }
}
