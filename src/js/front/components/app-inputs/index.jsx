import React from 'react'
import PropTypes from 'prop-types'

export default class BoxInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        //this.handleChange = this.handleChange.bind(this);
    }

    static get defaultProps() {
        return {
            type: 'text',
            autoComplete: 'off'
        }
    }

    static get propTypes() {
        return {
            placeholder: PropTypes.string.isRequired
        }
    }

    onInput(e) {
        //Set value to input
        this.setState({
            value: e.target.value
        });

        //If handler
        if (this.props.onInput) {
            this.props.onInput(e);
        }

    }
    

    render() {
        return (
            <div>
                {this.props.icon && <i className={this.props.icon + " gray-text"}/>                }
                <input {...this.props}
                    onInput={(e)=> this.onInput(e) }
                    className="white-text validate"
                    value={this.state.value}
                />
            </div>
        )
    }
}
