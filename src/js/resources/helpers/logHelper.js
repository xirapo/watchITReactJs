/**
 * Created by gmena on 05-03-17.
 */
export default ({
    ok: (data)=> {
        console.log('%c' + data, 'color: green;')
    },
    log: (data)=> {
        console.log(data)
    },
    info: (data)=> {
        console.info('%c' + data, 'color: blue;')
    },
    warn: (data)=> {
        console.warn('%c' + data, 'color: orange;')

    },
    error: (data)=> {
        console.error('%c' + data, 'color: red;')
    }

})