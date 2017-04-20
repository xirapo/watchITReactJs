import React from 'react'
import AppMoviesNavBarMenu from '../app-main-movies-nav-bar-menu/index.jsx'

export default class AppMoviesNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: [{
                'label': 'Year',
                'action': 'year'
            }, {
                'label': 'Title',
                'action': 'title'
            }, {
                'label': 'Recently Added',
                'action': 'date_uploaded',
                'default': true
            }, {
                'label': 'Runtime',
                'action': 'runtime'
            }, {
                'label': 'Rating',
                'action': 'rating'
            }],
            genres: [{
                'label': 'All',
                'action': 'all',
                'default': true
            }, {
                'label': 'Action',
                'action': 'action'
            }, {
                'label': 'Adventure',
                'action': 'adventure'
            }, {
                'label': 'Animation',
                'action': 'animation'
            }, {
                'label': 'Biography',
                'action': 'biography'
            }, {
                'label': 'Comedy',
                'action': 'comedy'
            }, {
                'label': 'Crime',
                'action': 'crime'
            }, {
                'label': 'Documentary',
                'action': 'documentary'
            }, {
                'label': 'Drama',
                'action': 'drama'
            }, {
                'label': 'Family',
                'action': 'family'
            }, {
                'label': 'Fantasy',
                'action': 'fantasy'
            }, {
                'label': 'Film-Noir',
                'action': 'film-noir'
            }, {
                'label': 'History',
                'action': 'history'
            }, {
                'label': 'Horror',
                'action': 'horror'
            }, {
                'label': 'Music',
                'action': 'music'
            }, {
                'label': 'Musical',
                'action': 'musical'
            }, {
                'label': 'Mystery',
                'action': 'mystery'
            }, {
                'label': 'Romance',
                'action': 'romance'
            }, {
                'label': 'Romance',
                'action': 'romance'
            }, {
                'label': 'Sci-Fi',
                'action': 'sci-fi'
            }, {
                'label': 'Sport',
                'action': 'sport'
            }, {
                'label': 'Thriller',
                'action': 'thriller'
            }, {
                'label': 'War',
                'action': 'war'
            }, {
                'label': 'Western',
                'action': 'western'
            }]
        }
    }

    onChange(type, e) {
        //OnChange
        if (this.props.onChange) {
            this.props.onChange(type, e);
        }
    }


    render() {
        return (
            <div className="nav-wrapper">
                <AppMoviesNavBarMenu
                    btnText="Sort By" list={this.state.sort}
                    onChange={(e)=>this.onChange('sort_by',e)}
                />

                <AppMoviesNavBarMenu
                    btnText="Genre" list={this.state.genres}
                    onChange={(e)=>this.onChange('genres',e)}
                />
            </div>
        )
    }
}
