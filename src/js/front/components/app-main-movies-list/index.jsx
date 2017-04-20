import React from 'react'
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
                autoHeight
                autoHeightMin={500}
                thumbMinSize={30}
                universal={true}>

                <div className="col l12 m12">
                    {
                        this.props.movies.map((i, k)=> {
                            return (
                                <div className="col l2 m2 padding-left-2 padding-right-2 padding-bottom-2 padding-top-2"
                                     key={k}>
                                    <a href={"#/movie/" + i.id}>
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
