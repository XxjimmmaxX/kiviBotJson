//libfileio.js

(function () {
    //try to find fs
    if (typeof fs != "object") {
        if (typeof fs == "undefined") {
            var fs;
        }
        let fs_1 = fs;
        if (typeof window == "object") {
            fs_1 = window.fs;
        }
        if (typeof fs_1 != "object" && typeof global == "object") {
            fs_1 = global.fs;
        }
        if (typeof require == "function") {
            fs_1 = require("fs");
        }
        if (typeof fs_1 != "object") {
            console.error("error: cannot access fs. check if it's in a node environment. libfileio@L20");
            throw "error: cannot access fs. check if it's in a node environment. libfileio@L21";
        }
        fs = fs_1;
    }

    var fileio = {};

    fileio.is_readable = function (path) {
        try {
            fs.accessSync(path, fs.constants.R_OK);
            return true;
        } catch {
            return false;
        }
    };

    fileio.file_put_contents = function (path, data) {
        try {
            fs.writeFileSync(path, data, { "encoding": "utf-8", "mode": 0o777, "flag": "w" });
            return data.length;
        } catch {
            console.warn("warn: cannot write file " + path + ". libfileio@L42");
            return false;
        }
    };

    fileio.file_get_contents = function (path) {
        try {
            var res = fs.readFileSync(path, { "encoding": "utf-8", "flag": "r" });
            return res;
        } catch {
            console.warn("warn: cannot read file " + path + ". libfileio@L52");
            return false;
        }
    };

    fileio.unlink = function (path) {
        try {
            fs.unlinkSync(path);
            try {
                fs.accessSync(path, fs.constants.R_OK);
            } catch {
                return true;
            }
            console.warn("warn: file " + path + " not removed. libfileio@L65");
            return false;
        } catch {
            console.warn("warn: cannot unlink file " + path + ". libfileio@L68");
            return false;
        }
    };

    if (typeof window === "object") {
        //web browser
        window.fileio = fileio;
    } else if (typeof global === "object") {
        //nodejs
        module.exports = fileio;
    }
})();