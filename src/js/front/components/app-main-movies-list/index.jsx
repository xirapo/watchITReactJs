//Basic
import React from 'react'
//Components
import BoxImage from '../app-image/index.jsx'
import CustomScrollbars from '../util-scroller/index.jsx';


export default class AppMoviesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomScrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight={true}
                autoHeightMin={530}
                thumbMinSize={30}
                universal={true}
                onScrollFrame={this.props.onUpdate}>
                <div className="col l12 m12">
                    {
                        this.props.movies.map((i, k)=> {
                            return (
                                <div key={k} className="col l2 m2 padding-left-2 padding-right-2">
                                    <a href={"#/app/movie/" + i.imdb_code }>
                                        <BoxImage src={i.medium_cover_image }/>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </CustomScrollbars>
        )
    }
}
