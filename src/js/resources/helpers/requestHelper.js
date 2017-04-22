/**
 * Created by gmena on 04-20-17.
 */

export default ({
    jsonToQString: (ob)=> {
        var _keys = Object.keys(ob);
        return encodeURI('?' + (_keys.reduce((before, now)=> {
                return (before += (now + '=' + ob[now] + '&'))
            }, '')).slice(0, -1));
    }

})