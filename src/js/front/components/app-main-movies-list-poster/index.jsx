//Basic
import React from 'react'
import setting from 'backend/settings';
//Components
import BoxImage from 'front/components/app-image/index.jsx'
import logHelper from 'resources/helpers/logHelper';

export default class AppMoviesListPoster extends React.Component {
    constructor(props) {
        super(props);
        this.imageRef = null;
    }

    handleImageError(e, i) {
        //Remove bad links
        if (this.imageRef) {
            //Error
            logHelper.error({
                reference: i.imdb_code,
                message: 'ERROR LOADING IMAGE: ' + i.imdb_code,
                code: setting.error_codes.IMAGE_BROKEN_LINK
            });

            //Log
            logHelper.info('REMOVING IMAGE FOR MOVIE: ' + i.imdb_code);
            this.imageRef.remove();
        }
    }


    render() {
        return (<div>
            {this.props.movies.map((i, k)=> {
                return (<div key={k}
                             className="col l2 m2 relative movies-poster padding-left-2 padding-right-2">
                    <a href={"#/app/movie/" + i.imdb_code }>
                        <BoxImage
                            src={i.medium_cover_image}
                            getRef={(e)=> e && (this.imageRef = e)}
                            placeholderImageLoaded={(e)=>this.handleImageError(e, i)}
                        />
                        <div className="hover-poster-box full-width full-height">
                            <div className="hover-info absolute bottom-1-rem">
                                <strong className="white-text truncate">
                                    {i.title}
                                </strong>
                                <span className="green-text">
                                    <i className="icon-calendar margin-right-3-p"/>
                                    {i.year}
                                </span>
                                <span className="orange-text margin-left-5-p">
                                    <i className="icon-star margin-right-2-p"/>
                                    {i.rating}
                                </span>
                            </div>
                        </div>

                    </a>
                </div>)
            })}
        </div>)

    }

}
