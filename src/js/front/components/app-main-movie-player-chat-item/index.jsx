//Basic
import React from 'react'
import PropTypes from 'prop-types'


export default class AppMoviesPlayerChatItem extends React.Component {
    constructor(props) {
        super(props);

    }

    static get propTypes() {
        return {
            message: PropTypes.string.isRequired
        }
    }

    
    render() {
        return (
            (
                <article className="row">
                    <div className="col l12 m12">
                        {this.props.child}
                    </div>
                </article>
            )
        )
    }
}
