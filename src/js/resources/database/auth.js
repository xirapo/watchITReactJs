/**
 * Created by gmena on 04-19-17.
 */
import firebase from 'backend/firebase'
import setting from 'backend/settings'
//Helpers
import storageHelper from 'resources/helpers/storageHelper';
import logHelper from 'resources/helpers/logHelper'

export default class Authentication {

    authenticate(email, password) {
        /**
         * Authenticate client to Api
         * @param email
         * @param password
         */

        return (new Promise((resolve, err) => {
            //Log
            logHelper.info('REQUESTING LOGIN WITH CREDENTIALS: ' + email + '-' + password);
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=> {
                //Firebase authentication
                firebase.auth().signInWithEmailAndPassword(
                    email, //User email
                    password //User password
                ).then((e)=> {
                    //Append user settings
                    e.settings = setting.user;
                    //Prepare token
                    e.getIdToken(true).then((t)=> {
                        storageHelper.add(t, false).to.user_token();
                        storageHelper.add(e).to.user();
                        resolve(e)
                    })
                }).catch((error)=> {
                    err([error.message]); //Bad response
                    // ...
                });
            }).catch((error) => {
                err([error.message]);//Bad response
                // ...
            });

        }));

    }

    get logout() {
        /**
         * Logout
         */
        return new Promise((res, err)=> {
            firebase.auth().signOut().then((r)=> {
                //Clean logged data
                logHelper.info('USER LOGGED OUT');
                storageHelper.remove().user_token();
                res(r)
            }).catch(err)
        })
    }

    get authUser() {
        /**
         * Return authenticated user basic data
         * @return object|null
         */
        return new Promise((res, err)=> {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    //Append user settings
                    user.settings = setting.user;
                    // User is signed in.
                    res(user)
                } else {
                    //Error what to do?
                    //err(user)
                    // No user is signed in.
                    location.href = '#/'
                }
            });
        })

    }

    get token() {
        /**
         * Return authenticated token
         * @return string|null
         */

        return new Promise((res, err)=> {
            this.authUser.then((user)=> {
                user.getIdToken(true).then((t)=> {
                    storageHelper.add(t, false).to.user_token();
                    res(t)
                })
            }).catch((err)=> {
                err(err)
            })
        });
    }


    get isAuth() {
        /**
         * Validate auth state
         * @return boolean
         */
        return !!storageHelper.get(
            false //No parse
        ).from.user_token();
    }


}