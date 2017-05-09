/**
 * Created by gmena on 04-19-17.
 */
import setting from 'backend/settings'
import axios from 'axios'
//Helpers
import storageHelper from 'resources/helpers/storageHelper';
import logHelper from 'resources/helpers/logHelper'

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
                    //TODO maybe save time of login for expire token
                    //Log
                    logHelper.info('LOGGED IN USER WITH TOKEN: ' + res.data.data.token);
                    //Save in storage
                    storageHelper.add(res.data.data.token, false).to.user_token();
                    storageHelper.add(res.data.data.user).to.user();
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

        return storageHelper.get(
            //Nothing ;)
        ).from.user();
    }

    get token() {
        /**
         * Return authenticated token
         * @return string|null
         */
        return storageHelper.get(
            false //No parse
        ).from.user_token();
    }


    get isAuth() {
        /**
         * Validate auth state
         * @return boolean
         */
        return !!storageHelper.get(
            false //No parse
        ).from.user_token();
    }


}