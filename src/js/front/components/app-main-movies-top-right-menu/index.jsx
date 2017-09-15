import React from 'react'
import NavBarMenu from 'front/components/app-nav-bar-menu/index.jsx'

//Class Profile
export default class AppTopRightMenu extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            this.props.user &&
            <div className="absolute right-2-rem">
                {/*
                <a title="Settings"
                   className="btn-floating btn-small waves-effect margin-right-1-rem waves-light black">
                    <i className="icon-tools font-size-1-rem"/>
                </a>
                */}
                <a href={`#/user/profile/${this.props.user.id}`} title="Profile"
                   className="btn-floating btn-small waves-effect waves-light black">
                    <i className="icon-user font-size-1-rem"/>
                </a>
            </div> || <div></div>
        )
    }
}
