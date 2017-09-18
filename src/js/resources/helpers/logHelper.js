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
    ok: (data)=> { // Initial sett
        const [auth,dbref] = Logger.__init();

        //On auth ready
        auth.authUser.then((user) => {
            dbref.child(user.uid).push().set({
                content:data,
                type:'OK',
                user:user
            });
        });
        console.log('%c' + data, 'color: green;')
    },
    log: (data)=> { // Initial sett
        const [auth,dbref] = Logger.__init();

        //On auth ready
        auth.authUser.then((user) => {
            dbref.child(user.uid).push().set({
                content:data,
                type:'LOG',
                user:user
            });
        });
        console.log(data)
    },
    info: (data)=> {

        // Initial sett
        const [auth,dbref] = Logger.__init();

        //On auth ready
        auth.authUser.then((user) => {
            dbref.child(user.uid).push().set({
                content:data,
                type:'INFO',
                user:user
            });
        });
        console.info('%c' + data, 'color: blue;')
    },
    warn: (data)=> {
        // Initial sett
        const [auth,dbref] = Logger.__init();

        //On auth ready
        auth.authUser.then((user) => {
            dbref.child(user.uid).push().set({
                content:data,
                type:'WARNNING',
                user:user
            });
        });


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