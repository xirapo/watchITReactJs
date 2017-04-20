/**
 * Created by gmena on 04-19-17.
 */
//Tools
import setting from '../../backend/settings'
import util from '../../resources/helpers/requestHelper'
import axios from 'axios'
//var is_js = require('is_js');

export default class Movies {

    filter(filters = {}, token) {
        /**
         * Return movies
         * @param filter
         * @param token
         */
        return (new Promise((resolve, err) => {
            //Merge filters
            filters = Object.assign({}, filters, {
                    limit: setting.system.MAX_HOME_MOVIES
                }
            );

            //Request to auth endpoint
            axios({
                url: setting.api.movies + util.jsonToQString(filters),
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