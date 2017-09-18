//Basic
import React from 'react'
import PropTypes from 'prop-types'
import AppTinyProfileAvatar from 'front/components/app-tiny-box-profile-avatar/index.jsx'

export default class AppMoviesPlayerChatItem extends React.Component {
    constructor(props) {
        super(props);

    }

    static get propTypes() {
        return {
            uid: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired
        }
    }


    render() {
        return (
            (
                // this.props.flag == this.props.uid &&
                <article className="row chat-item">
                    <AppTinyProfileAvatar
                        photo={this.props.photo}
                        allow_border={false}
                        size="l3 m3"
                    />

                    <div className="col l9 m9 item-text">
                        <div className="full-width">
                            <strong className="white-text">
                                {this.props.message}
                            </strong>
                        </div>
                        <div className="full-width margin-top-2">
                            <span className="grey-text">
                                {this.props.time}
                            </span>
                        </div>
                    </div>
                </article>
            )
        )
    }
}
