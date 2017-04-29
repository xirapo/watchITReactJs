/**
 * Handle user settings
 * **/

/////////////////////
//Users Settings//
/////////////////////
window.userSettings = {
    storage: {
        movies: localStorage.getItem('clean_storage'),
        subs: true//localStorage.getItem('clean_subs') ? true : false
    }
};

