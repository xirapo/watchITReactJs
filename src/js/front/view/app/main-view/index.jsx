//Basic
import React from 'react'
//Components
//import AppMainMenu from 'front/components/app-main-aside-menu/index.jsx'
import AppMoviesNav from 'front/components/app-main-movies-nav-bar/index.jsx'
import AppMoviesList from 'front/components/app-main-movies-list/index.jsx'
import AppMainTopInput from 'front/components/app-main-movies-top-inputs/index.jsx'
import AppMainSearchResult from 'front/components/app-main-search-result/index.jsx'
import AppTinyProfile from 'front/components/app-tiny-box-profile/index.jsx'
//Helper
import logHelper from 'resources/helpers/logHelper'
import setting from 'backend/settings'
//Require for auth
//Database (Api Handler)
import Auth from 'resources/database/auth'
import User from 'resources/database/user'
import Movie from 'resources/database/movies'
import Search from 'resources/database/search'

//Helpers
import storageHelper from 'resources/helpers/storageHelper';

//Login view class
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        //Auth object
        this.auth = new Auth();
        this.user = new User();
        this.movie = new Movie();
        this.search = new Search();

        //Default offset
        this.offset = 1;
        this.search_timeout = null;

        //Default state
        this.state = {
            loading: true,
            searching: false,
            searchResult: false,
            scrollUpdate: false
        };

        //Max movies for initial request
        this.limit = setting.api.step;
        this.sort = {
            sort_by: 'date_uploaded',
            order: 'desc'
        };


    }

    componentDidMount() {
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

    filterMovies(filter = {}, token, cached = true) {

        //Get from cache filters
        if (storageHelper.get().from.main_nav_filters() && cached) {
            filter = storageHelper.get().from.main_nav_filters();
        }

        //Clean all.. invalid
        if ('genres' in filter) {
            if (filter['genres'] == 'All') {
                delete filter['genres']
            }
        }

        //Renew limit
        filter['limit'] = this.limit;

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

    onScrollUpdate(e) {

        //If not already loading and top
        if (e.top > 0.9 && !this.state.scrollUpdate) {
            //Update scrolling state
            this.setState({
                scrollUpdate: true
            });

            //Log
            logHelper.info('\nSCROLLING READY TO UPDATE');
            logHelper.info('LOADING NEW SET OF MOVIES MAX: ' + setting.api.step + ' MOVIES');

            //Load new set of movies
            this.limit = (++this.offset * setting.api.step);
            logHelper.info('LOADING: ' + this.limit + ' MOVIES');

            //Request new movies
            this.filterMovies(
                this.sort,
                this.auth.token
            )
        }
    }

    initialNavVar(genres, sort) {
        //Has sort cache?
        if (storageHelper.get().from.main_nav_filters()) {
            let _sort_cache = storageHelper.get().from.main_nav_filters();

            //Check for genres in cache filter
            if ('genres' in _sort_cache) {
                for (let gen in genres) {
                    //Clean default
                    if ('default' in genres[gen])
                        delete genres[gen]['default'];

                    //Set new default
                    if (genres[gen].action == _sort_cache['genres']) {
                        genres[gen]['default'] = true;
                    }
                }
            }

            //Check for sort cache
            if ('sort_by' in _sort_cache) {
                for (let sor in sort) {
                    //Clean default
                    if ('default' in sort[sor])
                        delete sort[sor]['default'];

                    //Set new default
                    if (sort[sor].action == _sort_cache['sort_by']) {
                        sort[sor]['default'] = true;
                    }
                }
            }
        }

        //Return initial
        return {
            genres: genres,
            sort: sort
        }
    }


    onChange(sort, by) {
        let _sort = {};// //If by?

        // //If by?
        if (storageHelper.get().from.main_nav_filters()) {
            _sort[sort] = by;
            this.sort = Object.assign(
                {}, this.sort, storageHelper.get().from.main_nav_filters(), _sort
            );
        } else {
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
        }

        //Reset limit
        this.limit = setting.api.step;
        this.offset = 1;

        //Set new state
        this.setState({
            loading: true,
            scrollUpdate: false
        });

        //Set cache filters
        storageHelper.add(
            this.sort //Save new sort
        ).to.main_nav_filters();

        //Re set movies
        this.filterMovies(
            this.sort,
            this.auth.token
        );
    }

    onSearch(e) {
        //The incoming value;
        let _target_value = e.target.value;
        let _invalid_input = !_target_value || /^\s*$/.test(_target_value) || _target_value.length == 0;

        //Empty write
        if (_invalid_input) {
            this.setState({
                searchResult: false,
                searching: false
            });
        } else {
            //Searching
            this.setState({
                searching: true
            });
        }


        //Remove old timeout
        if (this.search_timeout) {
            clearTimeout(this.search_timeout);
        }

        //Set time out
        this.search_timeout = setTimeout(()=> {
            //Check invalid
            if (!_invalid_input)
            //Get movies by search
                this.search.find(
                    _target_value, 'movies',
                    this.auth.token
                ).then((res)=> {
                    this.setState({
                        searchResult: res,
                        searching: false
                    })
                }).catch((e)=> {
                    this.setState({
                        searchResult: [],
                        searching: false
                    })
                });
        }, 1000)
    }

    logOut(e) {
        e.preventDefault();
        //Clean logged data
        storageHelper.remove().user_token();
        storageHelper.remove().user();

        //Redirect
        setTimeout(()=> {
            location.href = '#/'
        }, 1000);

    }


    render() {
        return (
            <div className="relative full-height main-view">
                {/*Top main nav*/}
                <section className="row full-height">
                    <div className="clearfix">

                        <header className="row no-margin vertical-padding transparent z-depth-1">
                            <div className="col l4 m4 profile-media clearfix">
                                <AppTinyProfile
                                    user={this.state.user}
                                    onLogOut={(e)=>this.logOut(e)}
                                />
                            </div>

                            <div className="col l6 m6 relative input-black-box">
                                <AppMainTopInput
                                    onInput={(e)=>{this.onSearch(e)}}
                                    size="m12 l12"
                                />
                                {/*Search result box*/}
                                <AppMainSearchResult
                                    searching={this.state.searching}
                                    result={this.state.searchResult}
                                />
                            </div>
                        </header>

                        {/*Top main nav*/}
                        <nav className="col l12 m12 transparent z-depth-0">
                            <AppMoviesNav
                                onChange={(t,e)=>this.onChange(t,e)}
                                setInitialNavVar={this.initialNavVar}
                            />
                        </nav>

                        {/*Movies section lists*/}
                        <section className="row movies-box clearfix">
                            <AppMoviesList
                                loading={this.state.loading}
                                movies={this.state.movies}
                                scroll={this.state.scrollUpdate}
                                onScroll={(e)=>this.onScrollUpdate(e)}
                            />
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}
