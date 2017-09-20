/**
 * Created by gmena on 04-20-17.
 */
//Crypt helper
//import setting from 'backend/settings'
import timezone from 'moment-timezone'


let Time = ({
    factory: (timezone_ = 'US/Eastern', ...params)=> {
        return timezone(...params)
            .tz(timezone_)
    },
    dateTimeZoned: (timezone_)=> {
        return Time.factory(timezone_)
            .format()
    }
});

export default Time;