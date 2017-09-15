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
import firebase from 'backend/firebase'

export default class AppMoviesPlayerChat extends React.Component {
    constructor(props) {
        super(props);
        //Auth user
        this.auth = new Auth();
        //Binding
        this.onNewMessage = this.onNewMessage.bind(this);
        this.readOldMessage = this.readOldMessage.bind(this);
        //Initialize database
        this.database = firebase.database();
        //Firebase ref
        this.ref = null;
        this.channel = null;
        //Chat list
        this.state = {
            user: null,
            chats: []
        }

    }

    static get propTypes() {
        return {
            channel: PropTypes.string.isRequired
        }
    }

    componentDidMount() {
        //Make reference to real time database
        this.ref = this.database.ref('movie/chat/');
        this.channel = this.ref.child(this.props.channel);

        //Log
        logHelper.info(
            '\nINITIALIZING CHAT AND LOADING OLD CHATS FOR CHANNEL:' + this.props.channel
        );

        //Handle logged user
        this.auth.authUser.then((user)=> {
            //Event listeners for new incoming message
            this.channel.on('child_added', this.onNewMessage);
            //Read old messages
            this.ref.limitToLast(
                user.settings.max_old_chats
            ).once('value', this.readOldMessage);

            //Change state
            this.setState({
                user: user
            })
        })


    }

    readOldMessage(snapshot) {
        //old messages
        let _oldMessages = resHelper.snapshotToArray(
            snapshot
        );

        //Log
        logHelper.ok(
            '\nLOADED ' + _oldMessages.length + ' MESSAGES FOR CHANNEL: ' + this.props.channel
        );

        //Init
        this.setState({
            chats: _oldMessages
        })
    }

    sendMessage(e) {
        //If enter
        if (e.keyCode == 13) {
            this.ref.push().set({
                message: e.target.value,
                user: {name: this.user.displayName, thumb: this.user.photoURL, id: this.user.uid},
                timestamp: timeHelper.unixNowTimeZoned(
                    this.state.user.settings.timezone
                )
            }).then(()=> {
                //what?
                //Log
                logHelper.info(
                    '\nNEW MESSAGE SENT TO CHANNEL:' + this.props.channel
                );
            })
        }
    }


    onNewMessage(e) {
        this.setState({
            chats: this.state.chats.concat(
                e.val()
            )
        })
    }

    render() {
        return (
            <div className="left relative full-height full-width">
                <div className="height-80-p full-width">

                    {
                        <div className="chat-list">
                            {
                                this.state.chats.map((v, i)=> {
                                    return (
                                       <ChatItem key={i}>
                                           {v.message}
                                       </ChatItem>
                                    )
                                })
                            }
                        </div>
                    }
                    {
                        this.state.user &&
                        <BoxInput
                            onKeyDown={(e)=> this.sendMessage(e)}
                            placeholder="Write a message..."
                        />
                    }
                </div>
            </div>
        )
    }
}
