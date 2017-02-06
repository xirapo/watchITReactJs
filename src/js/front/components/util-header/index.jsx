import React from 'react'
import Logo from '../util-header-logo/index.jsx'

export default class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            action: '#/'
        }
    }

    render() {
        return (
            <nav className="col s12 l12 m12 transparent z-depth-1">
                <div className="nav-wrapper vertical-padding">
                    <div className="col l2 m2 s3">
                        <Logo size="35"/>
                    </div>
                    <a href={this.props.action} className="btn-close btn-close-video clearfix">
                        <i className="icon-cross font-size-45 white-text"/>
                    </a>
                </div>
            </nav>
        )
    }
}
