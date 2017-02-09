import React from 'react'
import CustomScrollbars from '../util-scroller/index.jsx';

export default class AppMoviesNavBarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: false,
            active: false
        }
    }

    static get propTypes() {
        return {
            list: React.PropTypes.array.isRequired,
            btnText: React.PropTypes.string.isRequired
        }
    }


    componentDidMount() {
        //If need for initial item
        if (this.props.getInitialItem) {
            this.props.list.map((i, k)=> {
                if (i.default) {
                    //Call method
                    this.props.getInitialItem(
                        this.props.list[k]
                    );

                    //Stop loop
                    return false;
                }
            });
        }
    }

    onClick(e) {
        //On change
        let _obj = e.target;
        let {
            action:_action,
            label:_label
        } = _obj.dataset;

        //Assign new label
        this.setState({
            label: _label
        });

        //Select action
        if (this.props.onChange) {
            this.props.onChange(_action);
        }

    }

    render() {
        return (
            <ul className="dropdown">

                {/*Drop down main container*/}
                <li className="dropdown">
                    <a className="dropdown-button" href="javascript:void(0)">
                        <span className="font-light-gray">{this.props.btnText}</span>
                        {
                            /*The main button*/
                            this.state.label
                            && <strong className="dropdown-result blue-text">
                                {this.state.label}
                            </strong>
                            || this.props.list.map((i, k)=> {
                                return (
                                    i.default && <strong className="dropdown-result blue-text" key={k}>
                                        {i.label}
                                    </strong>
                                )
                            })
                        }
                        <i className="icon-triangle-down tiny relative top-2 right margin-left-4"/>
                    </a>

                    {/*Menu List*/}
                    <ul className="dropdown-content relative">
                        <CustomScrollbars
                            autoHide
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            autoHeight
                            autoHeightMax={600}
                            thumbMinSize={30}
                            universal={true}>

                            {
                                /*The sub menu items*/
                                this.props.list.map((i, k)=> {
                                    return (
                                        <li key={k}>
                                            <a href="javascript:void(0)" onClick={(e)=>this.onClick(e)}
                                               className="drop-item"
                                               data-action={i.action}
                                               data-label={i.label}>
                                                {i.label}
                                            </a>
                                        </li>
                                    )
                                })
                            }

                        </CustomScrollbars >
                    </ul>
                </li>
            </ul>
        )
    }
}
