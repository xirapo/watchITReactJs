import React from 'react'

export default class AppMainSearchResult extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            this.props.result.length > 0 &&
            <div className="col l12 m12 result-search-box">
                <ul className="collection no-border">
                    {(
                        this.props.result.map((i, k)=> {
                            return (
                                <li key={k} className="transparent collection-item padding-5 no-border">
                                    <a href={"#/app/movie/" + i.imdb_code } className="clearfix">
                                        <div className="float-left">
                                            <figure className="no-margin">
                                                <img src={i.small_cover_image} alt=""/>
                                            </figure>
                                        </div>

                                        <div className="float-left margin-left-3-p width-35-vw">
                                            <div className="search-result-box-title">
                                                <strong className="white-text truncate">
                                                    {i.title}
                                                </strong>
                                            </div>
                                            <div className="margin-top-4-p search-result-box-details">
                                                <span className="green-text">
                                                    <i className="icon-calendar margin-right-3-p"/>
                                                    {i.year}
                                                </span>
                                                <span className="orange-text margin-left-8-p">
                                                    <i className="icon-star margin-right-3-p"/>
                                                    {i.rating}
                                                </span>
                                                <span className="red-text margin-left-8-p">
                                                    <i className="icon-back-in-time margin-right-3-p"/>
                                                    {i.runtime}
                                                </span>

                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    )}
                </ul>
            </div> ||
            <div className="col l12 m12 result-search-box text-center padding-10">
                <span className="white-text bold">No results were found</span>
            </div>
        )
    }
}
