let quiet = [];
let silenced = false;

/**
* Ignore third-party console messages
*/

const silenceFilter = function (args) {
    return args.filter(v => {
        for (var idx in quiet) {
            if (typeof(v) == 'string' && v.indexOf(quiet[idx]) !== -1) {
                return false;
            }
        }
        return  true;
    });
}

const silence = function(list = [])  {
    quiet = [].concat(quiet, list);
    if (silenced) return;
    // Console message filter
    let origLog = console.log;
    let origInfo = console.info;


    console.log = function(...args) {
        let newArgs = silenceFilter(args);
        return origLog.apply(this, newArgs);
    }

    console.info = function(...args) {
        let newArgs = silenceFilter(args);
        return origInfo.apply(this, newArgs);
    }

    silenced = true;
}

silence("5min to figure out");
silence("You are running Vue in development mode");

module.exports.pluralize = require("pluralize");