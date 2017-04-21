import React from 'react'
import PropTypes from 'prop-types'
import PulseLoader from '../../components/util-pulse-loader/index.jsx'

export default class MoviePoster extends React.Component {

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

    handleImageLoaded(e) {
        this.setState({
            status: 1,
            loaded: true
        });
    }

    handleImageError(e) {
        this.setState({
            status: -1
        });
    }

    render() {
        return (
            <div className="clearfix">
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
                    && <PulseLoader className="center-block margin-top-50-p responsive-img"/>
                }

                {
                    /*The image*/
                    <img
                        className={(this.state.loaded && " responsive-img poster-main-view" || " hide")}
                        src={this.props.src}
                        onLoad={(e)=>this.handleImageLoaded(e)}
                        onError={(e)=>{this.handleImageError(e)}}
                    />
                }
            </div>

        )
    }
}
