//Basic
import React from 'react'
//Components
import NavBarMenu from 'front/components/app-nav-bar-menu/index.jsx'
import TrailerModal from 'front/components/app-movie-details-trailer-modal/index.jsx'
//Helpers
import cryptHelper from 'resources/helpers/cryptHelper'
//Setting
import settings from 'backend/settings'

export default class AppMovieDetailMenu extends React.Component {
    constructor(props) {
        super(props);
        //Default state
        this.state = {
            torrent: null,
            sub: null,
            isModalOpen: false
        };
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }

    prepareMenu(items, type = 'torrent') {
        let i = 0;
        //Prepare for menu structure
        return items.map((v, k)=> {
            // If type of items is torrent
            if (type == 'torrent')
            //If not found in available resolutions list... Skip !!
                if (!(~(settings.resolutions.available.indexOf(v.quality))))
                    return false;

            return {
                default: (i++ == 0),
                label: type == 'torrent' && v.quality || (v[0].toUpperCase() + v.slice(1)),
                action: type == 'torrent' && v.url || v
            };
        });
    }

    setMenuItem(def, type = 'torrent') {
        this.prepareDataToPlayer(
            def, type
        )
    }


    prepareDataToPlayer(data, type = 'torrent') {
        //Handle type of menu
        if (type == 'torrent') {
            this.setState({
                torrent: cryptHelper.toBase64(
                    JSON.stringify({
                        torrent: data,
                        imdb_code: this.props.movie.imdb_code,
                        title: this.props.movie.title
                    })
                )
            })
        } else {
            this.setState({
                sub: data
            })
        }
    }


    render() {
        return (
            <nav className="col l12 m12 transparent z-depth-0">
                <div className="nav-wrapper">
                    {/*Play*/}
                    <ul>
                        <li className="dropdown">
                            <a className="dropdown-button flow-text clearfix"
                               href={"#/app/movie/play/" + this.state.torrent + '/' + this.state.sub }>
                                <span className="font-light-gray right">Play</span>
                                <i className="icon-controller-play normalize-small-icon float-left margin-right-5"/>
                            </a>
                        </li>
                    </ul>

                    {/*The resolution menu*/}
                    {
                        Object.keys(this.props.movie.torrents).length > 0 && <NavBarMenu
                            btnText="HD"
                            onChange={(torrent) => this.setMenuItem(torrent)}
                            getInitialItem={(t)=>this.setMenuItem(t.action)}
                            list={this.prepareMenu(
                            this.props.movie.torrents
                        )}
                        />
                    }

                    {/*The resolution menu*/}
                    {
                        Object.keys(this.props.movie.subtitles).length > 0 && <NavBarMenu
                            btnText="" onChange={(s) => this.setMenuItem(s, 'sub')}
                            getInitialItem={(s)=>this.setMenuItem(s.action, 'sub')}
                            list={this.prepareMenu(
                                Object.keys(this.props.movie.subtitles).filter((c)=> {
                                    return ~(settings.subs.available.indexOf(c));
                                }), 'sub'
                            )}
                        />
                    }

                    {//Watch Trailer
                     <ul>
                     <li className="dropdown">
                     <a className="dropdown-button flow-text" onClick={() => this.openModal()}>
                     <span className="font-light-gray right">Trailer</span>
                     <i className="icon-video relative top-2 left margin-left-4"/>
                     </a>
                     </li>
                     </ul>

                    }

                    { // Modal
                        <TrailerModal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                            <p><h1>He</h1></p>
                            <p><button onClick={() => this.closeModal()}>Close</button></p>
                        </TrailerModal>
                    }
                </div>
            </nav>
        )
    }
}
