/**
 * Created by gmena on 04-19-17.
 */
//import setting from 'backend/settings';
//import firebase from 'backend/firebase'
import logHelper from 'resources/helpers/logHelper';
//import utilHelper from 'resources/helpers/utilHelper'
import Auth from 'resources/database/auth'

export default class User {

    constructor() {
        //Init authentication
        this.auth = new Auth();
    }


    updateProfile(params) {
        /**
         * UUpdate an user
         * @param data
         */

        return (new Promise((resolve, err) => {
            //Request firebase user update
            this.auth.authUser.then((user)=> {
                //Save promises
                let _promises = [];

                //Log
                logHelper.info('UPDATE USER ID: ' + user.uid);

                //Update email
                if (params.email) {
                    _promises.push(user.updateEmail(
                        params.email
                    ));
                }

                //Update name or photo
                if (params.name || params.photo) {
                    //Update fields
                    let _toUpdate = {
                        'displayName': params.name,
                        'photoURL': params.photo
                    };

                    Object.keys(_toUpdate).forEach((key)=> {
                        !_toUpdate[key] && delete _toUpdate[key];
                    });

                    _promises.push(user.updateProfile(
                        _toUpdate
                    ));
                }


                //Check for all promises
                Promise.all(_promises).then(
                    resolve
                ).catch((e)=> {
                    err([e.message])
                })

            });


        }));
    }

    updatePassword(new_password) {
        //Try update passwords
        return (new Promise((resolve, err) => {
            //Request auth
            this.auth.authUser.then((user)=> {
                //Log
                logHelper.info('UPDATE PASSWORD FOR ID: ' + user.uid);
                //Re auth user
                user.reauthenticate(user.credential).then(()=> {
                    // User re-authenticated.
                    user.updatePassword(new_password).then(
                        resolve
                    ).catch((e)=> {
                        err([e.message])
                    });
                }).catch((e)=> {
                    err([e.message])
                });
            }).catch((e)=> {
                err([e.message])
            })
        }));
    }

    // create(params)
    // {
    //     // /**
    //     //  * Create user
    //     //  * @param id
    //     //  */
    //     // return (new Promise((resolve, err) => {
    //     //     //Make a generic password
    //     //     let password = utilHelper.makeUid();
    //     //     //Log
    //     //     logHelper.info('CREATING USER: ' + fullname);
    //     //     //Request to details endpoint
    //     //     firebase.auth().createUserWithEmailAndPassword(
    //     //         email,
    //     //         password
    //     //     ).then((res)=> {
    //     //         //Log
    //     //         //logHelper.ok('USER DATA LOADED FROM REMOTE FOR: ' + res.data.data.fullname.toUpperCase());
    //     //         console.log(res);
    //     //     }).catch((e)=> {
    //     //         err([e.message])
    //     //     })
    //     // }));
    //
    // }


}