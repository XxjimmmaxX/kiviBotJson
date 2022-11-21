const { cqcode } = require("@vikiboss/oicq");
const https = require('https')

const info = {
    name: "微博热榜",
    author: "jimmma",
    version: "1.0.0"
};

const listener = function (data) {
    const { raw_message, reply } = data;
    if (["微博热榜"].includes(raw_message)) {
        https.get('https://api.qingyun66.cn/API/wb_hot.php', function (res) {
            var rbody = "";
            res.on("data", function (data) {
                rbody += data;
            });
            res.on("end", function () {
                const msg = "\n本功能感谢|青云API\n#BY：jimmma"
                data.reply(rbody + msg);
            });
        });
    }
};

const enable = (bot) => {
    bot.on("message", listener);
};

const disable = (bot) => {
    bot.off("message", listener);
};

module.exports = { info, enable, disable };
