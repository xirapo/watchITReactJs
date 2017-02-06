import React from 'react'

export default class AppMenuProfileStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: 0,
            following: 0,
            plays: 0
        }
    }

    render() {
        return (
            <div className="clearfix">
                <div className="col l4 m6 text-center">
                    <div>
                        <strong className="font-size-tiny bold white-text">
                            {this.state.following}
                        </strong>
                    </div>
                    <div>
                        <span className="font-light-gray font-size-tiny">
                            following
                        </span>
                    </div>
                </div>
                <div className="col l4 m6 text-center">
                    <div>
                        <strong className="font-size-tiny bold white-text">
                            {this.state.followers}
                        </strong>
                    </div>
                    <div>
                        <span className="font-light-gray font-size-tiny">
                            followers
                        </span>
                    </div>
                </div>
                <div className="col l4 text-center hide-on-md hide-on-med-only">
                    <div>
                        <strong className="font-size-tiny bold white-text">
                            {this.state.plays}
                        </strong>
                    </div>
                    <div>
                        <span className="font-light-gray font-size-tiny">
                            plays
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
