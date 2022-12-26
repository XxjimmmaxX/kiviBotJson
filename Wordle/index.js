//var __importDefault = (this && this.__importDefault) || function (mod) {
//    return (mod && mod.__esModule) ? mod : { "default": mod };
//}
//const words_1 = __importDefault(require("./words.json"));
const libmsg = require("./libmsg.js");
//const oim = require("@vikiboss/oim");
//const { cqcode } = require("@vikiboss/oicq");
//const path = require('path');

const info = {
    name: 'Wordle',
    author: 'jimmma',
    version: '1.0.0',
    describe: 'WORDLE填词游戏',
    tip: 'wordle填词游戏'
};

const listener = function(data){
    libmsg.handler_onmsg(data);
}

// 定义 enable 函数
const enable = bot => {
    bot.on('message', listener);
  };
  
  // 定义 disable 函数
  const disable = bot => {
    bot.off('message', listener);
  };
  
  module.exports = { info, enable, disable };