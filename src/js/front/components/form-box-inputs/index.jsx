import React from 'react'

export default class FormBoxInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        //this.handleChange = this.handleChange.bind(this);
    }

    static get defaultProps() {
        return {
            required: true,
            type: 'text',
            autoComplete: 'off',
            size: 'm12 l12'
        }
    }

    static get propTypes() {
        return {
            placeholder: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string.isRequired
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
            <div className={"input-field col " + this.props.size}>
                <i className={this.props.icon + " normalize-medium-icon top-10 prefix small white-text"}> </i>
                <input
                    {...this.props}
                    onChange={(e)=> this.handleChange(e) }
                    required={this.props.required}
                    className="white-text validate browser-default"
                    value={this.state.value}
                />
            </div>
        )
    }
}
