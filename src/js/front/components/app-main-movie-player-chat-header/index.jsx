//Basic
import React from 'react'

export default class AppMoviesPlayerChatHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    onClose(e) {
        if (this.props.onClose)
            this.props.onClose(e);
    }

    render() {
        return (
            <header className="row margin-bottom-0 vertical-padding chat-box-header">
                <div className="col l12 m12">
                    <strong className="white-text margin-top-8 truncate bold">
                        {/*this.state.movieInfo.imdb_code*/}
                        Channel {this.props.channel}
                    </strong>
                </div>
            </header>
        )
    }
}
