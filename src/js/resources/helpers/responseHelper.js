/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
//import cryptHelper from './cryptHelper'

export default ({
    snapshotToArray: (snapshot)=> {
        /**
         * Process firebase snapshot response
         * */
        let returnArr = [];

        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            debugger;
            returnArr.push(Object.keys(item).reduce((old, v)=> {
                return item[v]
            }), {});
        });

        return returnArr;
    }
})

