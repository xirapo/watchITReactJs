/**
 * Created by gmena on 04-19-17.
 */
//Tools
import setting from '../../backend/settings'
import requestHelper from '../../resources/helpers/requestHelper'
import axios from 'axios'
import cache from 'lscache'

export default class Movies {

    filter(filters = {}, token) {
        /**
         * Return movies
         * @param filter
         * @param token
         */
        return (new Promise((resolve, err) => {
            //the uri
            //to base64 uri
            let _uri = setting.api.movies + 'list/' + requestHelper.jsonToQString(filters);
            let _uri_crypt = requestHelper.generateCacheToken(_uri).slice(0, -2);

            //Remove old cache
            cache.flushExpired();

            //If fond cache
            if (cache.get(_uri_crypt)) {
                console.log('cache found ' + _uri);
                return resolve(
                    cache.get(_uri_crypt)
                )
            }


            //Request to list endpoint
            axios({
                url: _uri,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                console.log('data from http response ' + _uri);
                //set cache
                cache.set(
                    _uri_crypt,
                    res.data.data,
                    setting.api.cache_time
                );

                //resolve
                resolve(
                    res.data.data
                );
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
            //the uri
            //to base64 uri
            let _uri = setting.api.movies + '?imdb=' + imdb;
            let _uri_crypt = requestHelper.generateCacheToken(_uri).slice(0, -2);

            //Remove old cache
            cache.flushExpired();

            //If fond cache
            if (cache.get(_uri_crypt)) {
                console.log('cache found ' + _uri);
                return resolve(
                    cache.get(_uri_crypt)
                )
            }

            //Request to details endpoint
            axios({
                url: _uri,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                console.log('data from http response ' + _uri);
                //set cache
                cache.set(
                    _uri_crypt,
                    res.data.data,
                    setting.api.cache_time
                );

                //resolve
                resolve(
                    res.data.data
                );
            }).catch((e)=> {
                err(e.response)
            })
        }));

    }


}