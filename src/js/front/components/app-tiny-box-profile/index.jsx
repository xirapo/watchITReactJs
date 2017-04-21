import React from 'react'
import BarLoader from '../util-bar-loader/index.jsx'

//Class Profile
export default class AppTinyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            (
                this.props.user && <div className="row">
                    <div className="row">
                        <div className="clearfix">
                            <div className="col l3 m4 relative top-5 small-picture">
                                <figure>
                                    <img src={this.props.user.profile_pic_small} alt=""/>
                                </figure>
                            </div>
                            <div className="col l9 m8">
                                <div className="col l12 m12 truncate white-text">
                                    <strong className="bold no-margin">{this.props.user.fullname}</strong>
                                </div>
                                <div className="col l12 m12 ">
                                    <a href="#logout" className="font-size-tiny font-light-gray bold white-text">Log
                                        out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> || <BarLoader />
            )
        )
    }
}
