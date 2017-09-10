//Basic
import React from 'react'
//Components
import BoxLoader from 'front/components/util-box-loader/index.jsx'
import MainHeader from 'front/components/util-header/index.jsx'
import FormBox from 'front/components/app-form/index.jsx'
import BoxImage from 'front/components/app-image/index.jsx'
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
        //Invite status
        this.state['submitted_invite'] = false;

        //Update states
        this.state['submitted_update'] = false;
        this.state['error_update'] = false;

    }


    componentDidMount() {
        //Clean global cache
        cleanFormCache();

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
            });

        }).catch((e)=> {
            console.log(e);
        })
    }


    handleRequestUpdate(res) {
        //Initial state after submit
        this.setState({
            error_update: false,
            submitted_update: true,
            updated: false
        });

        //Request for update
        this.user.update(
            res, this.props.match.params.id, //user id
            this.auth.token
        ).then((r)=> {
            this.setState({
                submitted_update: false,
                updated: 'User updated'
            });
        }).catch((err)=> {
            this.setState({
                error_update: err,
                submitted_update: false
            })
        })

    }

    render() {
        return (
            this.state.user
            && <div className="row relative full-height">
                {/*Close button*/}
                <MainHeader text="Profile"/>
                <section className="col l12 m12 clearfix full-height">
                    {/* Image uploader */}
                    {
                        <section className="col l4 m4 input-black-box">
                            <h5 className="white-text">
                                <i className="icon-edit margin-right-10"/>
                                Upload Picture
                            </h5>
                            <div className="margin-top-2-rem clearfix">
                                <BoxImage
                                    src={this.state.user.profile_pic_middle}
                                />
                            </div>
                        </section>
                    }

                    {/*Main Loader or Movie details*/}
                    {
                        <section className="col l4 m4 input-black-box">
                            <h5 className="white-text">
                                <i className="icon-edit margin-right-10"/>
                                Edit Profile
                            </h5>
                            <FormBox
                                action={(res)=> this.handleRequestUpdate(res)}
                                input={this.state.user_new_or_update.inputs} // Make inputs
                                buttons={this.state.user_new_or_update.buttons} // Make buttons
                                submitted={this.state.submitted_update}
                                error={this.state.error_update}
                                success={this.state.updated}
                            />
                        </section>

                    }

                    {
                        <section className="col l4 m4 input-black-box">
                            <h5 className="white-text">
                                <i className="icon-message margin-right-10"/>
                                Invite a friend
                            </h5>
                            <FormBox
                                action={(res)=> this.handleRequest(res)}
                                input={this.state.invite_user.inputs} // Make inputs
                                buttons={this.state.invite_user.buttons} // Make buttons
                                submitted={this.state.submitted_invite}
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