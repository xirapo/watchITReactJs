import React from 'react'

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
            <header className="row vertical-padding horizontal-padding transparent z-depth-1 clearfix">
                <div className="col l6 m6">
                    <h5 className="white-text bold">
                        {
                            this.props.icon && <i className={`${this.props.icon} margin-right-1-rem normalize-small-icon`}/>
                        }

                        {this.props.text}
                    </h5>
                </div>
                <a href={this.props.action} className="top-0 right">
                    <i className="icon-cross font-size-45 white-text"/>
                </a>
            </header>
        )
    }
}
