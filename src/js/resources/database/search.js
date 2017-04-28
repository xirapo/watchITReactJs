/**
 * Created by gmena on 04-19-17.
 */
//Tools
import setting from '../../backend/settings'
import util from '../../resources/helpers/requestHelper'
import axios from 'axios'
//var is_js = require('is_js');

export default class Search {

    find(q, type, token) {
        /**
         * Return search movies
         * @param q
         * @param token
         */
        return (new Promise((resolve, err) => {
            //Request to search endpoint
            axios({
                url: setting.api.search + util.jsonToQString({'q': q, 'type': type}),
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