//Basic
import React from 'react'
import PropTypes from 'prop-types'
//Components
import CustomScrollbars from 'front/components/util-scroller/index.jsx';

export default class NavBarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: false
        }
    }

    static get propTypes() {
        return {
            list: PropTypes.array.isRequired,
            btnText: PropTypes.string.isRequired
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
            this.props.onChange(_action, _label);
        }

    }

    render() {
        return (
            <ul className="dropdown">

                {/*Drop down main container*/}
                <li className="dropdown">
                    <a className="dropdown-button" href="javascript:void(0)">
                        <i className="icon-triangle-down nav-var-icon normalize-small-icon left margin-right-4"/>
                        <span className="font-light-gray">{this.props.btnText}</span>
                        {
                            /*The main button*/
                            //Set personalized label
                            this.state.label
                            && <span className={"dropdown-result no-bold blue-text"}>
                                {this.state.label}
                            </span>

                            //Or get default
                            || this.props.list.map((i, k)=> {
                                return (
                                    i.default
                                    && <span className="dropdown-result no-bold blue-text" key={k}>
                                        {i.label}
                                    </span>
                                )
                            })
                        }
                    </a>

                    {/*Menu List*/}
                    <ul className="dropdown-content relative">
                        <CustomScrollbars
                            autoHide
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            autoHeight={true}
                            autoHeightMax={500}
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
