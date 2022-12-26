//libtext2ui.js

(function () {
    //try to find canvas
    if (typeof canvas != "object") {
        if (typeof canvas == "undefined") {
            var canvas;
        }
        let canvas_1 = canvas;
        if (typeof window == "object") {
            canvas_1 = window.canvas;
        }
        if (typeof canvas_1 != "object" && typeof global == "object") {
            canvas_1 = global.canvas;
        }
        if (typeof require == "function") {
            canvas_1 = require("canvas");
        }
        if (typeof canvas_1 != "object") {
            console.warn("warn: cannot access canvas. falling back to ly65_api mode. libtext2ui@L20");
            throw "error: no fallback allowed. libtext2ui@L21";
        }
        canvas = canvas_1;
    }


    var text2ui = {};
    text2ui.get_raw_image = function (gwid, ghei, datl, datl2) {
        if (arguments.length < 4) {
            datl2 = "";
        }
        if (arguments.length < 3) {
            datl = "";
        }
        if (arguments.length < 2) {
            ghei = 0;
        }
        if (arguments.length < 1) {
            gwid = 1;
        }

        //settings
        var grid_size = 50;
        var margin = 13;
        var border_size = 2;
        //custom font file
        canvas.registerFont(__dirname + "/" + "font_msyh.ttc", { "family": "Custom_Font", "weight": "normal", "style": "normal" });
        var font_size = 32;
        var font_file = "Custom_Font";


        var font = font_size + "px " + font_file;
        gwid = parseInt(gwid, 10);
        ghei = parseInt(ghei, 10);
        datl = String(datl);
        datl2 = String(datl2);
        if (isNaN(gwid)) {
            gwid = 0;
        }
        if (isNaN(ghei)) {
            ghei = 0;
        }
        var width = gwid * grid_size + (gwid + 1) * margin;
        var height = ghei * grid_size + (ghei + 1) * margin;
        if (width * height * 24 > 50 * 1024 * 1024) {
            console.error("error_memory_overflow. libtext2ui@L66");
            return "error_memory_overflow";
        }
        try {
            var img_obj = canvas.createCanvas(width, height);
        } catch {
            console.error("error_cannot_create_image. libtext2ui@L72");
            return "error_cannot_create_image";
        }
        if (typeof img_obj != "object") {
            console.error("error_cannot_create_image. libtext2ui@L76");
            return "error_cannot_create_image";
        }
        try {
            var img = img_obj.getContext("2d");
        } catch {
            console.error("error_cannot_get_context. libtext2ui@L82");
            return "error_cannot_get_context";
        }
        if (typeof img != "object") {
            console.error("error_cannot_get_context. libtext2ui@L86");
            return "error_cannot_get_context";
        }
        datl = datl.padEnd(gwid * ghei, " ");
        datl = datl.substr(0, gwid * ghei);
        datl2 = datl2.padEnd(gwid * ghei, "0");
        datl2 = datl2.substr(0, gwid * ghei);

        //set palette
        var white = "rgb(" + 0xff + "," + 0xff + "," + 0xff + ")";
        var cream = "rgb(" + 0xff + "," + 0xfb + "," + 0xf1 + ")";
        var yellow = "rgb(" + 0xc6 + "," + 0xb6 + "," + 0x6d + ")";
        var green = "rgb(" + 0x86 + "," + 0xa3 + "," + 0x73 + ")";
        var gray = "rgb(" + 0x7b + "," + 0x7b + "," + 0x7b + ")";
        var dark_gray = "rgb(" + 0x50 + "," + 0x50 + "," + 0x50 + ")";
        var red = "rgb(" + 0xff + "," + 0x00 + "," + 0x00 + ")";
        var black = "rgb(" + 0x20 + "," + 0x20 + "," + 0x20 + ")";

        img.font = font;

        //draw image
        img.fillStyle = cream;
        img.strokeStyle = cream;
        img.fillRect(0, 0, width, height);

        //draw block
        for (var curr_wid = 1; curr_wid <= gwid; curr_wid++) {
            for (var curr_hei = 1; curr_hei <= ghei; curr_hei++) {
                //pre-definitions
                var anch_left_top_x = margin + (grid_size + margin) * (curr_wid - 1);
                var anch_left_top_y = margin + (grid_size + margin) * (curr_hei - 1);
                var anch_right_top_x = anch_left_top_x + grid_size;
                var anch_right_top_y = anch_left_top_y;
                var anch_left_bottom_x = anch_left_top_x;
                var anch_left_bottom_y = anch_left_top_y + grid_size;
                var anch_right_bottom_x = anch_right_top_x;
                var anch_right_bottom_y = anch_left_bottom_y;
                var anch_middle_x = anch_left_top_x + grid_size / 2;
                var anch_middle_y = anch_left_top_y + grid_size / 2;

                //draw background
                var cl = datl2.substr(gwid * (curr_hei - 1) + curr_wid - 1, 1);
                if (cl == "0") {
                    cl = cream;
                } else if (cl == "1") {
                    cl = gray;
                } else if (cl == "2") {
                    cl = yellow;
                } else if (cl == "3") {
                    cl = green;
                } else {
                    cl = red;
                }
                img.fillStyle = cl;
                img.strokeStyle = cl;
                img.fillRect(Math.round(anch_left_top_x), Math.round(anch_left_top_y), Math.round(anch_right_bottom_x - anch_left_top_x), Math.round(anch_right_bottom_y - anch_left_top_y));

                //draw border
                img.fillStyle = dark_gray;
                img.strokeStyle = dark_gray;
                img.fillRect(Math.round(anch_left_top_x - border_size / 2), Math.round(anch_left_top_y - border_size / 2), Math.round(anch_right_top_x - anch_left_top_x + border_size), Math.round(border_size)); //up
                img.fillRect(Math.round(anch_left_bottom_x - border_size / 2), Math.round(anch_left_bottom_y - border_size / 2), Math.round(anch_right_top_x - anch_left_top_x + border_size), Math.round(border_size)); //down
                img.fillRect(Math.round(anch_left_top_x - border_size / 2), Math.round(anch_left_top_y - border_size / 2), Math.round(border_size), Math.round(anch_left_bottom_y - anch_left_top_y + border_size)); //left
                img.fillRect(Math.round(anch_right_top_x - border_size / 2), Math.round(anch_right_top_y - border_size / 2), Math.round(border_size), Math.round(anch_left_bottom_y - anch_left_top_y + border_size)); //right

                //draw text
                img.fillStyle = dark_gray;
                img.strokeStyle = dark_gray;
                var chara = datl.substr(gwid * (curr_hei - 1) + curr_wid - 1, 1);
                img.fillStyle = white;
                img.strokeStyle = white;
                img.textAlign = "center";
                img.textBaseline = "middle";
                img.fillText(chara, anch_middle_x, anch_middle_y);
                img.fillText(chara, anch_middle_x + 1, anch_middle_y);
                img.fillText(chara, anch_middle_x, anch_middle_y + 1);
                img.fillText(chara, anch_middle_x - 1, anch_middle_y);
                img.fillText(chara, anch_middle_x, anch_middle_y - 1);
            }
        }

        //save and return
        img_obj = img_obj.toBuffer("image/jpeg", { quality: 1, progressive: false, chromaSubsampling: false });
        return img_obj;
    };


    if (typeof window === "object") {
        //web browser
        window.text2ui = text2ui;
    } else if (typeof global === "object") {
        //nodejs
        module.exports = text2ui;
    }
})();