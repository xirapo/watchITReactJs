//This file run on front...
//Set here all initial configurations

var
    os = require('os'),
    path = require('path'),
    gui = require('nw.gui'),
    fs = require('fs'),
    win = gui.Window.get(),
    ROOT_DIR = process.cwd(),
    ROOT_TMP_FOLDER = path.join(ROOT_DIR, 'tmp'), //TMP global folder
    ENVIRONMENT = 'prod'; // dev or prod


// Create the System Temp Folder.
// This is used to store temporary data like movie files.
if (!fs.existsSync(ROOT_TMP_FOLDER)) {
    fs.mkdir(ROOT_TMP_FOLDER);
}

//Remove folder after close
var wipeTmpFolder = function () {
        if (typeof ROOT_TMP_FOLDER != 'string') {
            return;
        }
        fs.readdir(ROOT_TMP_FOLDER, function (err, files) {
            for (var i in files) {
                fs.unlink(ROOT_TMP_FOLDER + '/' + files[i]);
            }
        });
    }, wipeTmpSubs = function () {
        //Remove subs after close app
        if (typeof ROOT_TMP_FOLDER != 'string') {
            return;
        }
        fs.readdir(ROOT_TMP_FOLDER, function (err, files) {
            for (var i in files) {
                if (/(.*)\.(srt|vtt)$/g.test(files[i])) {
                    fs.unlink(ROOT_TMP_FOLDER + '/' + files[i]);
                }
            }
        });
    },
    preventDefault = function (e) {
        e.preventDefault();
    };

// Wipe the tmpFolder when closing the app (this frees up disk space)
win.on('close', function () {
    //If user setting clear cache
    // if (Settings.custom.clearCache) {
    //     wipeTmpFolder();
    // }

    //Remove subs
    wipeTmpSubs();
    win.close(true);
});

// Set the app title (for Windows mostly)
win.title = 'watchIT';

//If dev.. show tools
if (ENVIRONMENT == 'dev') win.showDevTools();

// Focus the window when the app opens
win.focus();

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

// Prevent dropping files into the window
window.addEventListener("dragover", preventDefault, false);
window.addEventListener("drop", preventDefault, false);
// Prevent dragging files outside the window
window.addEventListener("dragstart", preventDefault, false);

//Prevent default reload, devtools
document.addEventListener('keydown', function (e) {

    var keyCode = (e.which || e.keyCode);
    // not reload
    // not console

    //Reload
    if (keyCode == 116 && ENVIRONMENT === 'dev') {
        location.reload();
    } else if (keyCode == 116) {
        e.preventDefault()
    }

    if (keyCode == 122) {
        e.preventDefault()
    }

    if (keyCode == 123) {
        e.preventDefault()
    }
});

//videoJS conf
//Not help improve
//To add prototype functions
Function.prototype.add = function (name, fn) {
    this.prototype[name.trim()] = fn;
};
//videojs.options.flash.swf = "../vendor/video_js/dist/video-js.swf";

//console.log(win);