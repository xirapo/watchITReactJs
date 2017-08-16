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
            }]
        }
    }

    onChange(to, e) {
        let actions = {
            'profile': '#/user/' + to + '/' + this.props.user.id
        };

        //Redirect to
        location.href = actions[to]
    }


    render() {
        return (
            this.props.user && <div className="absolute">
                <NavBarMenu
                    btnText="Account"
                    list={this.state.user_menu}
                    onChange={(t,e)=>this.onChange(t,e)}
                />
            </div> || <div></div>
        )
    }
}
