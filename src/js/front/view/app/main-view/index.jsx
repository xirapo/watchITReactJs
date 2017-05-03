//Basic
import React from 'react'
//Components
//import AppMainMenu from '../../../components/app-main-aside-menu/index.jsx'
import AppMoviesNav from '../../../components/app-main-movies-nav-bar/index.jsx'
import AppMoviesList from '../../../components/app-main-movies-list/index.jsx'
import AppMainTopInput from '../../../components/app-main-movies-top-inputs/index.jsx'
import AppMainSearchResult from '../../../components/app-main-search-result/index.jsx'
import AppTinyProfile from '../../../components/app-tiny-box-profile/index.jsx'
import BoxLoader from '../../../components/util-box-loader/index.jsx'
import PointsLoader from '../../../components/util-points-loader/index.jsx'
import CustomScrollbars from '../../../components/util-scroller/index.jsx';

//Require for auth
//Database (Api Handler)
import Auth from '../../../../resources/database/auth'
import User from '../../../../resources/database/user'
import Movie from '../../../../resources/database/movies'
import Search from '../../../../resources/database/search'

//Pulse loader
import PulseLoader from '../../../components/util-pulse-loader/index.jsx'

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
            scrollUpdate: false
        };

        this.sort = {
            limit: 100,
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
        this.sort.limit = 100
    }

    onScrollUpdate(e) {
        //On Scroll down
        if (e.top == 1) {
            this.sort.limit = (++this.offset * 100);
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


    render() {
        return (
            <div className="relative full-height">
                {/*Top main nav*/}
                <section className="row">
                    <div className="clearfix">

                        <header className="row no-margin vertical-padding transparent z-depth-1">
                            <div className="col l4 m4 profile-media clearfix">
                                <AppTinyProfile user={this.state.user}/>
                            </div>

                            <div className="col l6 m6 relative input-black-box">
                                <AppMainTopInput
                                    onInput={(e)=>{this.onSearch(e)}}
                                    size="m12 l12"
                                />
                                {
                                    (this.state.searching || this.state.searchResult) &&
                                    <section
                                        className="absolute full-width search-result-box left-0 top-100-p z-index-100"
                                    >
                                        {
                                            this.state.searching &&
                                            <div className="col l12 m12">
                                                <div className="col l12 m12 result-search-box text-center padding-10">
                                                    <PointsLoader />
                                                </div>
                                            </div> ||
                                            <div className="col l12 m12">
                                                {
                                                    <CustomScrollbars
                                                        autoHide
                                                        autoHeight
                                                        autoHeightMax={500}
                                                        autoHideTimeout={1000}
                                                        autoHideDuration={200}
                                                        thumbMinSize={30}
                                                        universal={true}>
                                                        <AppMainSearchResult
                                                            result={this.state.searchResult}
                                                        />
                                                    </CustomScrollbars>
                                                }
                                            </div>
                                        }
                                    </section>
                                }
                            </div>
                        </header>

                        {/*Top main nav*/}
                        <nav className="col l12 m12 transparent z-depth-0">
                            <AppMoviesNav onChange={(t,e)=>this.onChange(t,e)}/>
                        </nav>

                        {/*Movies section lists*/}
                        <section className="row movies-box">
                            {
                                (!this.state.loading
                                && this.state.movies &&
                                <CustomScrollbars
                                    autoHide
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    thumbMinSize={30}
                                    universal={true}
                                    onScrollFrame={(e)=>this.onScrollUpdate(e)}
                                >
                                    <div className="col l12 m12">
                                        {/*The movie list*/}
                                        <AppMoviesList movies={this.state.movies}/>

                                        {/*Append a loader if loading*/}
                                        {
                                            this.state.scrollUpdate &&
                                            <div className="col l2 m2 img-media-large padding-left-2 padding-right-2">
                                                <PulseLoader
                                                    className="center-block margin-top-50-p width-30-p responsive-img"
                                                />
                                            </div>
                                        }
                                    </div>
                                </CustomScrollbars>) || <BoxLoader size={100}/>
                            }
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}
