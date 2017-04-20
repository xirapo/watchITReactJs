import React from 'react'
import AppMenuItems from '../app-aside-menu-items/index.jsx'
import AppMenuHeaders from '../app-aside-menu-headers/index.jsx'

export default class AppMainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                items: [{
                    href: '/',
                    textColor: 'white',
                    icon: 'icon-globe',
                    content: 'Browse'
                }, {
                    href: '/activity',
                    textColor: 'white',
                    icon: 'icon-users',
                    content: 'Activity'
                }, {
                    href: '/streaming',
                    textColor: 'white',
                    icon: 'icon-tv',
                    content: 'Streaming'
                }]
            },
            playlist: {
                items: []
            }
        }
    }

    render() {
        return (
            <section className="row vertical-padding">
                <div id="main_menu">
                    {/*Main Menu items*/}
                    <AppMenuHeaders className="margin-bottom-5">
                        MAIN
                    </AppMenuHeaders>
                    <AppMenuItems items={this.state.menu.items}/>

                    {/*Main menu playlist*/}
                    <AppMenuHeaders className="margin-top-5" action="Add Playlist">
                        LISTS
                    </AppMenuHeaders>
                    <AppMenuItems items={this.state.playlist.items}/>
                </div>
            </section>
        )
    }
}
