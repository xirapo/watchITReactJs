import React from 'react'

export default class PointsLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img alt="" src="app://host/src/media/img/spinner/three-dots.svg"
                {...this.props}            />
        )
    }
}
