import React from 'react'

//Class Profile
export default class AppTinyProfileAvatar extends React.Component {
    constructor(props) {
        super(props);

    }


    static get defaultProps() {
        return {
            href: '#',
            size: 'l3 m3',
            allow_border: true
        }
    }


    render() {
        return (

            <div className={`col ${this.props.size} small-picture`}>
                <a href={this.props.href} className="clearfix profile-picture-img">
                    <figure>
                        <img src={this.props.photo || 'http://lorempixel.com/60/60/abstract/'} alt=""/>
                    </figure>
                </a>

                {
                    this.props.allow_border && <div className="small-picture-border">
                        <figure>
                            <img src="/src/media/img/layout/movie-reel.png" alt=""/>
                        </figure>
                    </div>
                }
            </div>
        )
    }
}
