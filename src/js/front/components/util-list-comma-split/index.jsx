import React from 'react'

export default class ListCommaSplit extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            list: React.PropTypes.array.isRequired
        }
    }

    render() {
        return (
            <div className="col l12 m12 s12 truncate">
                {
                    this.props.list.map((i, k)=> {
                        return (
                            <span className="separated-comma flow-text font-size-22 blue-grey-text" key={k}>
                                {i}
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}
