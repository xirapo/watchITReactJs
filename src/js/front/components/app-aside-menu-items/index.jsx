import React from 'react'

export default class AppMenuItems extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            items: []
        }
    }

    static get propTypes() {
        return {
            items: React.PropTypes.array.isRequired
        }
    }

    render() {
        return (
            <div className="clearfix">
                {
                    this.props.items.map((i, k)=> {
                        return (
                            <div className="row margin-bottom-5" key={k}>
                                <div className="col l12 m12">
                                    <a href={"#" + i.href} className={i.textColor + "-text"}>
                                        <i className={i.icon + " relative top-2 margin-right-10 tiny"}/>
                                        <strong className="bold">{i.content}</strong>
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
