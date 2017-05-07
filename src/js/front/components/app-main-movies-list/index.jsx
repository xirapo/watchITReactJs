//Basic
import React from 'react'
import PropTypes from 'prop-types'
//Components
import AppMoviesListAvatar from 'front/components/app-main-movies-list-poster/index.jsx'
import BoxLoader from 'front/components/util-box-loader/index.jsx'
import PulseLoader from 'front/components/util-pulse-loader/index.jsx'
import CustomScrollbars from 'front/components/util-scroller/index.jsx';


export default class AppMoviesList extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            loading: PropTypes.bool.isRequired,
            scroll: PropTypes.bool.isRequired,
            onScroll: PropTypes.func.isRequired
        }
    }


    render() {
        return (
            (!this.props.loading
            && this.props.movies &&
            <CustomScrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                thumbMinSize={30}
                universal={true}
                onScrollFrame={(e)=>this.props.onScroll(e)}
            >
                <div className="col l12 m12">
                    {/*The movie list*/}
                    <AppMoviesListAvatar movies={this.props.movies}/>

                    {/*Append a loader if loading*/}
                    {
                        this.props.scroll &&
                        <div className="col l2 m2 img-media-large padding-left-2 padding-right-2">
                            <PulseLoader
                                className="center-block margin-top-50-p margin-bottom-50-p width-30-p responsive-img"
                            />
                        </div>
                    }
                </div>
            </CustomScrollbars>) || <BoxLoader size={100}/>
        )

    }

}
