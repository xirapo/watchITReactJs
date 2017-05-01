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
                        <img alt="" className="bar-loader" src="/src/media/img/spinner/audio.svg"
                            {...this.props}/>
                    </div>
                </div>
            </section>
        )
    }
}
