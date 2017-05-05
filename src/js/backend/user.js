/**
 * Handle user settings
 * **/

/////////////////////
//Users Settings//
/////////////////////
module.exports = {
    storage: {
        movies: localStorage.getItem('clean_storage_movies'),
        subs: true//localStorage.getItem('clean_storeage_subs') ? true : false
    }
};

