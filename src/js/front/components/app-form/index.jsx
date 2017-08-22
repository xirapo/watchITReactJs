import React from 'react'
import PropTypes from 'prop-types'

import BoxAlert from 'front/components/app-alerts/index.jsx'
import BoxInput from 'front/components/app-inputs/index.jsx'
import BoxButton from 'front/components/app-buttons/index.jsx'

export default class FormBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //Submitted form?
            fields: {}
        }
    }

    static get defaultProps() {
        return {
            input: [],
            buttons: [],
            error: false
        }
    }

    static get propTypes() {
        return {
            input: PropTypes.array.isRequired,
            buttons: PropTypes.array.isRequired,
            action: PropTypes.func.isRequired,
            submitted: PropTypes.bool.isRequired
        }
    }

    setValue(event) {
        //If the input fields were directly within this
        //Append to form data
        this.state.fields[event.target.name] = event.target.value;
        //Extend obj
        this.setState({
            fields: this.state.fields
        });
    }

    handleSubmit(e) {
        //If setted default values in input collection
        // Get default values and return it
        if (!Object.keys(this.state.fields).length) {
            //Merge default values with input values
            this.state.fields = Object.assign({}, this.state.fields,
                this.props.input.reduce((old, v, i)=> {
                    old[v['name']] = v['value'];
                    return old
                }, {}))
        }

        //Avoid trigger default event
        e.preventDefault();

        //Reflect events
        this.props.action(
            this.state.fields, e
        );
    }


    render() {
        //Render
        return (
            <form onSubmit={(e)=> this.handleSubmit(e) } autoComplete="new-password">
                {/*Inputs*/}
                <div className="row">
                    {
                        /* Generate inputs */
                        this.props.input.map((i, k)=> {
                            return (
                                <div key={k} className={"input-field-black col " + i.size}>
                                    <BoxInput {...i} onChange={(e)=> this.setValue(e) }/>
                                </div>
                            )
                        })
                    }
                </div>

                {/*Buttons*/}
                <div className="row">
                    {
                        /* Generate buttons */
                        this.props.buttons.map((i, k)=> {
                            return (
                                <BoxButton key={k}
                                           clicked={this.props.submitted}
                                           className={i.color}
                                           type={i.type}>
                                    <span>{i.text}</span>
                                </BoxButton>
                            )
                        })
                    }
                </div>

                {/*Alert*/}
                <div className="row">
                    {this.props.error && <BoxAlert>
                        {this.props.error}
                    </BoxAlert>}
                </div>
            </form>
        )
    }
}