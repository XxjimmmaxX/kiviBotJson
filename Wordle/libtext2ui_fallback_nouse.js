//libtext2ui_fallback.js

(function () {
    //try to find http
    if (typeof http != "object") {
        if (typeof http == "undefined") {
            var http;
        }
        let http_1 = http;
        if (typeof window == "object") {
            http_1 = window.http;
        }
        if (typeof http_1 != "object" && typeof global == "object") {
            http_1 = global.http;
        }
        if (typeof require == "function") {
            http_1 = require("http");
        }
        if (typeof http_1 != "object") {
            console.warn("warn: cannot access http. libtext2ui_fallback@L20");
        }
        http = http_1;
    }

    var text2ui = {};

    var http_get = function (url, callback) {
        if (arguments.length < 2 || typeof callback != "function") {
            callback = new Function();
        }
        try {
            url = new URL(url);
        } catch {
            console.error("failed to parse url. libtext2ui_fallback@31");
        }
        var data = [];
        var options = { "protocol": url.protocol, "hostname": url.hostname, "port": url.port, "path": url.pathname + url.search, "method": "GET", "headers": {} };
        var req = http.request(options, function (res) {
            if (req.destroyed) {
                return;
            }
            res.on("data", function (chunk) {
                data.push(chunk);
            });
            res.on("end", function () {
                data = Buffer.concat(data);
                callback(data);
            });
        });
        req.on("error", function (e) {
            console.error("request failed with message [" + e.message + "]. the full error data is printed below. libtext2ui_fallback@51");
            console.error(e);
            callback(false);
        });
        req.end();
        return req;
    };

    text2ui.get_raw_image = function (gwid, ghei, datl, datl2, callback) {
        if (arguments.length < 5 || typeof callback != "function") {
            callback = new Function();
        }
        http_get("http://ly65.tk:2252/api_libtext2ui.php?gwid=" + gwid + "&ghei=" + ghei + "&datl=" + datl + "&datl2=" + datl2, callback);
    };


    if (typeof window === "object") {
        //web browser
        window.text2ui_fb = text2ui;
    } else if (typeof global === "object") {
        //nodejs
        module.exports = text2ui;
    }
})();