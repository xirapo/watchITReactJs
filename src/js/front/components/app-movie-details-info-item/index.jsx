import React from 'react'

export default class AppMovieDetailInfoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            color: React.PropTypes.string.isRequired,
            align: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string.isRequired
        }
    }


    render() {
        return (
            <strong className={this.props.color + "-text flow-text " + this.props.align + "-align"}>
                <i className={"top-3 normalize-medium-icon small left margin-right-10 icon-" + this.props.icon}/>
                {this.props.children}
            </strong>
        )
    }
}
