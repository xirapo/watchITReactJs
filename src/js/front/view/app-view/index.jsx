import React from 'react'

import AppMainMenu from '../../components/app-aside-menu/index.jsx'
import AppMoviesSection from '../../components/app-main-movies/index.jsx'
import AppTinyProfile from '../../components/app-aside-tiny-box-profile/index.jsx'

//Require for request
var setting = require('../../../backend/settings');

//Login view class
export default class App extends React.Component {
    constructor(props) {
        super(props);

        //No logged? GO OUT!!!
        if (!localStorage.getItem('token')) {
            location.href = 'app://host/index.html'
        }

    }


    render() {
        return (
            <div className="relative full-height">
                {/*The menu aside*/}
                <aside id="main_menu_aside" className="col l2 m2 full-height padding-top-15">
                    <AppTinyProfile request={setting.wtAPI.user_me}/>
                    <AppMainMenu />
                </aside>

                {/*The movies menu*/}
                <section className="col l10 m10">
                    <AppMoviesSection />
                </section>
            </div>


        )
    }
}