//Basic
import React from 'react'
//Components
import BoxImage from 'front/components/app-image/index.jsx'


export default class AppMoviesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.movies.map((i, k)=> {
                        return (
                            <div key={k} className="col l2 m2 img-media-large padding-left-2 padding-right-2">
                                <a href={"#/app/movie/" + i.imdb_code }>
                                    <BoxImage src={i.medium_cover_image }/>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        )

    }

}
