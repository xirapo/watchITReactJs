//Basic
import React from 'react'

//Components
import BoxLoader from '../../../components/util-box-loader/index.jsx'
import MainHeader from '../../../components/util-header/index.jsx'
import MovieDetails from '../../../components/app-movie-details/index.jsx'

//Require for auth
//Database (Api Handler)
import Auth from '../../../../resources/database/auth'
import User from '../../../../resources/database/user'
import Movie from '../../../../resources/database/movies'

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


    componentDidMount(){
        //Movie details
        this.movie.get(
            this.props.match.params.imdb //imdb code
        ).then((r)=> {
            this.setState({
                movies: r
            })
        }).catch(()=> {
        })
    }

    render() {
        return (
            <div className="relative full-height">
                <header className="row">
                    <MainHeader />
                </header>
                <section className="row margin-top-20">
                    {/*Main Loader or Movie details*/}
                    {
                        this.state.movies && <MovieDetails movie={this.state.movies}/>
                        || <BoxLoader size="100"/>
                    }
                </section>

            </div>
        )
    }
}