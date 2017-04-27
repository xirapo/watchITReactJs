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
                        <span>{this.props.swarm.aPeers}</span>
                    </li>
                    <li className="white-text">
                        <span className="bold">D/Speed: </span>
                        <span>{this.props.swarm.dSpeed}</span>
                    </li>
                    <li className="white-text">
                        <span className="bold">U/Speed: </span>
                        <span>{this.props.swarm.uSpeed}</span>
                    </li>
                    <li className="white-text">
                        <span className="bold">File Size: </span>
                        <span>{this.props.swarm.fSize}</span>
                    </li>
                    <li className="white-text">
                        <span className="bold">Downloaded: </span>
                        <span>{this.props.swarm.dLoaded}</span>
                    </li>
                </ul>
            )
        )
    }
}
