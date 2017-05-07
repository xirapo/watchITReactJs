//Basic
import React from 'react'
import PropTypes from 'prop-types'
//Components
import AppMainSearchResultBox from 'front/components/app-main-search-result-box/index.jsx'
import PointsLoader from 'front/components/util-points-loader/index.jsx'
import CustomScrollbars from 'front/components/util-scroller/index.jsx';

export default class AppMainSearchResult extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            searching: PropTypes.bool.isRequired
        }
    }


    render() {
        return (
            (this.props.searching || this.props.result) &&
            <section
                className="absolute full-width search-result-box left-0 top-100-p z-index-100"
            >
                {
                    this.props.searching &&
                    <div className="col l12 m12">
                        <div className="col l12 m12 result-search-box text-center padding-10">
                            <PointsLoader />
                        </div>
                    </div> ||
                    <div className="col l12 m12">
                        <CustomScrollbars
                            autoHide
                            autoHeight
                            autoHeightMax={500}
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            thumbMinSize={30}
                            universal={true}>
                            <AppMainSearchResultBox
                                result={this.props.result}
                            />
                        </CustomScrollbars>
                    </div>
                }
            </section>
        )
    }
}
