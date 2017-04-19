//Basic
import React from 'react'
//Components
import AppMainMenu from '../../../components/app-aside-menu/index.jsx'
import AppMoviesSection from '../../../components/app-main-movies/index.jsx'
import AppTinyProfile from '../../../components/app-aside-tiny-box-profile/index.jsx'
//Require for auth
import Auth from '../../../../resources/database/auth'


//Login view class
export default class App extends React.Component {
    constructor(props) {
        super(props);
        //Auth object
        let _auth = new Auth();

        // //Default state for user_id
        this.state = {
            user: _auth.authUser
        }
    }


    render() {
        return (
            <div className="relative full-height">
                {/*The menu aside*/}
                <aside id="main_menu_aside" className="col l2 m2 full-height padding-top-15">
                    <AppTinyProfile request={Setting.api.user + '/' + this.state.user.id}/>
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