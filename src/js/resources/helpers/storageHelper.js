/**
 * Created by gmena on 05-03-17.
 */
//Storage manifest
import manifest from '../../backend/storage'

export default ({
    get: (data)=> {

    },
    add: (data, man = manifest)=> {
        //The manifest keys
        let _keys = Object.keys(man);

        return {
            to: _keys.reduce((b, n)=> {
                return (
                    b[manifest[n]] = ()=> {
                        //Add to storage
                        localStorage.addItem(n, JSON.stringify(
                            data
                        ))
                    }
                )
            }, {})
        }
    },
    remove: (key)=> {

    },
    flush: ()=> {
        //Flush all localstorage
        //!Warning
        localStorage.clear();
    }
})