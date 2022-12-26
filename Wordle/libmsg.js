//libmsg.js

(function () {

    //import fileio
    if (typeof fileio != "object") {
        if (typeof fileio == "undefined") {
            var fileio;
        }
        let fileio_1 = fileio;
        if (typeof require == "function") {
            fileio_1 = require("./libfileio.js");
        }
        if (typeof fileio_1 != "object") {
            console.error("error: cannot access or require fileio. libmsg@L15");
            throw "error: cannot access or require fileio. libmsg@L16";
        }
        fileio = fileio_1;
    }

    //import libwordle
    if (typeof libwordle != "object") {
        if (typeof libwordle == "undefined") {
            var libwordle;
        }
        let libwordle_1 = libwordle;
        if (typeof require == "function") {
            libwordle_1 = require("./libwordle.js");
        }
        if (typeof libwordle_1 != "object") {
            console.error("error: cannot access or require libwordle. libmsg@L31");
            throw "error: cannot access or require libwordle. libmsg@L32";
        }
        libwordle = libwordle_1;
    }

    //import text2ui
    if (typeof text2ui != "object") {
        if (typeof text2ui == "undefined") {
            var text2ui;
        }
        let text2ui_1 = text2ui;
        if (typeof require == "function") {
            text2ui_1 = require("./libtext2ui.js");
        }
        if (typeof text2ui_1 != "object") {
            console.error("error: cannot access or require text2ui. libmsg@L47");
            throw "error: cannot access or require text2ui. libmsg@L48";
        }
        text2ui = text2ui_1;
    }

    //import oicq
    if (typeof oicq != "object") {
        if (typeof oicq == "undefined") {
            var oicq;
        }
        let oicq_1 = oicq;
        if (typeof require == "function") {
            oicq_1 = require("@vikiboss/oicq");
        }
        if (typeof oicq_1 != "object") {
            console.error("error: cannot access or require oicq. libmsg@L63");
            throw "error: cannot access or require oicq. libmsg@L64";
        }
        oicq = oicq_1;
    }

    //import Buffer
    if (typeof Buffer != "object") {
        if (typeof Buffer == "undefined") {
            var Buffer;
        }
        let Buffer_1 = Buffer;
        if (typeof require == "function") {
            Buffer_1 = require("buffer").Buffer;
        }
        if (typeof Buffer_1 != "function") {
            console.error("error: cannot access or require Buffer. libmsg@L79");
            throw "error: cannot access or require Buffer. libmsg@L80";
        }
        Buffer = Buffer_1;
    }

    var libmsg = {};

    var wordle = function (inp) {
        inp = inp.replaceAll("\r", "");
        inp = inp.replaceAll("\n", "");
        inp = inp.replaceAll("\t", "");
        inp = inp.replaceAll(" ", "");
        if (inp.startsWith("/") || inp.startsWith("-")) {
            //command handler
            if (inp.startsWith("/start") || inp.startsWith("-start")) {
                inp = inp.substr(6);
                if (inp.replace(new RegExp("[0-9]+"), "").length > 0) {
                    return "error parsing argument list. libmsg@L97";
                    inp = 0;
                }
                inp = Number(inp);
                if (isNaN(inp)) {
                    return "error parsing argument list. libmsg@L102";
                }
                return libwordle.start(inp);
            } else if (inp.startsWith("/reset") || inp.startsWith("-reset")) {
                return libwordle.reset();
            } else {
                return "error unknown command. libmsg@L108";
            }
        } else {
            //guess handler
            return libwordle.guess(inp);
        }
    };

    var wordle_text2ui = function (inp) {
        inp = inp.replaceAll("\r", "");
        inp = inp.replaceAll("\n", "");
        inp = inp.replaceAll("\t", "");
        var olen = 0;
        while (olen != inp.length) {
            olen = inp.length;
            inp = inp.replaceAll("  ", " ");
            if (inp.substr(0, 1) == " ") {
                inp = inp.substr(1);
            }
            if (inp.substr(inp.length - 1) == " ") {
                inp = inp.substr(0, inp.length - 1);
            }
        }
        inp = inp.split(" ", 4);
        inp = text2ui.get_raw_image(...inp);
        if (inp.slice(0, 5).compare(Buffer.from("error")) == 0) {
            return [false, inp.toString("utf-8")];
        }
        return [true, inp];
    };



    libmsg.handler_onmsg = function (jo) {
        // 白名单
        // if (jo["group_id"] !== group_id) {
        //     return;
        // }

        //合并连续的text块
        if (!(jo["message"] instanceof Array)) {
            return; //internal error
        }
        for (var a = 1; a < jo["message"].length; a++) {
            if (jo["message"][a - 1]["type"] == "text" && jo["message"][a]["type"] == "text") {
                jo["message"][a - 1]["data"]["text"] += jo["message"].splice(a, 1)[0]["data"]["text"];
                a--;
            }
        }

        for (var index = 0; index < jo["message"].length; index++) {
            var cdata = jo["message"][index];

            //libwordle fix
            libwordle.wordlist = __dirname + "/" + "wordlist.json";
            libwordle.savepath = __dirname + "/" + "save_";
            if (jo["message_type"] == "group") {
                libwordle.savepath += jo["group_id"];
            } else if (jo["post_type"] == "message" && jo["message_type"] == "private" && jo["sub_type"] == "friend") {
                libwordle.savepath += jo["user_id"];
            } else if (jo["post_type"] == "message_sent" && jo["message_type"] == "private" && jo["sub_type"] == "friend") {
                libwordle.savepath += jo["target_id"];
            }
            libwordle.savepath += ".txt";


            //message handler

            if (cdata["type"] == "text" && cdata["data"]["text"].startsWith("#text2ui")) {
                var res = wordle_text2ui(cdata["data"]["text"].substr(8));
                if (res instanceof Array && res[0] == true) {
                    jo.reply(oicq.cqcode.image("base64://" + res[1].toString("base64")), false);
                } else if (res instanceof Array && res[0] == false) {
                    jo.reply(res[1]);
                } else {
                    jo.reply("unexpected handler error at libmsg#text2ui");
                }
                break;
            }

            if (cdata["type"] == "text" && (cdata["data"]["text"].startsWith("#wordle") || cdata["data"]["text"].startsWith("#wd")/*||(fileio.is_readable(libwordle.savepath)&&cdata["data"]["text"].replaceAll("\r","").replaceAll("\n","").replaceAll("\t","").replaceAll(" ","").replace(new RegExp("[a-zA-Z]+"),"").length<=0&&cdata["data"]["text"].replaceAll("\r","").replaceAll("\n","").replaceAll("\t","").replaceAll(" ","").length==fileio.file_get_contents(libwordle.savepath).split("|",2)[0].length)*/)) {
                var res = cdata["data"]["text"];
                if (cdata["data"]["text"].startsWith("#wordle")) {
                    res = res.substr(7);
                } else if (cdata["data"]["text"].startsWith("#wd")) {
                    res = res.substr(3);
                }
                res = wordle(res);
                if (res instanceof Array && res[0] == true) {
                    jo.reply(oicq.cqcode.image("base64://" + res[1].toString("base64")), false);
                } else if (res instanceof Array && res[0] == false) {
                    jo.reply(res[1]);
                } else if (typeof res == "string") {
                    jo.reply(res);
                } else {
                    jo.reply("unexpected handler error at libmsg#wordle");
                }
                break;
            }

            //end of foreach loop
        }
        //end of function onmsg
    };


    if (typeof window === "object") {
        //web browser
        window.libmsg = libmsg;
    } else if (typeof global === "object") {
        //nodejs
        module.exports = libmsg;
    }
})();
