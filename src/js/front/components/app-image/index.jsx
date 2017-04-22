import React from 'react'
import PropTypes from 'prop-types'
import PulseLoader from '../../components/util-pulse-loader/index.jsx'

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
            <figure className="clearfix no-margin">
                {
                    /*No poster found*/
                    this.state.status < 0 && <img
                        alt="" className="center-block margin-top-1 responsive-img"
                        src="app://host/src/media/img/layout/default_poster.jpg"
                    />
                }

                {
                    /*Spinner loader*/
                    this.state.status == 0
                    && <PulseLoader className="center-block margin-top-52-p responsive-img"/>
                }

                {
                    /*The image*/
                    <img
                        className={(this.state.loaded && "responsive-img poster-main-view" || " hide")}
                        src={this.props.src}
                        onLoad={(e)=>this.handleImageLoaded(e)}
                        onError={(e)=>{this.handleImageError(e)}}
                    />
                }
            </figure>

        )
    }
}
