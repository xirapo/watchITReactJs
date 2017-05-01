import React from 'react'

export default class PulseLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img alt="" className="pulse-loader" src="/src/media/img/spinner/puff.svg"
                {...this.props}/>
        )
    }
}
