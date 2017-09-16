//Basic
import React from 'react'
import PropTypes from 'prop-types'
import BoxInput from 'front/components/app-inputs/index.jsx'
import ChatItem from 'front/components/app-main-movie-player-chat-item/index.jsx'
//Auth users
import Auth from 'resources/database/auth'
//Helpers
import timeHelper from 'resources/helpers/timeHelper'
import logHelper from 'resources/helpers/logHelper'
import resHelper from 'resources/helpers/responseHelper'
import utilHelper from 'resources/helpers/utilHelper'
import firebase from 'backend/firebase'

export default class AppMoviesPlayerChatHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    onClose(e) {
        if(this.props.onClose)
            this.props.onClose(e);
    }

    render() {
        return (
            <header className="row margin-bottom-0 vertical-padding chat-box-header">
                <div className="col l9 m9">
                    <h5 className="white-text margin-top-8 truncate bold">
                        {/*this.state.movieInfo.imdb_code*/}
                        Live Chat
                    </h5>
                </div>
                <div className="col l3 m3">
                    <div onClick={(e)=> this.onClose(e)}
                         className="btn btn-small btn-floating transparent waves-effect waves-light chat-box-init-stop">
                        <i className="icon-cross white-text"/>
                    </div>
                </div>
            </header>
        )
    }
}
