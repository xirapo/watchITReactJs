/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
//import setting from 'backend/settings'
import momentjs from 'moment'
import timezone from 'moment-timezone'


export default ({
    unixNowTimeZoned: (timezone_)=> {
        //Initialize timezone
        //timezone.tz.add(setting.appendTimeZones);
        //Make local timezone
        return momentjs().unix();
        // TODO work on timezone
        // return timezone(momentjs())
        //     .tz(timezone_).unix()
    },

})

