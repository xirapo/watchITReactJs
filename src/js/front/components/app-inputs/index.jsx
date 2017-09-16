import React from 'react'
import PropTypes from 'prop-types'

export default class BoxInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
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

    componentWillMount() {
        if (this.props.value)
            this.setState({
                value: this.props.value
            })
    }

    onInput(e) {
        //Set value to input
        this.setState({
            value: e.target.value
        });

        //If handler
        if (this.props.onInput)
            this.props.onInput(e);


    }

    onChange(e) {
        //If handler
        if (this.props.onChange)
            this.props.onChange(e);
    }

    onKeyDown(e) {
        //If handler
        if (this.props.onKeyDown)
            this.props.onKeyDown(e);
    }


    render() {
        return (
            <div>
                {this.props.icon && <i className={this.props.icon + " gray-text"}/>}
                <input {...this.props}
                    onInput={(e)=> this.onInput(e) }
                    onChange={(e)=> this.onChange(e) }
                    onKeyDown={(e)=> this.onKeyDown(e) }
                    className="white-text validate"
                    value={this.state.value}
                />
            </div>
        )
    }
}
