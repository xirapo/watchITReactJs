/**
 * Created by gmena on 05-03-17.
 */

import Auth from 'resources/database/auth';
import firebase from 'backend/firebase';

let Logger = ({
    __init: (user)=> {
        let db = firebase.database();
        let dbref = db.ref('user/log/');
        let auth = new Auth();

        return [auth, dbref]
    },
    ok: (data)=> {
        console.log('%c' + data, 'color: green;')
    },
    log: (data)=> {
        console.log(data)
    },
    info: (data)=> {
        console.info('%c' + data, 'color: blue;')
    },
    warn: (data)=> {
        console.warn('%c' + data, 'color: orange;')

    },
    error: (data)=> {
        //Initial settings
        const [auth, dbref] = Logger.___init();

        //On auth ready
        auth.authUser.then((user) => {
            dbref.child(user.uid).push().set({
                content: data,
                type: 'ERROR',
                user: user
            });
        });

        //Local log
        console.error('%c' + data, 'color: red;');
    }

});

//default export
export default Logger