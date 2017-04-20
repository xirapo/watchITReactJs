import React from 'react'

export default class BarLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col l12 m12 center-block margin-top-15">
                <div className="progress height-8 blue darken-4 center-block">
                    <div className="indeterminate blue"></div>
                </div>
            </div>
        )
    }
}
