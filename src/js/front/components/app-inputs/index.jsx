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

    handleChange(e) {
        //Set value to input
        this.setState({
            value: e.target.value
        });

        //If handler
        if (this.props.onChange) {
            this.props.onChange(e);
        }

    }

    render() {
        return (
            <div>
                {
                    this.props.icon &&
                    <i className={this.props.icon + " normalize-medium-icon top-12 prefix small white-text"}> </i>
                }
                <input {...this.props}
                    onChange={(e)=> this.handleChange(e) }
                    className="white-text validate browser-default"
                    value={this.state.value}
                />
            </div>
        )
    }
}
