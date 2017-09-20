import React from 'react'

export default class DragBar extends React.Component {
    constructor(props) {
        super(props);
        //Toggle maximize
        this.isMax = true;
    }

    componentDidMount() {
        win.on('maximize', ()=> {
            this.isMax = true;
        }).on('resize', ()=> {
            this.isMax = false;
        }).on('unmaximize', ()=> {
            this.isMax = false;
        })
    }

    closeWin() {
        win.close();
    }

    minimizeWin() {
        win.minimize();
    }

    maximizeWin() {
        if (!this.isMax) {
            //If not maximized
            //Maximize
            this.isMax = true;
            win.maximize();
        } else {
            //Unmaximize
            this.isMax = false;
            win.unmaximize();
        }
    }


    render() {
        return (
            <section className="full-width full-height absolute">
                <header id="drag-bar" className="clearfix relative transparent z-depth-100 z-index-1000">
                    <h5 className="no-margin font-type-titles float-left">
                        <span className="grey-text">watch</span>
                        <strong className="bold loader-text">IT</strong>
                    </h5>

                    <ul className="list-unlisted relative float-right">
                        <li onClick={this.minimizeWin} className="float-left margin-right-2">
                            <i className="icon-circle-with-minus font-size-2-vh orange-text"/>
                        </li>
                        <li onClick={(e) => this.maximizeWin(e)} className="float-left margin-right-2">
                            <i className="icon-circle-with-plus font-size-2-vh green-text "/>
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
