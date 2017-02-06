import React from 'react'

export default class BoxLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            size: 83
        }
    }

    render() {
        return (
            <section
                className={"width-" + this.props.size + "-p col absolute full-height no-top no-right valign-wrapper"}
            >
                <div className="valign center-block">
                    <div className="preloader-wrapper active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
