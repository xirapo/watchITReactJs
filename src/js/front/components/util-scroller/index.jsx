import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

export default class CustomScrollbars extends React.Component {
    constructor(props) {
        super(props);
        const {getRef} = props;
        //reset props
        this.getRef = getRef;
    }

    renderView({style, ...props}) {
        const viewStyle = {
            marginRight: '-17px',
            marginBottom: '-17px'
        };

        return (
            <div
                style={{ ...style, ...viewStyle }}
                {...props}
            ></div>
        );
    }


    renderThumbVertical({style, ...props}) {
        //Modify scroll bar
        const thumbStyle = {
            // marginLeft: '5px',
            backgroundColor: `rgba(167, 201, 235,0.6)`,
            width: '5px'
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
            //marginLeft: '5px',
            backgroundColor: `rgba(167, 201, 235,0.6)`,
            width: '5px'
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
        const props = Object.assign({}, this.props);
        delete props.getRef;
       
        return (
            <Scrollbars
                ref={(e)=>{this.getRef && this.getRef(e)}}
                renderView={this.renderView}
                renderThumbVertical={this.renderThumbVertical}
                renderThumbHorizontal={this.renderThumbHorizontal}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                {...props} />
        );
    }
}