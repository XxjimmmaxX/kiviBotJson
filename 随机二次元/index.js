const { cqcode } = require("@vikiboss/oicq");

const info = {
  name: "二次元随机图片",
  author: "jimmma",
  version: "1.0.0"
};

const listener = function (data) {
  const { raw_message, reply } = data;
  if (["二次元","老婆"].includes(raw_message)) 
{
    const imgMsg = cqcode.image("https://www.uxr.cc/api/dm/acgurl.php?return=img",false);
    reply(imgMsg);
  }
};

const enable = (bot) => {
  bot.on("message", listener);
};
const disable = (bot) => {
  bot.off("message", listener);
};
module.exports = { info, enable, disable };