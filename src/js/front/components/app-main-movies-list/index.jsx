//Basic
import React from 'react'
//Components
import AppMoviesListAvatar from '../app-main-movies-list-avatar/index.jsx'
import CustomScrollbars from '../util-scroller/index.jsx';


export default class AppMoviesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomScrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight={true}
                autoHeightMin={500}
                thumbMinSize={30}
                universal={true}
                onScrollFrame={this.props.onUpdate}>
                <div className="col l12 m12">
                    {
                        this.props.movies.map((i, k)=> {
                            return (
                                <div key={k} className="col l2 m2 padding-2">
                                    <a href={"#/app/movie/" + i.imdb_code }>
                                        <AppMoviesListAvatar src={i.medium_cover_image }/>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </CustomScrollbars>
        )
    }
}
