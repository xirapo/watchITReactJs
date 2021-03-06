/**
 * Created by gmena on 05-03-17.
 */

import Auth from 'resources/database/auth';
import firebase from 'backend/firebase';
import timeHelper from 'resources/helpers/timeHelper'
import is from 'is_js'

let Logger = ({
    __setLog: (type, message)=> {
        // Initial settings
        const auth = new Auth();

        // Promise
        return new Promise((res, err)=> {
            //On auth ready
            auth.authUser.then((user) => {
                //Initialize database
                const db = firebase.database();
                const dbref = db.ref('user/log/' + user.uid + '/' + type + '/');

                //Append log
                dbref.child(
                    timeHelper.factory(
                        user.settings.timezone
                    ).format('MMMM_D_YYYY')
                ).push().set({
                    content: message,
                    user: user.displayName,
                    datetime: timeHelper.dateTimeZoned(
                        user.settings.timezone
                    )
                }).then(res).catch(err);
            }).catch(err)
        });
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
            console.log(message); //local log
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
            console.error(message.message, message);
        });

    }

});

//default export
export default Logger