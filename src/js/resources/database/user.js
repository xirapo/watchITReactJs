/**
 * Created by gmena on 04-19-17.
 */
import setting from 'backend/settings'
import logHelper from 'resources/helpers/logHelper'
import axios from 'axios'

export default class User {

    get(id, token) {
        /**
         * Return user details
         * @param id
         */

        return (new Promise((resolve, err) => {
            //Request to details endpoint
            axios({
                url: setting.api.user + '?id=' + id,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                //Log
                logHelper.info('\nUSER DATA LOADED FROM REMOTE: ' + JSON.stringify(res.data.data));
                resolve(res.data.data);
            }).catch((e)=> {
                err(e.response)
            })
        }));

    }


}