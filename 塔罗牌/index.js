const https = require('https')
const http = require('http')
function getyy() {

}
async function listener(data) {
    if (data.raw_message == "塔罗牌") {
        http.get('http://api.tangdouz.com/tarot.php?return=%E6%96%87%E5%AD%97', function(res) {
            var rbody = "";
            res.on("data", function(data) {
                rbody += data;
            });
            res.on("end", function() {
                data.reply(rbody);
            });
        });
    }
};

function enable(bot) {
    bot.on("message.group", listener);
};

function disable(bot) {
    bot.off("message.group", listener);
};
const info = {
    name: "济宁疫情",
    author: "jimmma",
    version: "1.0.0"
};
module.exports = { enable, disable, info };