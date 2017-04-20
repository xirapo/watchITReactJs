//Basic
import React from 'react'
//Components
import AppMainMenu from '../../../components/app-aside-menu/index.jsx'
import AppMoviesSection from '../../../components/app-main-movies/index.jsx'
import AppTinyProfile from '../../../components/app-aside-tiny-box-profile/index.jsx'
//Require for auth
//Database (Api Handler)
import Auth from '../../../../resources/database/auth'
import User from '../../../../resources/database/user'
import Movie from '../../../../resources/database/movies'


//Login view class
export default class App extends React.Component {
    constructor(props) {
        super(props);
        //Auth object
        this.auth = new Auth();
        this.user = new User();
        this.movie = new Movie();

        //Default state
        this.state = {};
        this.sort = {
            sort_by: 'date_uploaded',
            order: 'desc'
        };

        //Start filtering
        this.filterMovies(
            this.sort,
            this.auth.token
        );

        this.basicUserData(
            this.auth.authUser.id,
            this.auth.token
        );

    }

    basicUserData(id, token) {
        //Get data
        this.user.get(
            id, //User id
            token //The request token
        ).then((res)=> {
            this.setState({
                user: res
            });
        }).catch((e)=> {
        });

    }

    filterMovies(filter = {}, token) {
        //Get movies
        this.movie.filter(
            filter, token
        ).then((res)=> {
            this.setState({
                movies: res
            })
        }).catch((e)=> {
        });
    }


    onChange(sort, by) {
        let _sort = {};
        _sort[sort] = by;
        this.sort = Object.assign(
            {}, this.sort, _sort
        );

        //Re set movies
        this.filterMovies(
            this.sort, this.auth.token
        )
    }


    render() {
        return (
            <div className="relative full-height">
                {/*The menu aside*/}
                <aside id="main_menu_aside" className="col l2 m2 full-height padding-top-15">
                    <AppTinyProfile user={this.state.user}/>
                    <AppMainMenu />
                </aside>

                {/*The movies menu*/}
                <section className="col l10 m10">
                    <AppMoviesSection
                        movies={this.state.movies}
                        onChange={(type,e)=>this.onChange(type,e)}
                    />
                </section>
            </div>
        )
    }
}
