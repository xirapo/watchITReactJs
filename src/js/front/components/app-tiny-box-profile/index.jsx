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
                this.props.user && <div className="clearfix">
                    <div className="col l12 m12 float-right small-picture">
                        <a href="#">
                            <figure>
                                <img src={this.props.user.profile_pic_small} alt=""/>
                            </figure>
                        </a>
                    </div>
                    {/*
                     <div className="col l9 m9">
                     <div className="col l12 m12 truncate white-text">
                     <strong className="bold no-margin">{this.props.user.fullname}</strong>
                     </div>
                     <div className="col l12 m12 ">
                     <a href="#logout" className="font-size-tiny font-light-gray bold white-text">Log
                     out</a>
                     </div>
                     </div>
                     */}

                </div>
                || <BarLoader />
            )
        )
    }
}
