/**
 * Created by gmena on 04-19-17.
 */
import setting from '../../backend/settings'
import axios from 'axios'
//var is_js = require('is_js');

export default class User {

    get(id, token) {
        /**
         * Return user details
         * @param id
         */

        return (new Promise((resolve, err) => {
            //Request to auth endpoint
            axios({
                url: setting.api.user + id,
                method: 'get',
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