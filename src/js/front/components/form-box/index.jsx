import React from 'react'
import PropTypes from 'prop-types'

import FormBoxAlert from '../form-box-alerts/index.jsx'
import FormBoxInput from '../form-box-inputs/index.jsx'
import FormBoxButton from '../form-box-buttons/index.jsx'

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
        //Avoid trigger default event
        e.preventDefault();
        //Reflect events
        this.props.action(this.state.fields, e);
    }


    render() {
        //Render
        return (
            <form onSubmit={(e)=> this.handleSubmit(e) }>
                {/*Inputs*/}
                <div className="row">
                    {
                        /* Generate inputs */
                        this.props.input.map((i, k)=> {
                            return (
                                <FormBoxInput {...i}
                                    onChange={(e)=> this.setValue(e) }
                                    key={k}
                                />
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
                                <div className={"input-field col " + i.size} key={k}>
                                    <FormBoxButton
                                        clicked={this.props.submitted}
                                        className={i.color}
                                        type={i.type}>
                                        <span>{i.text}</span>
                                    </FormBoxButton>
                                </div>
                            )
                        })
                    }
                </div>

                {/*Alert*/}
                <div className="row">
                    {this.props.error && <FormBoxAlert content={this.props.error}/>}
                </div>
            </form>
        )
    }
}