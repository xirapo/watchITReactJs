import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

export default class CustomScrollbars extends React.Component {


    renderView({style, ...props}) {
        const viewStyle = {
            marginRight: '-16px'
        };
        return (
            <div
                style={{ ...style, ...viewStyle }}
                {...props}
            ></div>
        );
    }


    renderThumbVertical({style, ...props}) {
        const thumbStyle = {
            marginLeft: '5px',
            backgroundColor: `rgba(167, 201, 235,0.6)`,
            width: '35px'
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}
            ></div>
        );
    }

    renderThumbHorizontal({style, ...props}) {
        let thumbStyle = {
            marginLeft: '5px',
            backgroundColor: `rgba(167, 201, 235,0.6)`,
            width: '35px'
        };

        //Show if needed
        if (!props.viewHorizontal) {
            thumbStyle['display'] = 'none'
        }

        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}
            ></div>
        );
    }


    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbVertical={this.renderThumbVertical}
                renderThumbHorizontal={this.renderThumbHorizontal}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                {...this.props} />
        );
    }
}