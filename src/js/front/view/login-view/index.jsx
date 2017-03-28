import React from 'react'
import {render} from 'react-dom'

import MainLoader from '../../components/util-main-loader/index.jsx'
import FormBox from '../../components/form-box/index.jsx'
import Logo from '../../components/util-header-logo/index.jsx'

//Require for request
var setting = require('../../../backend/settings');

//Login view class
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        //Initial State
        this.state = {
            //Inputs lists
            loading: true,
            success: false,
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

    componentDidMount() {
        //Logged, go in
        if (!localStorage.getItem('token')) {
            this.setState({loading: false});
            return false;
        } else {
            // else redirect
            location.href = 'app://host/src/app.html'
        }
    }


    handleRequest(res) {
        //If has data result
        if ('data' in res) {
            if (res.data.token) {
                //Save token
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', res.data.user_id);
                this.setState({success: true});

                //After a second
                setTimeout(()=> {
                    //Redirect to main app
                    location.href = 'app://host/src/app.html'
                }, 1000)
            }
        }
    }

    render() {
        return (
            !this.state.loading
            && <div className="absolute valign-wrapper full-width full-height">
                <section className="valign center-block col l4 m6">
                    <header className="row">
                        <div className="center-block text-center col l6 m6">
                            <Logo size="60"/>
                        </div>
                    </header>

                    {/* Form Box */}
                    <section className="row">
                        <FormBox
                            method='post'
                            request={setting.wtAPI.auth}
                            input={this.state.inputs}
                            buttons={this.state.buttons}
                            handleRequest={(res)=> this.handleRequest(res)}
                        />
                    </section>

                    {/*Main Loader*/}
                    {(this.state.success) && <MainLoader />}
                </section>
            </div>
        )
    }
}

//Render
render((
    <LoginForm />
), document.getElementById('main_app'));