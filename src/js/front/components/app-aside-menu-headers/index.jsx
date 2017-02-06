import React from 'react'

export default class AppMenuHeaders extends React.Component {
    constructor(props) {
        super(props);
    }
    

    static get propTypes() {
        return {
            content: React.PropTypes.string.isRequired
        }
    }

    render() {
        return (
            <div className={"row " + this.props.className}>
                <div className="col l10 m9">
                    <strong className="font-light-gray bold">
                        {this.props.content}
                    </strong>
                </div>
                {
                    this.props.action && <div className="col l2 m3 text-center">
                        <a href="#w" className="tooltip">
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
