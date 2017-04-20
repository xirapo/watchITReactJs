import React from 'react'
import BoxLoader from '../../components/util-box-loader/index.jsx'
import AppMoviesNav from '../app-main-movies-nav-bar/index.jsx'
import AppMoviesList from '../app-main-movies-list/index.jsx'
import AppMainTopInput from '../app-main-movies-top-inputs/index.jsx'


export default class AppMoviesSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="clearfix">
                <section className="row no-margin">
                    <AppMainTopInput/>
                </section>

                <nav className="col l12 m12 transparent z-depth-0 margin-bottom-10">
                    <AppMoviesNav onChange={(t,e)=>this.props.onChange(t,e)}/>
                </nav>

                <div className="row full-height">
                    {this.props.movies && <AppMoviesList movies={this.props.movies}/> || <BoxLoader/>}
                </div>
            </div>
        )
    }
}
