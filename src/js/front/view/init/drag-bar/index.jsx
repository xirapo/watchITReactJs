import React from 'react'

export default class DragBar extends React.Component {
    constructor(props) {
        super(props);
    }

    closeWin() {
        console.log('cloe');
        win.close();
    }

    minimizeWin() {
        win.minimize();
    }

    maximizeWin() {
        win.maximize()
    }


    render() {
        return (
            <section className="full-width full-height absolute">
                <header id="drag-bar" className="clearfix relative transparent z-depth-100">
                    <h5 className="no-margin font-type-titles float-left">
                        <span className="white-text">watch</span>
                        <strong className="loader-text">IT</strong>
                    </h5>

                    <ul className="list-unlisted relative float-right">
                        <li onClick={this.minimizeWin} className="float-left margin-right-2">
                            <i className="icon-circle-with-minus font-size-2-vh blue-text"/>
                        </li>
                        <li onClick={this.maximizeWin} className="float-left margin-right-2">
                            <i className="icon-circle-with-plus font-size-2-vh orange-text "/>
                        </li>
                        <li onClick={this.closeWin} className="float-left margin-right-2">
                            <i className="icon-circle-with-cross font-size-2-vh red-text"/>
                        </li>
                    </ul>
                </header>
                {this.props.children}
            </section>

        )
    }
}
