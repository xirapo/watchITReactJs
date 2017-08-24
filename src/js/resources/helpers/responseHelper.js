/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
import cryptHelper from './cryptHelper'

export default ({
    badResponse: (response)=> {
        /**
         * Process bad response from server
         * */
        if ('data' in response) {
            try {
                //Check if is json
                let error_list = JSON.parse(
                    response.data.status_message
                ), error = [];

                //Iterate over keys
                Object.keys(error_list).forEach((k)=> {
                    error_list[k].reduce((err, v)=> {
                        err.push(v['message']);
                        return err
                    }, error);
                });

                return error
            } catch (e) {
                return [response.data.status_message]
            }
        }
    }
})

