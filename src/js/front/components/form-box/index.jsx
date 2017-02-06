import React from 'react'
import FormBoxAlert from '../form-box-alerts/index.jsx'
import FormBoxInput from '../form-box-inputs/index.jsx'
import FormBoxButton from '../form-box-buttons/index.jsx'


//Request
var axios = require('axios');

export default class FormBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //Submitted form?
            submitted: false,
            error: false,
            fields: new FormData()
        }
    }

    static get defaultProps() {
        return {
            input: [],
            buttons: [],
            method: 'post'
        }
    }

    static get propTypes() {
        return {
            input: React.PropTypes.array.isRequired,
            buttons: React.PropTypes.array.isRequired,
            request: React.PropTypes.string.isRequired
        }
    }

    setValue(event) {
        //If the input fields were directly within this
        //Append to form data
        this.state.fields.append(
            event.target.name, event.target.value
        );

        //Extend obj
        this.setState({
            fields: this.state.fields
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        //Http method
        let _method = this.props.method.toLowerCase();

        //Change State
        this.setState({
            submitted: true,
            error: false
        });


        //If exist method in axios
        if (_method in axios) {
            //Request
            axios[_method](
                this.props.request,
                this.state.fields
            ).then((res) => {
                //Valid response
                if (this.props.handleRequest) {
                    this.props.handleRequest(res.data);
                }

            }).catch((error) => {
                if (error) {
                    //Error message
                    this.setState({
                        submitted: false,
                        error: error.response.data.message
                    });
                }
            });
        }
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
                                <FormBoxInput
                                    type={i.type}
                                    size={i.size}
                                    icon={i.icon}
                                    placeholder={i.placeholder}
                                    autoComplete={i.autocomplete}
                                    name={i.name}
                                    required={i.required}
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
                                        clicked={this.state.submitted}
                                        className={i.color}
                                        type={i.type}
                                    >
                                        <span>{i.text}</span>
                                    </FormBoxButton>
                                </div>
                            )
                        })
                    }
                </div>

                {/*Alert*/}
                <div className="row">
                    {this.state.error && <FormBoxAlert content={this.state.error}/>}
                </div>
            </form>
        )
    }
}