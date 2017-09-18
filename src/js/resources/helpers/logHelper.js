/**
 * Created by gmena on 05-03-17.
 */

import Auth from 'resources/database/auth';
import firebase from 'backend/firebase';

let Logger = ({
    __setLog: (type, message)=> {
        // Initial settings
        const [auth, dbref] = Logger.__init();
        // Promise
        return new Promise((res, err)=> {
            //On auth ready
            auth.authUser.then((user) => {
                dbref.child(user.uid).push().set({
                    content: data,
                    type: type,
                    user: user
                }).then(res).catch(err);
            }).catch(err)
        });

    },
    __init: (user)=> {
        //Initialize database
        let db = firebase.database();
        let dbref = db.ref('user/log/');
        let auth = new Auth();

        return [auth, dbref]
    },
    ok: (message)=> {
        //Logging OK
        Logger.__setLog('OK', message).then(()=> {
            //local log
            console.log('%c' + message, 'color: green;');
        });

    },
    log: (message)=> { // Initial sett
        //Logging OK
        Logger.__setLog('LOG', message).then(()=> {
            console.log(data); //local log
        });
    },
    info: (message)=> {
        //Logging INFO
        Logger.__setLog('INFO', message).then(()=> {
            //local log
            console.info('%c' + message, 'color: blue;');
        });

    },
    warn: (message)=> {
        //Logging INFO
        Logger.__setLog('WARNING', message).then(()=> {
            //local log
            console.warn('%c' + message, 'color: orange;');
        });
    },
    error: (message)=> {
        //Logging INFO
        Logger.__setLog('ERROR', message).then(()=> {
            //local log
            console.error('%c' + message, 'color: red;');
        });

    }

});

//default export
export default Logger