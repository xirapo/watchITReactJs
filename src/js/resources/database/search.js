/**
 * Created by gmena on 04-19-17.
 */
//Tools
import setting from 'backend/settings'
import requestHelper from 'resources/helpers/requestHelper'
import axios from 'axios'
import cache from 'lscache'

export default class Search {

    find(q, type, token) {
        /**
         * Return search movies
         * @param q
         * @param token
         */
        return (new Promise((resolve, err) => {
            //the uri
            //to base64 uri
            let _uri = setting.api.search + requestHelper.jsonToQString({'q': q, 'type': type});
            let _uri_crypt = requestHelper.generateCacheToken(_uri).slice(0, -2);

            //Remove old cache
            cache.flushExpired();

            //If fond cache
            if (cache.get(_uri_crypt)) {
                console.log('\nCACHE FOUND FOR SEARCH: ' + q);
                return resolve(
                    cache.get(_uri_crypt)
                )
            }
            //Request to search endpoint
            axios({
                url: _uri,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                console.log('\nSEARCH FROM REMOTE: ' + q);
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