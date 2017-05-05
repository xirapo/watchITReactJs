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
            height: 230
        }
    }

    handleImageLoaded(e) {
        this.setState({
            status: 1,
            loaded: true
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
                        alt="" className="center-block responsive-img"
                        src="/src/media/img/layout/default_poster.jpg"
                    />
                }

                {
                    /*Spinner loader*/
                    this.state.status == 0
                    && <PulseLoader className="center-block margin-top-50-p margin-bottom-50-p width-30-p responsive-img"/>
                }

                {
                    /*The image*/
                    <img
                        className={(this.state.loaded && "loaded-img responsive-img visible" || "locked-img invisible")}
                        src={this.props.src}
                        onLoad={(e)=>this.handleImageLoaded(e)}
                        onError={(e)=>{this.handleImageError(e)}}
                    />
                }
            </figure>

        )
    }
}
