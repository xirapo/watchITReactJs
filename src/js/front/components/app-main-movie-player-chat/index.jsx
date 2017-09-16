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
            value: null,
            user: null,
            flag: null,
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
            this.channel.limitToLast(
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
        let _oldMessages = resHelper.snapshotIterToArray(
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

    sendMessage(e, input) {
        //If enter
        if (e.keyCode == 13) {
            //Outgoing message
            let _message = e.target.value;

            //If valid input
            //if (utilHelper.validString(_message)) {
            //Pushing messahes to channel
            this.channel.push().set({
                message: _message,
                user: {
                    name: this.state.user.displayName,
                    thumb: this.state.user.photoURL,
                    id: this.state.user.uid
                },
                timestamp: timeHelper.unixNowTimeZoned(
                    this.state.user.settings.timezone
                )
            }).then(()=> {
                //what?
                //Log
                this.setState({value: ''});
                logHelper.info('\nNEW MESSAGE SENT TO CHANNEL:' + this.props.channel);
            })
            //}
        }
    }


    onNewMessage(e) {
        //Incoming message
        let _newMessage = e.val();
        let _user = _newMessage.user;

        //Set new state
        this.setState({
            flag: _user.uid,
            chats: this.state.chats.concat(
                [_newMessage]
            )
        })
    }

    render() {
        return (
            <div className="relative full-height full-width">
                <div className="full-height absolute bottom-0 full-width">

                    {
                        <div className="chat-list vertical-padding clearfix">
                            {
                                this.state.chats.map((v, i)=> {
                                    return (
                                        <ChatItem
                                            key={i}
                                            message={v.message}
                                            name={v.user.name}
                                            photo={v.user.thumb}
                                            uid={v.user.id}
                                            flagSet={this.state.flag}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                    {
                        this.state.user &&
                        <div className="col l12 m12">
                            <BoxInput
                                onKeyDown={(e)=> this.sendMessage(e)}
                                placeholder="Write a message..."
                                value={this.state.value}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}
