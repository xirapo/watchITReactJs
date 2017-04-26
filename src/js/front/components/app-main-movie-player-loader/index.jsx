import React from 'react'
import PropTypes from 'prop-types'

export default class AppMoviesPlayerLoader extends React.Component {
    constructor(props) {
        super(props);
    }


    static get propTypes() {
        return {
            stateText: PropTypes.string.isRequired,
            statePercent: PropTypes.number.isRequired
        }
    }
    

    render() {
        return (
            <div className="output-process valign-wrapper full-width full-height">
                <div className="center-block valign">
                    <div>
                        <h3 className="font-type-titles align-center white-text">
                            {this.props.stateText}
                        </h3>
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
                   
                </div>
            </div>
        )
    }
}
