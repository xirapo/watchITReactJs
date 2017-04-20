//Basic
import React from 'react'
//Components
import AppMainMenu from '../../../components/app-aside-menu/index.jsx'
import AppMoviesNav from '../../../components/app-main-movies-nav-bar/index.jsx'
import AppMoviesList from '../../../components/app-main-movies-list/index.jsx'
import AppMainTopInput from '../../../components/app-main-movies-top-inputs/index.jsx'
import AppTinyProfile from '../../../components/app-aside-tiny-box-profile/index.jsx'
import BoxLoader from '../../../components/util-box-loader/index.jsx'
import BarLoader from '../../../components/util-bar-loader/index.jsx'
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
        //Default offset
        this.offset = 1;
        //Default state
        this.state = {
            loading: true,
            scrollUpdate: false
        };

        this.sort = {
            limit: 30,
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
                movies: res,
                loading: false,
                scrollUpdate: false

            })
        }).catch((e)=> {
        });
    }

    resetLimit() {
        this.offset = 1;
        this.sort.limit = 30
    }

    onUpdate(e) {
        //On Scroll down
        if (e.top == 1) {
            this.sort.limit = (++this.offset * 30);
            this.setState({
                scrollUpdate: true
            });

            //Request new movies
            this.filterMovies(
                this.sort,
                this.auth.token
            )
        }
    }


    onChange(sort, by) {
        let _sort = {};

        //If by?
        if (by) {
            _sort[sort] = by;
            this.sort = Object.assign(
                {}, this.sort, _sort
            );
        } else {
            if (sort in this.sort) {
                delete this.sort[sort]
            }
        }
        //Reset offset
        this.resetLimit();
        this.setState({
            loading: true,
            scrollUpdate: false
        });

        //Re set movies
        this.filterMovies(
            this.sort,
            this.auth.token
        );
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
                    <div className="clearfix">
                        <section className="row no-margin">
                            <AppMainTopInput/>
                        </section>

                        <nav className="col l12 m12 transparent z-depth-0 margin-bottom-10">
                            <AppMoviesNav onChange={(t,e)=>this.onChange(t,e)}/>
                        </nav>

                        <div className="row full-height">
                            {
                                !this.state.loading
                                && this.state.movies
                                && <AppMoviesList
                                    movies={this.state.movies}
                                    onUpdate={(e)=>this.onUpdate(e)}
                                />
                                || <BoxLoader/>
                            }
                            
                            {/*Check for new data loading*/}
                            {this.state.scrollUpdate && <BarLoader />}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
