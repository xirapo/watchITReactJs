/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
import cryptHelper from './cryptHelper'

export default ({
    jsonToQString: (ob)=> {
        var _keys = Object.keys(ob);
        return encodeURI('?' + (_keys.reduce((before, now)=> {
                return (before += (now + '=' + ob[now] + '&'))
            }, '')).slice(0, -1));
    },
    generateCacheToken: (data)=> {
        //The uri to request
        return cryptHelper.toBase64(
            data
        ).toUpperCase();

    }

})

