import React from 'react'

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
                                <strong className={this.state[char]['color'] + "-text flow-text " + this.state[char]['align'] + "-align"}>
                                    <i className={"top-3 normalize-medium-icon small left margin-right-10 icon-" + this.state[char]['icon']}/>
                                    {this.props.info[char]}
                                </strong>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
