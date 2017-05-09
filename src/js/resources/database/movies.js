/**
 * Created by gmena on 04-19-17.
 */
//Tools
import setting from 'backend/settings'
import requestHelper from 'resources/helpers/requestHelper'
import logHelper from 'resources/helpers/logHelper'

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
                //Cache
                let _cache = cache.get(_uri_crypt);
                //Log
                logHelper.info('\nMOVIES LIST CACHE FOUND');
                logHelper.info(_cache.length + ' MOVIES LOADED FROM CACHE');
                return resolve(
                    _cache
                )
            }

            //Request to list endpoint
            axios({
                url: _uri,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                //Log
                logHelper.info('\nMOVIES LIST FROM REMOTE');
                logHelper.info(res.data.data.length + ' MOVIES LOADED FROM REMOTE');
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
                //Log
                logHelper.info('\nMOVIE CACHE FOUND FOR: ' + imdb);
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
                //Log
                logHelper.info('\nMOVIE FROM REMOTE: ' + imdb);
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