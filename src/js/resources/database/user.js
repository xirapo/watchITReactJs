/**
 * Created by gmena on 04-19-17.
 */
import setting from 'backend/settings';
import logHelper from 'resources/helpers/logHelper';
import responseHelper from 'resources/helpers/responseHelper';
import axios from 'axios'

export default class User {

    update(data, id, token) {
        /**
         * Create a new user
         * @param data
         */

        return (new Promise((resolve, err) => {
            //Log
            logHelper.info('\nUPDATE USER ID: ' + id);
            //Request to details endpoint
            axios({
                url: setting.api.user + '?id=' + id,
                method: 'put',
                data: data,
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                //Log
                logHelper.ok('USER UPDATED FOR ID: ' + id);
                resolve(res.data);
            }).catch((e)=> {
                //Process error
                err(
                    responseHelper.badResponse(
                        e.response
                    )
                )
            })
        }));
    }

    get(id, token) {
        /**
         * Return user details
         * @param id
         */
        return (new Promise((resolve, err) => {
            //Log
            logHelper.info('\nLOADING DATA FROM REMOTE FOR USER ID: ' + id);
            //Request to details endpoint
            axios({
                url: setting.api.user + '?id=' + id,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                //Log
                logHelper.ok('USER DATA LOADED FROM REMOTE FOR: ' + res.data.data.fullname.toUpperCase());
                resolve(res.data.data);
            }).catch((e)=> {
                err(e.response)
            })
        }));

    }


}