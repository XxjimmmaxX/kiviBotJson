const info = {
    name: "QQ会员音乐白嫖",
    author: "jimmma",
    version: "1.0.0"
};
const https = require('https')

const path = require("path")
const fs = require("fs")
var api = "https://xiaoapi.cn/API/yy_sq.php?msg="

function middle(textMain, keyA, keyB) { var str = textMain; var aPos = str.indexOf(keyA); var bPos = str.indexOf(keyB, aPos + keyA.length); var retstr = str.substr(aPos + keyA.length, textMain.length - (aPos + keyA.length) - (textMain.length - bPos)); return retstr; }

function main(data) {
    if (data.raw_message.indexOf("#音乐白嫖") !== -1) {
        key = middle(data.raw_message + "||", "#音乐白嫖", "||")
        keyNext = key + "&type=json&n=1"
        https.get(api + keyNext, function(res) {
            var rbody = ""
            res.on("data", b)
            res.on("end", a)

            function b(data) {
                rbody += data
            }

            function a() {
                body = JSON.parse(rbody)
                stt = body.code
                cover = body.cover
                bname = body.name
                singer = body.singer
                qual = body.quality
                theUrl = body.url

                b = body
                if (stt == 200) {
                    data.reply("已找到<<" + bname + ">>," + "歌手是" + singer + "\r\n" + " 白嫖地址为:" + "\r\n" + theUrl + "\r\n" + "音乐质量:" + qual + "\r\n" + "电脑版点击即可下载无损音乐🎶")
                } else {
                    data.reply("你要找的" + key + "暂时无法找到,请检查输入是否正确!~")
                }
                res.off("data", a)
                res.off("end", a)
            }


        })
    }

}




function enable(bot) { bot.on("message.group", main) }

function disable(bot) { bot.off("message.group", main) }

module.exports = { enable, disable, info };
module.exports = { enable, disable, info };