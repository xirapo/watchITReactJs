//Basic
import React from 'react'
//Components
//import AppMainMenu from 'front/components/app-main-aside-menu/index.jsx'
import AppMoviesNav from 'front/components/app-main-movies-nav-bar/index.jsx'
import AppMoviesList from 'front/components/app-main-movies-list/index.jsx'
import AppMainTopInput from 'front/components/app-main-movies-top-inputs/index.jsx'
import AppTinyProfile from 'front/components/app-tiny-box-profile/index.jsx'
import AppTopRightMenu from 'front/components/app-main-movies-top-right-menu/index.jsx'
import AppMainSearchResult from 'front/components/app-main-movies-top-search-result/index.jsx'
//Helper
import storageHelper from 'resources/helpers/storageHelper';
import logHelper from 'resources/helpers/logHelper'
import utilHelper from 'resources/helpers/utilHelper'
import setting from 'backend/settings'
//Require for auth
//Database (Api Handler)
import Auth from 'resources/database/auth'
import User from 'resources/database/user'
import Movie from 'resources/database/movies'
import Search from 'resources/database/search'


//Login view class
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        //Auth object
        this.auth = new Auth();
        this.user = new User();
        this.movie = new Movie();
        this.search = new Search();

        //Default state
        this.state = {
            loading: true,
            searching: false,
            searchResult: false,
            scrollUpdate: false,
            movies: []
        };

        //Default offset
        //Max movies for initial request
        this.offset = setting.api.offset;
        this.limit = setting.api.step;
        this.search_timeout = null;
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

        //Basic user data
        this.auth.authUser.then((user)=> {
            this.setState({
                user: user
            });
        })

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
        filter['offset'] = this.offset;

        //Get movies
        this.movie.filter(
            filter, token
        ).then((res)=> {
            //Concat movies
            this.setState({
                movies: this.state.movies.concat(res),
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
            logHelper.info('SCROLLING READY TO UPDATE');
            logHelper.info('LOADING NEW SET OF MOVIES MAX: ' + setting.api.step + ' MOVIES');

            //Load new set of movies
            ++this.offset;
            logHelper.info('LOADING: ' + (this.offset * setting.api.step) + ' MOVIES');

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
            //Get cache from localStorage
            let _sort_cache = storageHelper.get().from.main_nav_filters();
            let _hash = {'genres': genres, 'sort_by': sort};

            //For each key in cache
            for (let key_ in _hash) {
                //Check for genres in cache filter
                if (key_ in _sort_cache) {
                    //Iterate over element lists
                    for (let item in _hash[key_]) {
                        //Clean default
                        if ('default' in _hash[key_][item])
                            delete _hash[key_][item]['default'];

                        //Set new default
                        if (_hash[key_][item].action == _sort_cache[key_]) {
                            _hash[key_][item]['default'] = true;
                        }
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
        // //If by?
        if ((storageHelper.get().from.main_nav_filters())) {
            this.sort = Object.assign(
                {}, this.sort,
                storageHelper.get().from.main_nav_filters(),
                {[sort]: by}
            );
        } else {
            if (by) {
                this.sort = Object.assign(
                    {}, this.sort, {[sort]: by}
                );
            } else {
                if (sort in this.sort) {
                    delete this.sort[sort]
                }
            }
        }

        //Set new state
        //Reset limit
        //logHelper.warn('RESET OFFSET AND ENABLED INFINTE SCROLL');
        this.offset = setting.api.offset;
        this.setState({
            movies: [],
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
        let _invalid_input = utilHelper.invalidString(_target_value);

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
        //Logout user
        this.auth.logout.then(()=> {
            //Redirect
            setTimeout(()=> {
                location.href = '#/'
            }, 1000);
        })
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

                            <div className="col l2 m2 relative right top-right-small-menu top-1-vh">
                                {/*The top right man nav bar menu */}
                                <AppTopRightMenu
                                    user={this.state.user}
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
