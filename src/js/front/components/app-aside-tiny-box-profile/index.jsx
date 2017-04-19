import React from 'react'
import AppMenuProfileAvatar from '../app-aside-tiny-box-profile-avatar/index.jsx'
// import AppMenuProfileStatistics from '../app-aside-tiny-box-profile-statistics/index.jsx'


//Class Profile
export default class AppTinyProfile extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            (
                <div className="row">
                    <div className="row">
                        <AppMenuProfileAvatar
                            picture={this.props.user.profile_pic_small}
                            fullname={this.props.user.fullname}
                        />
                    </div>
                </div>
            )
        )
    }
}
