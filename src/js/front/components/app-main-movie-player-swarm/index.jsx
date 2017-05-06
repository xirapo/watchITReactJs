import React from 'react'
import PropTypes from 'prop-types'


export default class AppMoviesPlayerSwarm extends React.Component {


    static get propTypes() {
        return {
            swarm: PropTypes.object.isRequired
        }
    }


    render() {
        return (
            (
                <ul>
                    <li className="white-text">
                        <span className="bold">Peers: </span>
                        <span className={
                            this.props.swarm.aPeers <= 10 ?
                                "red-text" : this.props.swarm.aPeers < 15 && this.props.swarm.aPeers > 10 ?
                                "orange-text": "green-text"
                        }>
                            {this.props.swarm.aPeers}
                        </span>
                    </li>
                    <li className="white-text">
                        <span className="bold">D/Speed: </span>
                        <span className={parseInt(this.props.swarm.dSpeed) <= 100 || this.props.swarm.dLoaded > this.props.swarm.fSize ?
                                "red-text" : this.props.swarm.dSpeed < 250 && this.props.swarm.dSpeed > 100 ?
                                "orange-text":  "green-text"
                        }>
                            {this.props.swarm.dLoaded > this.props.swarm.fSize
                            && 0.00 || this.props.swarm.dSpeed} kb/s
                        </span>
                    </li>
                    <li className="white-text">
                        <span className="bold">U/Speed: </span>
                        <span className={this.props.swarm.uSpeed <= 50 ?
                            "red-text" : this.props.swarm.uSpeed < 100 && this.props.swarm.uSpeed > 50 ?
                            "orange-text":  "green-text"
                        }>
                            {this.props.swarm.uSpeed} kb/s
                        </span>
                    </li>

                    <li className="white-text">
                        <span className="bold">Subtitles: </span>
                        <span>
                            {this.props.swarm.sub[0].toUpperCase() + this.props.swarm.sub.slice(1)}
                        </span>
                    </li>
                    <li className="white-text">
                        <span className="bold">File Size: </span>
                        <span>{this.props.swarm.fSize} mb</span>
                    </li>

                    <li className="white-text">
                        <span className="bold">Downloaded: </span>
                        <span>
                            {this.props.swarm.dLoaded > this.props.swarm.fSize
                            && this.props.swarm.fSize || this.props.swarm.dLoaded}mb
                        </span>
                    </li>
                </ul>
            )
        )
    }
}
