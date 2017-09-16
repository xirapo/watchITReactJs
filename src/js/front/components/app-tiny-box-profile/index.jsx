import React from 'react'
import BarLoader from 'front/components/util-bar-loader/index.jsx'
import AppTinyProfileAvatar from 'front/components/app-tiny-box-profile-avatar/index.jsx'

//Class Profile
export default class AppTinyProfile extends React.Component {
    constructor(props) {
        super(props);
        //Initial state
        this.state = {
            logout: false
        }
    }

    onLogOut(e) {
        //If valid prop onLogOut set
        if (this.props.onLogOut) {
            this.setState({logout: true});
            this.props.onLogOut(e)
        }
    }

    render() {
        return (
            (
                !this.state.logout && this.props.user && <div className="clearfix">
                    {/*Small avatar*/}
                    <AppTinyProfileAvatar photo={this.props.user.photoURL}/>
                    {/*Content info*/}
                    <div className="col l9 m9 small-user-data">
                        <div className="col l12 m12 truncate white-text">
                            <strong className="bold no-margin">{this.props.user.displayName}</strong>
                        </div>
                        <div className="col l12 m12">
                            <a href="" onClick={(e)=> this.onLogOut(e)} className="grey-text bold">
                                Logout
                            </a>
                        </div>
                    </div>


                </div>
                || <BarLoader />
            )
        )
    }
}
