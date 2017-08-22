//Basic
import React from 'react'
//Components
import BoxLoader from 'front/components/util-box-loader/index.jsx'
import MainHeader from 'front/components/util-header/index.jsx'
import FormBox from 'front/components/app-form/index.jsx'
//Require for auth
//Database (Api Handler)
import Auth from 'resources/database/auth'
import User from 'resources/database/user'
import Forms from './forms.js'

//Login view class
export default class MainMovie extends React.Component {
    constructor(props) {
        super(props);
        //Auth object
        this.auth = new Auth();
        this.user = new User();

        //this.movie = new Movie();
        //Default state
        this.state = Forms;
        this.state['submitted_update'] = false;

    }


    componentDidMount() {
        // //Movie details
        this.user.get(
            this.props.match.params.id, //imdb code
            this.auth.token
        ).then((r)=> {

            //Set value for inputs in edit form
            this.state.user_new_or_update.inputs.forEach((i, v)=> {
                if (i['name'] in r) {
                    i['value'] = r[i['name']];
                }
            });

            //Change state for user
            this.setState({
                user: r
            })
        }).catch(()=> {
        })
    }


    handleRequestUpdate(res) {
        //Set first state
        this.setState({
            error: false,
            submitted_update: true
        });
        console.log(res);
    }

    render() {
        return (
            this.state.user
            && <div className="row relative full-height">
                {/*Close button*/}
                <MainHeader text="Profile"/>
                <section className="col l12 m12 clearfix full-height">
                    {/*Main Loader or Movie details*/}
                    {
                        <section className="col l6 m6 input-black-box">
                            <h5 className="white-text">
                                <i className="icon-edit margin-right-10"/>
                                Edit Profile
                            </h5>
                            <FormBox
                                action={(res)=> this.handleRequestUpdate(res)}
                                input={this.state.user_new_or_update.inputs} // Make inputs
                                buttons={this.state.user_new_or_update.buttons} // Make buttons
                                submitted={this.state.submitted_update}
                            />
                        </section>

                    }

                    {
                        <section className="col l6 m6 input-black-box">
                            <h5 className="white-text">
                                <i className="icon-message margin-right-10"/>
                                Invite a friend
                            </h5>
                            <FormBox
                                action={(res)=> this.handleRequest(res)}
                                input={this.state.invite_user.inputs} // Make inputs
                                buttons={this.state.invite_user.buttons} // Make buttons
                                submitted={this.state.submitted_update}
                            />
                        </section>
                    }
                </section>
            </div> || <div className="row relative full-height">
                <BoxLoader size="100"/>
            </div>
        )
    }
}