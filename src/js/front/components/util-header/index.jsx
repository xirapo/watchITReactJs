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
            <header className="row vertical-padding transparent z-depth-1 clearfix">
                <div className="col l2 m2 s3">
                    <Logo/>
                </div>
                <a href={this.props.action} className="btn-close btn-close-video clearfix">
                    <i className="icon-cross font-size-45 white-text"/>
                </a>
            </header>
        )
    }
}
