//Basic
import React from 'react'

export default class AppMoviesPlayerChatToggle extends React.Component {
    constructor(props) {
        super(props);

    }

    static get defaultProps() {
        return {
            icon: 'text',
        }
    }

    onToggle(e) {
        if (this.props.onToggle)
            this.props.onToggle(e);
    }

    render() {
        return (
            <div onClick={(e)=> this.onToggle(e)}
                 className="btn btn-small btn-floating transparent chat-box-toggle">
                <i className={`${this.props.icon} loader-text`}/>
            </div>
        )
    }
}
