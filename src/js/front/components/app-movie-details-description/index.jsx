import React from 'react'
import FlowText from '../util-flow-text/index.jsx'
import CustomScrollbars from '../util-scroller/index.jsx';


export default class AppMovieDetailDescription extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <CustomScrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight
                autoHeightMin={300}
                thumbMinSize={30}
                universal={true}
            >
                <FlowText
                    content={this.props.description}
                />
            </CustomScrollbars>
        )
    }
}
