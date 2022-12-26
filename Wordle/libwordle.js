//libwordle.js

(function () {
    var wordle = {};

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
            console.error("error: cannot access or require fileio. libwordle@L16");
            throw "error: cannot access or require fileio. libwordle@L17";
        }
        fileio = fileio_1;
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
            console.error("error: cannot access or require text2ui. libwordle@L32");
            throw "error: cannot access or require text2ui. libwordle@L33";
        }
        text2ui = text2ui_1;
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
            console.error("error: cannot access or require Buffer. libwordle@L48");
            throw "error: cannot access or require Buffer. libwordle@L49";
        }
        Buffer = Buffer_1;
    }

    //settings
    wordle.wordlist = "./wordlist.json";
    wordle.savepath = "./save.txt";
    wordle.guess_result = [];

    wordle.calc_color = function (ans, guess) {
        ans = ans.toLowerCase();
        guess = guess.toLowerCase();
        var out = "1".repeat(guess.length);
        out = out.padEnd(ans.length, "0");
        out = out.split("");
        ans = ans.split("");
        guess = guess.split("");
        var wl = {};
        for (var i = 0; i < ans.length; i++) {
            if (!(ans[i] in wl)) {
                wl[ans[i]] = 0;
            }
            wl[ans[i]] += 1;
        }
        for (var i = 0; i < guess.length; i++) {
            if (guess[i] === ans[i]) {
                out[i] = "3";
                wl[ans[i]] -= 1;
                guess[i] = " ";
            }
        }
        for (var i = 0; i < guess.length; i++) {
            if (wl[guess[i]] > 0) {
                out[i] = "2";
                wl[guess[i]] -= 1;
            }
        }
        return out.join("");
    };

    wordle.start = function (len) {
        if (arguments.length < 1) {
            len = 0;
        }
        var out = "wordle初始化完成 ";
        var wl = wordle.wordlist;
        var sl = wordle.savepath;
        if (!fileio.is_readable(wl)) {
            return "internal error. libwordle@L98";
        }
        wl = fileio.file_get_contents(wl);
        try {
            wl = JSON.parse(wl);
        } catch {
            return "internal error. libwordle@L104";
        }
        var w = wl;
        if (len > 0) {
            for (var i = 0; i < w.length; i++) {
                if (w[i].length !== len) {
                    w.splice(i, 1);
                    i--;
                }
            }
        }
        if (w.length <= 0 || len < 0) {
            out = "[warn] 传入的单词长度不合适，已使用默认参数\r\n" + out;
            w = wl;
        }
        w = w[Math.round(Math.random() * (w.length - 1))];
        fileio.file_put_contents(sl, w);
        return out + " 单词长度为 " + w.length;
    };

    wordle.reset = function () {
        var sl = wordle.savepath;
        if (fileio.is_readable(sl)) {
            fileio.file_put_contents(sl, "");
            fileio.unlink(sl);
        }
        return "wordle存档已删除";
    };

    wordle.guess = function (word) {
        word = word.toLowerCase();
        var sl = wordle.savepath;
        if (!fileio.is_readable(sl)) {
            return [false, "请先调用start()初始化(输入#wd -start或者#wd /start)"];
        }
        sav = fileio.file_get_contents(sl);
        if (sav.length <= 2) {
            return [false, "error_progress_file_invalid libwordle@L141"];
        }
        sav = sav.split("|");
        var right_ans = sav[0];
        word = word.padEnd(right_ans.length, " ");
        word = word.substr(0, right_ans.length);
        if (word == right_ans) {
            wordle.reset();
            return [false, "恭喜你在第" + (sav.length - 1 + 1) + "次猜出了单词[" + right_ans + "]"];
        }
        sav.push(word);
        for (var a = 1; a < sav.length - 1; a++) {
            if (sav[a] == word) {
                sav.splice(a, 1);
            }
        }
        var gwid = right_ans.length;
        var ghei = gwid + 1;
        var datl = sav.slice(1);
        var datl2 = "";
        if (datl.length >= gwid + 1) {
            //fail
            wordle.reset();
            return [false, "非常遗憾，没有人猜出来呢，本次单词为[" + right_ans + "]"];
        }
        while (datl.length > ghei) {
            datl.shift();
        }
        for (var a = 0; a < datl.length; a++) {
            datl2 += wordle.calc_color(right_ans, datl[a]);
        }
        datl = datl.join("");
        var out = text2ui.get_raw_image(gwid, ghei, datl.toUpperCase(), datl2);
        if (out.slice(0, 5).compare(Buffer.from("error")) == 0) {
            return [false, out];
        }
        sav = sav.join("|");
        fileio.file_put_contents(sl, sav);
        return [true, out];
    };



    if (typeof window === "object") {
        //web browser
        window.wordle = wordle;
    } else if (typeof global === "object") {
        //nodejs
        module.exports = wordle;
    }
})();