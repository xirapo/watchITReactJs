import React from 'react'
import PropTypes from 'prop-types'

export default class AppMoviesPlayerLoader extends React.Component {
    constructor(props) {
        super(props);
    }


    static get propTypes() {
        return {
            stateText: PropTypes.string.isRequired,
            statePercent: PropTypes.number.isRequired,
            movieInfo: PropTypes.object.isRequired
        }
    }

    onClose(e) {
        if (this.props.onClose) {
            this.props.onClose(e);
        }
    }

    render() {
        return (
            <div className="output-process valign-wrapper full-width full-height">
                <div className="center-block valign">
                    <div>
                        <h4 className="font-type-titles white-text">
                            {this.props.stateText}
                        </h4>
                    </div>
                    <div className="absolute full-width no-left">
                        <div className={"progress amber lighten-1 width-" + this.props.statePercent + '-p'}>
                            <div className="determinate amber darken-4"></div>
                        </div>
                    </div>
                    <div className="relative top-10 text-center">
                        <h1 className="font-type-titles white-text">
                            {this.props.statePercent}%
                        </h1>
                    </div>
                    {/*
                    <h1 className="white-text font-type-titles absolute clearfix font-size-25 top-15 left-30">
                        {this.props.movieInfo.title}
                    </h1>
                    */}
                    <a href="javascript:void(0);" onClick={(e)=>this.onClose(e)}
                       className="btn-close clearfix font-size-45 top-15 right-10">
                        <i className="icon-cross white-text"/>
                    </a>
                </div>
            </div>
        )
    }
}
