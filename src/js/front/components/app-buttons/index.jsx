import React from 'react'
import BarLoader from '../util-bar-loader/index.jsx'

export default class BoxButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            clicked: false,
            type: 'button'
        }
    }

    render() {
        return (
            <button
                type={this.props.type}
                className={"text-lowercase full-width waves-effect waves-light btn " + this.props.className}
                onClick={this.props.onClick}
            >
                {
                    /*If click*/
                    this.props.type == "submit"
                    && this.props.clicked && <BarLoader />
                    || this.props.children
                }
            </button>
        )
    }
}
