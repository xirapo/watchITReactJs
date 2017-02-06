/**
 * Created by gmena on 04-22-16.
 */

/**
 * Created by gmena on 12-12-15.
 */


(function (window) {
    var setting = require(path.resolve() + '/js/backend/settings');

    function FaceBook() {
    }

    /**

     * */
    FaceBook.add('init', function (data) {
        FB.init({
            appId: setting.fb.app_id,
            version: setting.fb.version,
            xfbml: true,
            status: true,
            cookie: true,
            oauth: true
        });
    });

    /**

     * */
    FaceBook.add('checkLoginStatus', function (cb) {
        FB.getLoginStatus(function (response) {
            cb(response);
        });
    });

    /**

     * */
    FaceBook.add('requestLogin', function () {
        return new Promise(function (s, e) {
            FB.getLoginStatus(function (response) {
                console.log(response);
            });
        })
    });

    FaceBook.add('fbLoginPopup', function () {
        var oauth_url = 'https://www.facebook.com/dialog/oauth/';
        oauth_url += '?client_id=' + setting.fb.app_id + '';
        //oauth_url += '&redirect_uri=' + encodeURIComponent('https://apps.facebook.com/' + setting.fb.namespace + '/');
        oauth_url += '&scope=email';
        window.top.location = oauth_url;
    });


    window.FaceBook = new FaceBook;
    window.FaceBook = FaceBook;

})(window);
