import React from 'react'
import NavBarMenu from 'front/components/app-nav-bar-menu/index.jsx'

//Class Profile
export default class AppTopRightMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_menu: [{
                'label': 'Profile',
                'action': 'profile'
            },{
                'label': 'Invite User',
                'action': 'invite'
            }]
        }
    }


    render() {
        return (
            <div className="clearfix">
                <NavBarMenu
                    btnText="Account"
                    list={this.state.user_menu}
                />
            </div>
        )
    }
}
