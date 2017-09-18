/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
//import setting from 'backend/settings'
import Oy from 'oy-vey';

export default ({
    sendEmail: (module, data)=> {
        const template = Oy.renderTemplate(<module />, data);
    }
})

