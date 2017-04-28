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
            //Request to list endpoint
            axios({
                url: setting.api.movies + 'list/' + util.jsonToQString(filters),
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

    get(imdb, token) {
        /**
         * Return movie by imdb code
         * @param imdb
         * @param token
         */
        return (new Promise((resolve, err) => {
            //Request to details endpoint
            axios({
                url: setting.api.movies + '?imdb=' + imdb,
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