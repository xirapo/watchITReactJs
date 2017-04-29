/**
 * Handle user settings
 * **/

/////////////////////
//Users Settings//
/////////////////////
module.exports = {
    storage: {
        movies: localStorage.getItem('clean_storage'),
        subs: true//localStorage.getItem('clean_subs') ? true : false
    }
};

