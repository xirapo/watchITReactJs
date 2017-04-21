//Basic
import React from 'react'
import PropTypes from 'prop-types'
//Components
import MainLoader from '../../../components/util-main-loader/index.jsx'
import FormBox from '../../../components/app-form/index.jsx'
import Logo from '../../../components/util-header-logo/index.jsx'
//Require for auth
//Default settings
import Auth from '../../../../resources/database/auth'
import Setting from '../../../../backend/settings'


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
                name: "email",
                icon: 'icon-email'
            }, {
                type: 'password',
                placeholder: "password",
                name: "password",
                icon: 'icon-dial-pad'
            }],
            //Buttons lists
            buttons: [{
                type: 'submit',
                text: 'login',
                size: 'm6 l6'
            }, {
                type: 'reset',
                text: 'reset',
                color: 'red',
                size: 'm6 l6'
            }]
        };

    }

    static get contextTypes() {
        return {
            router: PropTypes.object
        }
    }

    handleRequest(fields) {

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
            //Set state 
            this.setState({
                error: false,
                submitted: false,
                success: true
            });

            //Redirect
            setTimeout(()=> {
                //Redirect to main app
                this.context.router.history.push(
                    Setting.appView
                )
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
        return (<div className="absolute valign-wrapper full-width full-height">
                <section className="valign center-block col l4 m6">
                    <header className="row">
                        <div className="center-block text-center col l6 m6">
                            <Logo size="60"/>
                        </div>
                    </header>

                    {/* Form Box */}
                    <section className="row">
                        <FormBox
                            action={(res)=> this.handleRequest(res)}
                            input={this.state.inputs} // Make inputs
                            buttons={this.state.buttons} // Make buttons
                            error={this.state.error}
                            submitted={this.state.submitted}
                        />
                    </section>

                    {/*Main Loader*/}
                    {(this.state.success) && <MainLoader />}
                </section>
            </div>
        )
    }
}
