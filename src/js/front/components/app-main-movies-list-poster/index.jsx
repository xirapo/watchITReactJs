//Basic
import React from 'react'
//Components
import BoxImage from 'front/components/app-image/index.jsx'


export default class AppMoviesListPoster extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (<div>
            {this.props.movies.map((i, k)=> {
                return (<div key={k}
                             className="col l2 m2 relative movies-poster padding-left-2 padding-right-2">
                    <a href={"#/app/movie/" + i.imdb_code }>
                        <BoxImage
                            src={i.medium_cover_image}
                        />
                        <div className="hover-poster-box full-width full-height">
                            <div className="hover-info absolute bottom-1-rem">
                                <strong className="white-text truncate">
                                    {i.title}
                                </strong>
                                <span className="green-text">
                                    <i className="icon-calendar margin-right-3-p"/>
                                    {i.year}
                                </span>
                                <span className="orange-text margin-left-5-p">
                                    <i className="icon-star margin-right-2-p"/>
                                    {i.rating}
                                </span>
                            </div>
                        </div>

                    </a>
                </div>)
            })}
        </div>)

    }

}
