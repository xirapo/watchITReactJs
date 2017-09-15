//Basic
import React from 'react'
//Components
import BoxImage from 'front/components/app-image/index.jsx'

export default class AppMainSearchResultBoxItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li className="transparent collection-item padding-5 no-border">
                <a href={"#/app/movie/" + this.props.imdb_code } className="clearfix">
                    <div className="float-left result-search-box-img">
                        <BoxImage src={this.props.small_cover_image} placeholder={{w: 60, h: 90}}/>
                    </div>

                    <div className="float-left width-22-rem result-search-box-content">
                        <div className="search-result-box-title">
                            <strong className="white-text truncate">
                                {this.props.title}
                            </strong>
                        </div>
                        <div className="margin-top-1-p search-result-box-details">
                            <span className="green-text">
                                <i className="icon-calendar margin-right-1-p"/>
                                {this.props.year}
                            </span>
                            <span className="orange-text margin-left-3-p">
                                <i className="icon-star margin-right-1-p"/>
                                {this.props.rating}
                            </span>
                            <span className="red-text margin-left-3-p">
                                <i className="icon-back-in-time margin-right-1-p"/>
                                {this.props.runtime}
                            </span>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}
