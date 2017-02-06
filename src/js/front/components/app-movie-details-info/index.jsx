import React from 'react'
import AppMovieDetailInfoItem from '../app-movie-details-info-item/index.jsx'

export default class AppMovieDetailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: {
                color: 'red',
                align: 'left',
                icon: 'calendar'
            },
            rating: {
                color: 'green',
                align: 'center',
                icon: 'star'
            },
            runtime: {
                color: 'blue',
                align: 'right',
                icon: 'back-in-time'
            },
            rate: {
                color: 'orange',
                align: 'right',
                icon: 'bell'
            }
        }
    }

    render() {
        return (
            <div className="col l12 m12 s12">
                {
                    Object.keys(this.props.info).map((char, idx)=> {
                        return (
                            <div className={"col " + (idx == 0 && 'padding-left-0')} key={idx}>
                                <AppMovieDetailInfoItem
                                    color={this.state[char]['color']}
                                    align={this.state[char]['align']}
                                    icon={this.state[char]['icon']}
                                >
                                    {this.props.info[char]}
                                </AppMovieDetailInfoItem>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
