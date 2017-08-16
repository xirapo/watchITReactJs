import React from 'react'
import BoxInput from 'front/components/app-inputs/index.jsx'

export default class AppMainTopInputs extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            size: 'm6 l6'
        }
    }

    onInput(e) {
        if (this.props.onInput(e)) {
            this.props.onInput(e)
        }
    }


    render() {
        return (
            <div className="clearfix">
                <form action="javascript:void(0);">
                    <div className={"input-field-black margin-top-0 col " + this.props.size}>
                        <BoxInput
                            icon="icon-tv"
                            onInput={(e)=>{this.onInput(e)}}
                            required={true}
                            autoComplete="off"
                            type="text"
                            placeholder="Search..."
                            name="search"/>
                    </div>
                </form>
            </div>
        )
    }
}