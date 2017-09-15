/**
 * Created by gmena on 09-11-17.
 */
import * as firebase from 'firebase'

let config = config = {
    apiKey: "AIzaSyBlnT4nbU31M9FhTMzD9cp9s9jN2Rkdtw4",
    authDomain: "witth-709ff.firebaseapp.com",
    databaseURL: "https://witth-709ff.firebaseio.com",
    projectId: "witth-709ff",
    storageBucket: "witth-709ff.appspot.com",
    messagingSenderId: "645838027322"
};
//Initialize
firebase.initializeApp(config);
export default firebase;