import React from 'react'
//import PropTypes from 'prop-types'
import BoxButton from 'front/components/app-buttons/index.jsx'
import Input from 'front/components/app-inputs/index.jsx'

export default class BoxInput extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            id: "file-upload",
            color: "orange",
            content: "Upload",
            type: 'button'
        }
    }

    handleClick(id) {
        let _file = document.querySelector('#' + id);
        _file.click();
    }

    handleOnChange(e) {
        // Create reader
        var _reader = new FileReader();
        var _file = e.target.files[0];

        if (_file) {
            // Handle loader
            _reader.addEventListener('loadend', () => {
                //Handle on change reflect event
                if (this.props.onChange)
                    this.props.onChange(
                        _reader.result, _file
                    )
            });

            //Read file
            _reader.readAsDataURL(_file);

        }
    }


    render() {
        return (
            <div>
                <BoxButton
                    className={this.props.color}
                    onClick={(e)=>this.handleClick(this.props.id)}
                >
                    <span>
                        {this.props.content}
                    </span>
                </BoxButton>

                <div className="hidden">
                    <Input
                        type="file" onChange={(e)=>this.handleOnChange(e)}
                        placeholder="image file" id={this.props.id}
                        accept="image/*"
                    />
                </div>
            </div>
        )
    }
}
