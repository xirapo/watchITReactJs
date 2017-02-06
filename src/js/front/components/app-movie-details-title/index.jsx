import React from 'react'

export default class AppMovieDetailTitle extends React.Component {
    constructor(props) {
        super(props);

    }

    static get defaultProps() {
        return {
            color: 'white',
            size: 50
        }
    }


    render() {
        return (
            <div className="col l12 m12 s12">
                <h3 className={this.props.color + "-text margin-top-0 font-type-titles font-size-" + this.props.size + " padding-bottom-5 truncate"}>
                    {this.props.children}
                </h3>
            </div>
        )
    }
}
