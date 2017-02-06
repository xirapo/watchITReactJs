import React from 'react'
import FormBoxInput from '../form-box-inputs/index.jsx'

export default class AppMainTopInputs extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="clearfix">
                <form action="javascript:void(0);">
                    <FormBoxInput
                        type="text"
                        icon="icon-open-book"
                        size="l5 m5"
                        placeholder="Search..."
                        name="search"
                    />
                </form>

                <form action="javascript:void(0);">
                    <FormBoxInput
                        type="text"
                        icon="icon-signal"
                        size="l5 m5"
                        placeholder="Seek torrent..."
                        name="torrent"
                    />
                </form>

                <div className="col l2 m2 input-field">
                    <i className="icon-cog right small white-text margin-top-10"/>
                    <i className="icon-bell right small white-text margin-top-10"/>
                </div>
            </div>
        )
    }
} 