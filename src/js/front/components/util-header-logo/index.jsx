import React from 'react'

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            size: '50'
        }
    }

    render() {
        return (
            <h2 className={"no-margin font-type-titles font-size-" + this.props.size}>
                <span className="white-text">watch</span>
                <strong className="loader-text">IT</strong>
            </h2>
        )
    }
}
