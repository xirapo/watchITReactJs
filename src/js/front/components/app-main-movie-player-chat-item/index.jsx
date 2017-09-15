//Basic
import React from 'react'
import PropTypes from 'prop-types'
import BoxInput from 'front/components/app-inputs/index.jsx'
//Auth users
import Auth from 'resources/database/auth'
//Helpers
import logHelper from 'resources/helpers/logHelper'
import firebase from 'backend/firebase'

export default class AppMoviesPlayerChat extends React.Component {
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
                <div className="left relative full-height full-width">
                    <div className="height-80-p full-width">
                        <div className="chat-list">
                            {
                                
                            }
                        </div>
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
        )
    }
}
