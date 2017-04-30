import React from 'react'

export default class AppMenuHeaders extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"row " + this.props.className}>
                <div className="col l9 m9">
                    <strong className="font-light-gray bold">
                        {this.props.children}
                    </strong>
                </div>
                {
                    this.props.action && <div className="col l3 m3 text-center">
                        <a href="#" className="tooltip">
                            <i className="icon-add-to-list top-2 relative font-light-gray tiny white-hover"/>
                                <span
                                    className="z-index-top font-size-small bold black-text top-tip grey lighten-1 border-grey-bottom">
                                    {this.props.action}
                                </span>
                        </a>
                    </div>
                }
            </div>
        )
    }
}
