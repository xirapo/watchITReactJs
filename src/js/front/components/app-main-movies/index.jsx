import React from 'react'
import AppMoviesNav from '../app-main-movies-nav-bar/index.jsx'
import AppMoviesList from '../app-main-movies-list/index.jsx'
import AppMainTopInput from '../app-main-movies-top-inputs/index.jsx'


export default class AppMoviesSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: 'like_count',
            genre: 'all'
        }
    }

    onChange(type, e) {
        //New object
        let _obj = {};
        _obj[type] = e;
        //Change state
        this.setState(_obj)
    }


    render() {
        return (
            <div className="clearfix">
                <section className="row">
                    <AppMainTopInput/>
                </section>

                <nav className="col l12 m12 transparent z-depth-0 margin-bottom-10">
                    <AppMoviesNav onChange={(t,e)=>this.onChange(t,e)}/>
                </nav>

                <div className="row full-height">
                    <AppMoviesList sort={this.state.sort} genre={this.state.genre}/>
                </div>
            </div>
        )
    }
}
