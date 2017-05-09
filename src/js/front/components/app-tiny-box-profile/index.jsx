import React from 'react'
import BarLoader from 'front/components/util-bar-loader/index.jsx'

//Class Profile
export default class AppTinyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            (
                this.props.user && <div className="clearfix">
                    <div className="col l3 m3 small-picture">
                        <a href="#" className="clearfix profile-picture-img">
                            <figure>
                                <img src={this.props.user.profile_pic_small} alt=""/>
                            </figure>
                        </a>
                        <div className="small-picture-border">
                            <figure>
                                <img src="/src/media/img/layout/movie-reel.png" alt=""/>
                            </figure>
                        </div>
                    </div>
                    <div className="col l9 m9 small-user-data">
                        <div className="col l12 m12 truncate white-text">
                            <strong className="bold no-margin">{this.props.user.fullname}</strong>
                        </div>
                        <div className="col l12 m12 ">
                            <a href="#logout" className="font-light-gray bold white-text">Log
                                out</a>
                        </div>
                    </div>


                </div>
                || <BarLoader />
            )
        )
    }
}
