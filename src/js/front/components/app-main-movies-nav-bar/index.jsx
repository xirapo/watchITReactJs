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
                'default': true
            }, {
                'label': 'Action',
                'action': 'Action'
            }, {
                'label': 'Adventure',
                'action': 'Adventure'
            }, {
                'label': 'Animation',
                'action': 'Animation'
            }, {
                'label': 'Biography',
                'action': 'Biography'
            }, {
                'label': 'Comedy',
                'action': 'Comedy'
            }, {
                'label': 'Crime',
                'action': 'Crime'
            }, {
                'label': 'Documentary',
                'action': 'Documentary'
            }, {
                'label': 'Drama',
                'action': 'Drama'
            }, {
                'label': 'Family',
                'action': 'Family'
            }, {
                'label': 'Fantasy',
                'action': 'Fantasy'
            }, {
                'label': 'Film-Noir',
                'action': 'Film-noir'
            }, {
                'label': 'History',
                'action': 'History'
            }, {
                'label': 'Horror',
                'action': 'Horror'
            }, {
                'label': 'Music',
                'action': 'Music'
            }, {
                'label': 'Musical',
                'action': 'Musical'
            }, {
                'label': 'Mystery',
                'action': 'Mystery'
            }, {
                'label': 'Romance',
                'action': 'Romance'
            },  {
                'label': 'Sci-Fi',
                'action': 'Sci-Fi'
            }, {
                'label': 'Sport',
                'action': 'Sport'
            }, {
                'label': 'Thriller',
                'action': 'Thriller'
            }, {
                'label': 'War',
                'action': 'War'
            }, {
                'label': 'Western',
                'action': 'Western'
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
