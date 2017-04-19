import React from 'react'
import PropTypes from 'prop-types'

export default class AppMenuProfileAvatar extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            fullname: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired
        }
    }

    render() {
        return (
            <div className="clearfix">
                <div className="col l3 m4 relative top-5 small-picture">
                    <figure>
                        <img src={this.props.picture} alt=""/>
                    </figure>
                </div>
                <div className="col l9 m8">
                    <div className="col l12 m12 truncate white-text">
                        <strong className="bold no-margin">{this.props.fullname}</strong>
                    </div>
                    <div className="col l12 m12 ">
                        <a href="#logout" className="font-size-tiny font-light-gray bold white-text">Log out</a>
                    </div>
                </div>
            </div>
        )
    }
}
