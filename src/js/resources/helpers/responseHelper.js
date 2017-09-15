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

        //Process snapshot
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            //Unpack message
            let unpackItem = Object.keys(item).reduce((old, v)=> {
                return item[v]
            }, {});
            //Push unpacked message
            returnArr.push(unpackItem);
        });

        //Return new packed items
        return returnArr;
    }
})

