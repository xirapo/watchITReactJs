import React from 'react'
import PropTypes from 'prop-types'

import BoxAlert from 'front/components/app-alerts/index.jsx'
import BoxInput from 'front/components/app-inputs/index.jsx'
import BoxButton from 'front/components/app-buttons/index.jsx'

export default class FormBox extends React.Component {

    constructor(props) {
        super(props);
        this.fields = new FormData();
        this.state = {input_state: ''}
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
        //Set input in formData
        this.fields.set(
            event.target.name,
            event.target.value
        );
    }

    handleSubmit(e) {
        //Clean global cache
        cleanFormCache();

        //Avoid trigger default event
        e.preventDefault();

        //If setted default values in input collection
        //Get default values and return it
        //Merge default values with input values
        this.props.input.reduce((old, v, i)=> {
            //If has value declared on inputs list
            if ('defaultValue' in v && !(old.get(v['name'])))
                old.set(v['name'], v['defaultValue']);
            return old
        }, this.fields);

        //Reflect events
        this.props.action(
            this.fields, e
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
                {
                    this.props.error && this.props.error.length > 0 &&
                    <div className="row">
                        {
                            this.props.error.map((i, k)=> {
                                return (
                                    <BoxAlert key={k}>
                                        {i}
                                    </BoxAlert>
                                )
                            })
                        }
                    </div>
                }

                {/*Sucess message*/}
                {this.props.success && <BoxAlert label="success-label">
                    {this.props.success}
                </BoxAlert>}
            </form>
        )
    }
}