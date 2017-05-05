//Basic
import React from 'react'
//Components
import BoxLoader from 'front/components/util-box-loader/index.jsx'
import BtnClose from 'front/components/util-btn-close/index.jsx'
import MovieDetails from 'front/components/app-movie-details/index.jsx'
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
                <BtnClose />
                <section className="row clearfix full-height margin-top-5-vh padding-left-2-vw">
                    {/*Main Loader or Movie details*/}
                    {
                        this.state.movies
                        && <MovieDetails movie={this.state.movies}/>
                        || <BoxLoader size="100"/>
                    }
                </section>

            </div>
        )
    }
}