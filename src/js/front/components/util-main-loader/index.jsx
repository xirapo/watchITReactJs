import React from 'react'

export default class MainLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="absolute full-height full-width loading-box has-main-background valign-wrapper">
                <div className="center-block valign">
                    <div className="z-index-middle">
                        <div className="cssload-dots">
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                        </div>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" />
                                    <feColorMatrix in="blur" mode="matrix"
                                                   values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7"
                                                   result="goo"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div id="info_loader" className="text-center">
                        <h3 className="white-text no-margin" id="info_loader_text">{this.props.content}</h3>
                    </div>
                </div>
            </div>
        )
    }
}
