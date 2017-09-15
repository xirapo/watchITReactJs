//Basic
import React from 'react'
//Components
import BoxLoader from 'front/components/util-box-loader/index.jsx'
// import BtnClose from 'front/components/util-btn-close/index.jsx'
import MainHeader from 'front/components/util-header/index.jsx'
import BoxImage from 'front/components/app-image/index.jsx'
import AppMovieDetailInfo from 'front/components/app-movie-details-info/index.jsx'
import AppMovieDetailMenu from 'front/components/app-movie-details-menu/index.jsx'
import FlowText from 'front/components/util-flow-text/index.jsx'
import CustomScrollbars from 'front/components/util-scroller/index.jsx';
import ListCommaSplit from 'front/components/util-list-comma-split/index.jsx'
//Require for auth
//Database (Api Handler)
import Auth from 'resources/database/auth'
import User from 'resources/database/user'
import Movie from 'resources/database/movies'

//Login view class
export default class MainMovie extends React.Component {
    constructor(props) {
        super(props);

        //Auth object
        this.auth = new Auth();
        this.user = new User();
        this.movie = new Movie();
        //Default state
        this.state = {};

    }

    componentDidMount() {
        //Movie details
        this.movie.get(
            this.props.match.params.imdb, //imdb code
            this.auth.token
        ).then((r)=> {
            this.setState({
                movies: r
            })
        }).catch(()=> {
        })
    }


    render() {
        return (
            <div className="relative full-height movie-details">
                {/*Close button*/}

                <MainHeader text="Movie" icon="icon-tv"/>
                <section className="row clearfix full-height margin-top-5-vh padding-left-2-vw">
                    {/*Main Loader or Movie details*/}
                    {
                        this.state.movies
                        && <div className="row">
                            {/*Aside*/}
                            <aside className="col l4 m4 movie-details-poster">
                                {/*Poster*/}
                                <BoxImage
                                    className="full-width"
                                    src={this.state.movies.large_cover_image}
                                    placeholder={{w: 500, h: 750, c:true}}
                                />
                            </aside>

                            {/*Main Section*/}
                            <section className="col l8 m8">
                                <header className="row">
                                    {/*Movie Info*/}
                                    <AppMovieDetailInfo
                                        title={this.state.movies.title}
                                        info={{
                                            year:this.state.movies.year,
                                            rating:this.state.movies.rating,
                                            runtime:this.state.movies.runtime,
                                            rate:this.state.movies.mpa_rating
                                        }}
                                    />
                                </header>

                                {/*Genres*/}
                                <section className="row">
                                    <ListCommaSplit
                                        list={this.state.movies.genres}
                                    />
                                </section>

                                {/*Description*/}
                                <section className="row movie-details-description clearfix">
                                    <CustomScrollbars
                                        autoHide
                                        autoHideTimeout={1000}
                                        autoHideDuration={200}
                                        thumbMinSize={30}
                                        universal={true}>
                                        <FlowText>
                                            <span>
                                                {this.state.movies.description_full}
                                            </span>
                                        </FlowText>
                                    </CustomScrollbars>
                                </section>

                                {/*Footer*/}
                                <footer className="row nav-bar-movie-details">
                                    <AppMovieDetailMenu
                                        movie={this.state.movies}
                                    />
                                </footer>
                            </section>
                        </div> || <BoxLoader size="100"/>
                    }
                </section>

            </div>
        )
    }
}