const fs = require('fs');
const { cqcode } = require('@vikiboss/oicq');

const info = {
  name: '疫情查询',
  author: 'jimmma',
  version: '1.0.0',
};

const masterQQ = 请在此处填写主人qq
const robQQ = 请在此处填写机器人qq

const listener = function (data) {
  try {
    const { raw_message, reply, group_id, user_id } = data;
    const msgArr = raw_message.split(' ');
    if (raw_message.includes('疫情')) {
      const city = raw_message.replace('疫情', '');
      const axiso = require('axios');
      axiso.get('https://xiaobai.klizi.cn/API/other/yiqing.php').then(res => {
        const arr = res.data.list;
        const map = new Map();
        arr.forEach(items => {
          if (city.includes(items.城市)) {
            Object.keys(items).forEach(key => {
              if (key !== '附属城市') {
                map.set(key, items[key]);
              }
            });
            reply(`${cqcode.face(335)}查询地区：${map.get('城市')}\n${cqcode.face(335)}积累确诊：${map.get('积累确诊')}\n${cqcode.face(335)}现存确诊：${map.get('现存确诊')}\n${cqcode.face(335)}累计治愈：${map.get('治愈')}\n${cqcode.face(335)}累计死亡：${map.get('死亡')}\n${cqcode.face(335)}现存无症状：${map.get('现存无症状')}\n${cqcode.face(335)}查询时间：${getNowTime()}`);
            return;
          } else {
            if (items.附属城市) {
              items.附属城市.forEach(item => {
                if (city.includes(item.城市)) {
                  reply(`${cqcode.face(335)}查询地区：${item.城市}\n${cqcode.face(335)}积累确诊：${item.积累确诊}\n${cqcode.face(335)}现存确诊：${item.现存确诊}\n${cqcode.face(335)}累计治愈：${item.治愈}\n${cqcode.face(335)}累计死亡：${item.死亡}\n${cqcode.face(335)}现存无症状：${item.现存无症状}\n${cqcode.face(335)}查询时间：${getNowTime()}`);
                }
              });
            }
          }
        });
      });
    }
  } catch (err) {
    this.sendPrivateMsg(masterQQ, err);
  }
};

function getNowTime() {
  var date = new Date();
  //年 getFullYear()：四位数字返回年份
  var year = date.getFullYear(); //getFullYear()代替getYear()
  //月 getMonth()：0 ~ 11
  var month = date.getMonth() + 1;
  //日 getDate()：(1 ~ 31)
  var day = date.getDate();
  //时 getHours()：(0 ~ 23)
  var hour = date.getHours();
  //分 getMinutes()： (0 ~ 59)
  var minute = date.getMinutes();
  //秒 getSeconds()：(0 ~ 59)
  var second = date.getSeconds();

  var time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
  return time;
}

//小于10的拼接上0字符串
function addZero(s) {
  return s < 10 ? '0' + s : s;
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
