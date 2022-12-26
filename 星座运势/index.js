const info = {
    name: "星座运势",
    author: "jimmma",
    version: "1.0.0"
};
const https = require('https')
const { cqcode } = require("@vikiboss/oicq")
const path = require("path")
const fs = require("fs")
var api = "https://xiaoapi.cn/API/xzys_pic.php?msg="
const star = [
    "白羊座",
    "金牛座",
    "双子座",
    "巨蟹座",
    "狮子座",
    "处女座",
    "天秤座",
    "天蝎座",
    "射手座",
    "摩羯座",
    "水瓶座",
    "双鱼座"
]

function middle(textMain, keyA, keyB) { var str = textMain; var aPos = str.indexOf(keyA); var bPos = str.indexOf(keyB, aPos + keyA.length); var retstr = str.substr(aPos + keyA.length, textMain.length - (aPos + keyA.length) - (textMain.length - bPos)); return retstr; }

function main(data) {
    if (data.raw_message.indexOf("星座运势") !== -1) {
        key = middle(data.raw_message + "||", "星座运势", "||")
        https.get(api + key, function (res) {
            var rbody = ""
            res.on("data", b)
            res.on("end", a)
            function b(data) {
                rbody += data
            }
            function a() {
                if (key == "") {
                    data.reply("可用参数:白羊座 、 金牛座 、 双子座 、 巨蟹座 、 狮子座 、 处女座 、 天秤座 、 天蝎座 、 射手座 、 摩羯座 、 水瓶座 、 双鱼座")
                }

                else if (star.indexOf(key) != -1) {
                    const imgMsg = cqcode.image(api + key, false)
                    data.reply(imgMsg)
                }

                else if (star.indexOf(key) == -1){
                    data.reply("未找到这个星座,请输入 星座运势 检查可用参数")
                }
                else{
                    return;
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