import React from 'react'
export default class AppMoviesPlayerLoader extends React.Component {
    constructor(props) {
        super(props);
    }


    static get propTypes() {
        return {
            stateText: React.PropTypes.string.isRequired,
            statePercent: React.PropTypes.number.isRequired
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
                        <h4 className="font-type-content white-text">
                            {this.props.stateText}
                        </h4>
                    </div>
                    <div className="absolute full-width no-left">
                        <div className={"progress amber lighten-1 width-" + this.props.statePercent + '-p'}>
                            <div className="determinate amber darken-4"></div>
                        </div>
                    </div>
                    <div className="relative top-10 text-center">
                        <h1 className="font-type-content white-text">
                            {this.props.statePercent}%
                        </h1>
                    </div>

                    <a href="javascript:void(0);" onClick={(e)=>this.onClose(e)}
                       className="btn-close clearfix font-size-45 top-15 right-10">
                        <i className="icon-cross white-text"/>
                    </a>
                </div>
            </div>
        )
    }
}
