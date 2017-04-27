import React from 'react'
import PropTypes from 'prop-types'

export default class BoxAlert extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            size: 'm12 l12',
            label: 'error-label'
        }
    }
    

    render() {
        return (
            <div className={"col " + this.props.size}>
                <div className={"bold z-depth-1 lighten-2 text-center " + this.props.label}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
