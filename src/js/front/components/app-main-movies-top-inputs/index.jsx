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
                {/*
                 <form action="javascript:void(0);">
                 <BoxInput
                 type="text"
                 icon="icon-signal"
                 size="l6 m6"
                 placeholder="Seek torrent..."
                 name="torrent"
                 />
                 </form>
                 */}
                {/*
                 <div className="col l2 m2 input-field">
                 <i className="icon-cog right small white-text margin-top-10"/>
                 <i className="icon-bell right small white-text margin-top-10"/>
                 </div>
                 */}

            </div>
        )
    }
}