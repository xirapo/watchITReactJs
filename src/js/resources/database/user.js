/**
 * Created by gmena on 04-19-17.
 */
import setting from '../../backend/settings'
var axios = require('axios');
//var is_js = require('is_js');

export default class User {

    get(id) {
        /**
         * Return user details
         * @param id
         */

        return (new Promise((resolve, err) => {
            //Set form data
            let _request_params = new FormData();
            _request_params.append('email', email);
            _request_params.append('password', password);

            //Request to auth endpoint
            axios.get(setting.api.user + '/id').then((res)=> {

            }).catch((e)=> {
                err(e.response)
            })
        }));

    }


}