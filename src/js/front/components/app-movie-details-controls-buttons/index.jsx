import React from 'react'
import FormBoxButton from '../form-box-buttons/index.jsx'


export default class AppMovieDetailControlsButtons extends React.Component {
    constructor(props) {
        super(props);
    }


    static get defaultProps() {
        return {
            icon: 'icon-controller-play'
        }
    }

    render() {
        return (
            <div>
                <FormBoxButton className={"darken-4 " + this.props.className } onClick={this.props.onClick}>
                    <span className="z-index-top font-size-small bold capitalize">
                        {this.props.text}
                    </span>
                </FormBoxButton>
            </div>
        )
    }
}
