/**
 * Created by gmena on 04-19-17.
 */
import setting from '../../backend/settings'
var axios = require('axios');
//var is_js = require('is_js');

export default class Movies {

    filter(filters = {}, token) {
        /**
         * Return movies
         * @param filter
         * @param token
         */

        return (new Promise((resolve, err) => {
            //Request to auth endpoint
            axios({
                url: setting.api.movies,
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                resolve(res.data.data);
            }).catch((e)=> {
                err(e.response)
            })
        }));

    }


}