import React from 'react'
import PropTypes from 'prop-types'
import BoxButton from 'front/components/app-buttons/index.jsx'

export default class BoxInput extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            id: PropTypes.string.isRequired
        }
    }


    render() {
        return (
            <div>
                <BoxButton key={k}
                           clicked={this.props.submitted}
                           className={i.color}
                           type={i.type}>
                    <span>{i.text}</span>
                </BoxButton>
            </div>
        )
    }
}
