/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
//import setting from 'backend/settings'
import momentjs from 'moment'
import timezone from 'moment-timezone'


let Time = ({
    factory: (timezone_ = 'US/Eastern', ...params)=> {
        return timezone(momentjs(...params))
            .tz(timezone_)
    },
    unixNowTimeZoned: (timezone_)=> {
        return Time.factory(timezone_).unix() * 1000
    }

});

export default Time;