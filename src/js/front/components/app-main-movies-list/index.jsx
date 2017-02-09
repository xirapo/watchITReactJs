import React from 'react'
import AppMoviesListAvatar from '../app-main-movies-list-avatar/index.jsx'
import CustomScrollbars from '../util-scroller/index.jsx';
import BoxLoader from '../util-box-loader/index.jsx'

//Require for request
let setting = require('../../../backend/settings');
//Request
let axios = require('axios');

export default class AppMoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            movies: []
        };

        //Initial data
        this.updateMovies(
            this.props.sort,
            this.props.genre
        )
    }

    static get defaultProps() {
        return {
            limit: 24
        }
    }

    static get propTypes() {
        return {
            sort: React.PropTypes.string.isRequired,
            genre: React.PropTypes.string.isRequired
        }
    }

    updateMovies(sort, genre, limit = 24) {
        //Request movies
        return axios({
            url: setting.ytsAPI.listMovies + '?limit=' + limit + '&sort_by=' + sort + '&genre=' + genre,
            timeout: setting.ytsAPI.timeout
        }).then((e)=> {
            //Set state for rendering
            this.setState({
                movies: e.data.data.movies,
                loader: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        //Start loader
        this.setState({
            loader: true
        });

        //Updating
        this.updateMovies(
            nextProps.sort,
            nextProps.genre
        )
    }


    render() {
        return (
            !this.state.loader
            && <CustomScrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight
                autoHeightMin={800}
                thumbMinSize={30}
                universal={true}
            >
                <div className="col l12 m12">
                    {
                        this.state.movies.map((i, k)=> {
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
            </CustomScrollbars> || <BoxLoader />
        )
    }
}
