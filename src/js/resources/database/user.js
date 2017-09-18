/**
 * Created by gmena on 04-19-17.
 */
//import setting from 'backend/settings';
import firebase from 'backend/firebase'
import logHelper from 'resources/helpers/logHelper';
import utilHelper from 'resources/helpers/utilHelper'
import Auth from 'resources/database/auth'

export default class User {

    update(data) {
        /**
         * UUpdate an user
         * @param data
         */

        return (new Promise((resolve, err) => {

            //Get authorized user
            let _auth = new Auth();

            //Request firebase user update
            _auth.authUser.then((user)=> {
                //Save promises
                let _promises = [];
                //Log
                logHelper.info('\nUPDATE USER ID: ' + user.uid);

                if (data.get('displayName'))
                    _promises.push(user.updateProfile(
                        {'displayName': data.get('displayName')}
                    ));

                if (data.get('email'))
                    _promises.push(user.updateEmail(
                        data.get('email')
                    ));

                if (data.get('password'))
                    _promises.push(user.updatePassword(
                        data.get('password')
                    ));

                //Check for all promises
                Promise.all(_promises).then(
                    resolve
                ).catch((e)=> {
                    err([e.message])
                })

            });


        }));
    }

    create(fullname, email) {
        /**
         * Create user
         * @param id
         */
        return (new Promise((resolve, err) => {
            //Make a generic password
            let password = utilHelper.makeUid();
            //Log
            logHelper.info('\nCREATING USER: ' + fullname);
            //Request to details endpoint
            firebase.auth().createUserWithEmailAndPassword(
                email,
                password
            ).then((res)=> {
                //Log
                //logHelper.ok('USER DATA LOADED FROM REMOTE FOR: ' + res.data.data.fullname.toUpperCase());
                console.log(res);
            }).catch((e)=> {
                err([e.message])
            })
        }));

    }


}