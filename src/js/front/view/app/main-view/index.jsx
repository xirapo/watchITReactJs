//Basic
import React from 'react'
//Components
import AppMainMenu from '../../../components/app-aside-menu/index.jsx'
import AppMoviesSection from '../../../components/app-main-movies/index.jsx'
import AppTinyProfile from '../../../components/app-aside-tiny-box-profile/index.jsx'
//Require for auth
import Auth from '../../../../resources/database/auth'
import User from '../../../../resources/database/user'
import Movie from '../../../../resources/database/movies'

//Login view class
export default class App extends React.Component {
    constructor(props) {
        super(props);
        //Auth object
        this.auth = new Auth();
        this.user = new User();
        this.movie = new Movie();

        //Default state
        this.state = {};

        //Get data
        this.user.get(
            this.auth.authUser.id, //User id
            this.auth.token //The request token
        ).then((res)=> {
            this.setState({
                user: res
            });
        }).catch((e)=>{});

        //Get movies
        this.movie.filter(
            {}, this.auth.token
        ).then((res)=>{
            console.log(res);
        }).catch((e)=>{});

    }


    render() {
        return (
            <div className="relative full-height">
                {/*The menu aside*/}
                <aside id="main_menu_aside" className="col l2 m2 full-height padding-top-15">
                    {this.state.user && <AppTinyProfile user={this.state.user}/> }
                    <AppMainMenu />
                </aside>

                {/*The movies menu*/}
                <section className="col l10 m10">

                </section>
            </div>
        )
    }
}
