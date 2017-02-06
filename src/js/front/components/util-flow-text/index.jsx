import React from 'react'

export default class FlowText extends React.Component {
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
            <div className="col l12 s12 m12">
                <p className="flow-text font-size-22 font-light-gray">
                    {this.props.content}
                </p>
            </div>
        )
    }
}
