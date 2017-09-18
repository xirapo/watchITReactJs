/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
//import setting from 'backend/settings'


export default ({
    invalidString: (string)=> {
        return (typeof string != 'string'
        || !string || /^\s*$/.test(string)
        || string.length == 0)
    },
    makeUid: ()=> {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

})

