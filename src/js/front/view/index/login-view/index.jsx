//Basic
import React from 'react'
import PropTypes from 'prop-types'
//Components
import MainLoader from 'front/components/util-main-loader/index.jsx'
import FormBox from 'front/components/app-form/index.jsx'
//Require for auth
import Auth from 'resources/database/auth'
//Default settings
import Setting from 'backend/settings'


//Login view class
export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        //Authentication
        this.auth = new Auth();

        //Initial State
        this.state = {
            //Inputs lists
            success: false,
            submitted: false,
            error: false,
            inputs: [{
                type: 'text',
                placeholder: "e-mail",
                autoComplete: 'nope',
                name: "email",
                icon: 'icon-email',
                size: 'm12 l12',
                required: true
            }, {
                type: 'password',
                placeholder: "password",
                autoComplete: 'nope',
                name: "password",
                icon: 'icon-dial-pad',
                size: 'm12 l12',
                required: true
            }],
            //Buttons lists
            buttons: [{
                type: 'submit',
                text: 'login',
                size: 'm6 l6'
            }]
        };

    }

    handleRequest(fields) {

        //Clean global cache
        cleanFormCache();

        //Set first state
        this.setState({
            error: false,
            submitted: true
        });

        //Try authenticate
        this.auth.authenticate(
            fields.email,
            fields.password
        ).then((r)=> {
            //Redirect
            setTimeout(()=> {
                //Redirect to main app
                location.href = '#' + Setting.appView;
            }, 1000)

        }).catch((e)=> {
            if ('data' in e) {
                this.setState({
                    error: e.data.status_message,
                    submitted: false
                })
            }
        });

    }

    render() {
        return (
            <div className="absolute valign-wrapper full-width full-height main-login-box">
                <section className="valign center-block col l4 m6">
                    {/* Form Box */}
                    <section className="row input-black-box">
                        <FormBox
                            action={(res)=> this.handleRequest(res)}
                            input={this.state.inputs} // Make inputs
                            buttons={this.state.buttons} // Make buttons
                            error={this.state.error}
                            submitted={this.state.submitted}
                        />
                    </section>
                </section>
            </div>
        )
    }
}
