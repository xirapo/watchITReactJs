import React from 'react'
import MainHeader from '../../components/util-header/index.jsx'
import MovieDetails from '../../components/app-movie-details/index.jsx'

//Login view class
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="relative full-height">
                <header className="row">
                    <MainHeader />
                </header>
                <section className="row">
                    <MovieDetails id={this.props.params.id} />
                </section>
            </div>
        )
    }
}