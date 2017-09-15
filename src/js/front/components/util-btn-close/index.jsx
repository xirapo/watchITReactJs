import React from 'react'


export default class BtnClose extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            action: '#'
        }
    }

    onClose(e) {
        if (this.props.onClose) {
            e.preventDefault();
            this.props.onClose(e)
        }
    }

    render() {
        return (
            <a href={this.props.action} onClick={(e)=>this.onClose(e)}
               className="btn-close clearfix font-size-45 top-2-vh">
                <i className="icon-cross white-text"/>
            </a>
        )
    }
}
