/**
 * Created by gmena on 04-19-17.
 */
import setting from '../../backend/settings'
import axios from 'axios'
//var is_js = require('is_js');

export default class Authentication {

    authenticate(email, password) {
        /**
         * Authenticate client to Api
         * @param email
         * @param password
         */

        return (new Promise((resolve, err) => {
            //Set form data
            let _request_params = new FormData();
            _request_params.append('email', email);
            _request_params.append('password', password);

            //Request to auth endpoint
            axios.post(setting.api.auth, _request_params).then((res)=> {
                if ('data' in res) {
                    //TODO maybe save time of loggin for expire token
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.data.user));
                    resolve(res.data)
                } else {
                    //Invalid token from response
                    err('No token in response')
                }


            }).catch((e)=> {
                err(e.response)
            })
        }));

    }

    get authUser() {
        /**
         * Return authenticated user basic data
         * @return object|null
         */

        let _user = localStorage.getItem('user');
        return _user ? JSON.parse(_user) : null
    }

    get token() {
        /**
         * Return authenticated token
         * @return string|null
         */
        return localStorage.getItem(
            'token'
        )
    }


    get isAuth() {
        /**
         * Validate auth state
         * @return boolean
         */
        return !!localStorage.getItem(
            'token'
        )
    }


}