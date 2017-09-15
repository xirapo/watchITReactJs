//Basic
import React from 'react'
import firebase from 'backend/firebase'
//Components
import BoxLoader from 'front/components/util-box-loader/index.jsx'
import MainHeader from 'front/components/util-header/index.jsx'
import FormBox from 'front/components/app-form/index.jsx'
import BoxImage from 'front/components/app-image/index.jsx'
import BoxButton from 'front/components/app-buttons/index.jsx'
import BoxAlert from 'front/components/app-alerts/index.jsx'
import File from 'front/components/app-file/index.jsx'
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
        this.fileSelected = null;

        //this.movie = new Movie();
        //Default state
        this.state = Forms;
        //Invite status
        this.state['submitted_invite'] = false;
        //Image updated
        this.state['image_loaded'] = false;
        this.state['success_upload'] = false;
        this.state['submitted_upload'] = false;

        //Update states
        this.state['submitted_update'] = false;
        this.state['error_update'] = false;

    }


    componentDidMount() {
        //Clean global cache
        cleanFormCache();
        //Basic user data
        this.auth.authUser.then((user)=> {
            //Set value for inputs in edit form
            this.state.user_new_or_update.inputs.forEach((i, v)=> {
                if (i['name'] in user) {
                    i['value'] = user[i['name']];
                }
            });

            //Change state for user
            this.setState({
                user: user,
                photoURL: user.photoURL
            });
        });
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
            res
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

    handleImageChange(dir, file) {
        //Set new image on change
        this.setState({photoURL: dir});
        this.fileSelected = file;
    }

    handleRequestUpload(e) {

        let _storage = firebase.storage();
        let _ref = _storage.ref('user/images/' + this.state.user.uid);

        //If file selected field
        if (this.fileSelected) {
            //Marks as success
            this.setState({
                submitted_upload: true
            });

            //If valid files to upload
            _ref.put(this.fileSelected).then((s)=> {
                this.state.user.updateProfile(
                    {'photoURL': s.downloadURL}
                ).then(()=> {
                    //Marks as success
                    this.setState({
                        success_upload: true,
                        submitted_upload: false
                    })
                });
            })
        }
    }

    render() {
        return (
            this.state.user
            && <div className="row relative full-height">
                {/*Close button*/}
                <MainHeader text="Profile" icon="icon-users"/>
                <section className="col l12 m12 clearfix full-height">
                    {/* Image uploader */}
                    {
                        <section className="col l4 m4 input-black-box">
                            <h5 className="white-text">
                                <i className="icon-edit margin-right-10"/>
                                Upload Picture
                            </h5>
                            <div className="margin-top-2-rem margin-bottom-2-rem profile-picture-upload clearfix">
                                <BoxImage src={this.state.photoURL || ''}
                                          handleImageLoaded={()=>this.setState({image_loaded:true})}
                                />
                            </div>

                            {
                                this.state.image_loaded && <div className="col l6 m6 padding-left-0">
                                    <File onChange={(o, file)=> this.handleImageChange(o, file)} content="select"/>
                                </div>
                            }
                            {
                                this.state.image_loaded && <div className="col l6 m6 padding-right-0">
                                    <BoxButton onClick={(e)=> this.handleRequestUpload(e)}
                                               clicked={this.state.submitted_upload} forceLoader={true}>
                                        Upload!
                                    </BoxButton>
                                </div>
                            }
                            {/*Sucess message*/}
                            <div className="col l12 m12 margin-top-2-rem padding-right-0 padding-left-0">
                                {this.state.success_upload && <BoxAlert label="success-label">
                                    Image updated!
                                </BoxAlert>}
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