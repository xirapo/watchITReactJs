//This file run on front...
//Set here all initial configurations

//Global vars
var
    os = require('os'),
    path = require('path'),

    fs = require('fs'),
    fs_extra = require('fs-extra'),
    win = nw.Window.get(),
    user_settings = require(path.resolve() + '/src/js/backend/user'),

    ROOT_DIR = process.cwd(), //DEFAULT ROOT DIR
    ROOT_TMP_FOLDER = path.join(ROOT_DIR, 'tmp'), //TMP global folder
    ENVIRONMENT = 'dev'; // dev or prod environment

//FUNCTIONS
var
    cleanFormCache = function () {
        //Clean old cache
        window.chrome.browsingData.remove({
            since: 0
        }, {passwords: true, formData: true});
    },
    loopFileDir = function (dir, cb) {
        fs.readdir(dir, function (err, files) {
            for (var i in files) {
                cb(files[i])
            }
        });
    },
    wipeTmpFolder = function () {
        //Recursive remove
        loopFileDir(ROOT_TMP_FOLDER + '/', function (file) {
            if (fs.existsSync(ROOT_TMP_FOLDER + '/' + file)) {
                if (fs.lstatSync(ROOT_TMP_FOLDER + '/' + file).isDirectory()) {
                    fs_extra.removeSync(ROOT_TMP_FOLDER + '/' + file)
                }
            }
        });

    }, wipeTmpSubs = function () {
        //Loop over files in dir
        loopFileDir(ROOT_TMP_FOLDER + '/', function (file) {
            //Exists?
            if (fs.existsSync(ROOT_TMP_FOLDER + '/' + file)) {
                if (fs.lstatSync(ROOT_TMP_FOLDER + '/' + file).isFile()) {
                    if (/(srt|vtt|zip)$/g.test(file)) {
                        fs.unlink(ROOT_TMP_FOLDER + '/' + file);
                    }
                }
            }
        })
    },
    preventDefault = function (e) {
        //Prevent default events
        e.preventDefault();
    };

//INITIAL SETTINGS
// Create the System Temp Folder.
// This is used to store temporary data like movie files.
if (!fs.existsSync(ROOT_TMP_FOLDER)) {
    fs.mkdir(ROOT_TMP_FOLDER);
}

// Set the app title (for Windows mostly)
win.title = 'watchIT';
// Focus the window when the app opens
win.focus();
//If dev.. show tools
if (ENVIRONMENT == 'dev')
    win.showDevTools();

//Clean old cache
cleanFormCache();

//EVENTS
// Wipe the tmpFolder when closing the app (this frees up disk space)
win.on('close', function () {
    //If user setting clear cache
    if (user_settings.clean.movies) {
        //Remove movies
        wipeTmpFolder();
    }

    //If user setting clear cache
    if (user_settings.clean.subs) {
        //Remove subs
        wipeTmpSubs();
    }

    //Close window
    win.close(true)

});

// Cancel all new windows (Middle clicks / New Tab)
win.on('new-win-policy', function (frame, url, policy) {
    policy.ignore();
});
//Show windows on loaded
win.on('loaded', function (frame, url, policy) {
    win.show()
});

//win.on('close', function () {
//	localStorage.removeItem('token');
//});
//

//LISTENERS
// Prevent dropping files into the window
window.addEventListener("dragover", preventDefault, false);
window.addEventListener("drop", preventDefault, false);
// Prevent dragging files outside the window
window.addEventListener("dragstart", preventDefault, false);
//Avoid right click
document.addEventListener('contextmenu', preventDefault, false);

//Prevent default reload, devtools
document.addEventListener('keydown', function (e) {
    var keyCode = (e.which || e.keyCode);
    // not reload
    // not console
    //Reload
    if (keyCode == 116 && ENVIRONMENT === 'dev') {
        location.reload();
    } else if (keyCode == 116) {
        //Not reload
        e.preventDefault()
    }

    if (keyCode == 122 || keyCode == 123) {
        //Not open console
        e.preventDefault()
    }
});

//OVERRIDE
//To add prototype functions
Function.prototype.add = function (name, fn) {
    this.prototype[name.trim()] = fn;
};
