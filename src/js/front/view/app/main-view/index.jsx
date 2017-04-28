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
import CustomScrollbars from '../../../components/util-scroller/index.jsx';

//Require for auth
//Database (Api Handler)
import Auth from '../../../../resources/database/auth'
import User from '../../../../resources/database/user'
import Movie from '../../../../resources/database/movies'
import Search from '../../../../resources/database/search'


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

    onUpdate(e) {
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

        //Empty write
        if (_target_value.length == 0) {
            this.setState({
                searchResult: null
            })
        }

        //Remove old timeout
        if (this.search_timeout) {
            clearTimeout(this.search_timeout);
        }

        //Set time out
        this.search_timeout = setTimeout(()=> {
            //Get movies by search
            this.search.find(
                _target_value, 'movies',
                this.auth.token
            ).then((res)=> {
                this.setState({
                    searchResult: res
                })
            }).catch((e)=> {
                this.setState({
                    searchResult: []
                })
            });
        }, 1000)
    }


    render() {
        return (
            <div className="relative full-height">
                {/*The menu aside
                 //TODO For future, cuando se implementen las funcionalidad del menu, activarlo
                 <aside id="main_menu_aside" className="col l2 m2 full-height padding-top-15">
                 <div className="row">
                 <AppTinyProfile user={this.state.user}/>
                 </div>
                 <AppMainMenu />
                 </aside>
                 */}
                {/*The movies menu*/}
                <section className="row">
                    <div className="clearfix">

                        <header className="row no-margin vertical-padding transparent z-depth-1">
                            <div className="col l3 m4 profile-media">
                                <AppTinyProfile user={this.state.user}/>
                            </div>

                            <div className="col l5 m6 relative search-main-box">
                                <AppMainTopInput
                                    onInput={(e)=>{this.onSearch(e)}}
                                    size="m12 l12"
                                />

                                {
                                    this.state.searchResult &&
                                    <section className="absolute full-width search-result-box left-0 top-100-p z-index-100">
                                        <div className="col l12 m12">
                                            {
                                                <CustomScrollbars
                                                    autoHide
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
                                    </section>
                                }
                            </div>
                        </header>

                        <nav className="col l12 m12 transparent z-depth-0">
                            <AppMoviesNav onChange={(t,e)=>this.onChange(t,e)}/>
                        </nav>

                        <section className="row movies-box">
                            {
                                !this.state.loading
                                && this.state.movies
                                && <AppMoviesList
                                    movies={this.state.movies}
                                    onUpdate={(e)=>this.onUpdate(e)}
                                /> || <BoxLoader size={100}/>
                            }
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}
