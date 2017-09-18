/**
 * Created by gmena on 05-03-17.
 */

import Auth from 'resources/database/auth';
import firebase from 'backend/firebase';



export default ({
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
        let db = firebase.database();
        let dbref = db.ref('user/log/');

        let d = data;
        let _auth = new Auth();

        _auth.authUser.then((user) => {
            dbref.push().set({
                content:d,
                type: 'ERROR',
                user: user,
            });
        });

        console.error('%c' + data, 'color: red;')
    }

})