import React from 'react'
import AppMenuProfileAvatar from '../app-aside-tiny-box-profile-avatar/index.jsx'
import AppMenuProfileStatistics from '../app-aside-tiny-box-profile-statistics/index.jsx'

//Request
var axios = require('axios');

//Class Profile
export default class AppTinyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: {
                profile_pic_small: '',
                fullname: ''
            }
        };

        //Get token from localStorage
        let _token = localStorage.getItem('token');
        
        //If token
        if (_token && this.props.request) {
            axios({
                url: this.props.request,
                timeout: 1000,
                headers: {'Authorization': 'Bearer ' + _token}
            }).then((e)=> {
                //Handle data for user
                this.setState({
                    user_data: e.data.data
                });
            })
        }
    }

    static get propTypes() {
        return {
            request: React.PropTypes.string.isRequired
        }
    }


    render() {
        return (
            <div className="row">
                <div className="row">
                    <AppMenuProfileAvatar
                        picture={this.state.user_data.profile_pic_small}
                        fullname={this.state.user_data.fullname}
                    />
                </div>
                <AppMenuProfileStatistics />
            </div>
        )
    }
}
