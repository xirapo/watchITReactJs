/**
 * Created by gmena on 04-19-17.
 */
import setting from 'backend/settings';
import logHelper from 'resources/helpers/logHelper';
import Auth from 'resources/database/auth'

export default class User {

    update(data) {
        /**
         * Create a new user
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

    get(id, token) {
        /**
         * Return user details
         * @param id
         */
        return (new Promise((resolve, err) => {
            //Log
            logHelper.info('\nLOADING DATA FROM REMOTE FOR USER ID: ' + id);
            //Request to details endpoint
            axios({
                url: setting.api.user + '?id=' + id,
                method: 'get',
                timeout: setting.api.timeout,
                headers: {'Authorization': 'Bearer ' + token}
            }).then((res)=> {
                //Log
                logHelper.ok('USER DATA LOADED FROM REMOTE FOR: ' + res.data.data.fullname.toUpperCase());
                resolve(res.data.data);
            }).catch((e)=> {
                err(e.response)
            })
        }));

    }


}