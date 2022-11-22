const oim = require('@vikiboss/oim')
const { cqcode } = require('@vikiboss/oicq')
// 以下为随机生成的对象数组
Height_data = [
  '155',
  '157',
  '160',
  '158',
  '162',
  '180',
  '170',
  '163',
  '165',
  '182',
  '171',
  '172',
  '173',
  '174',
  '164'
]

Hair_data = [
  '单马尾',
  '双马尾',
  '麻花辫',
  '包子头',
  '公主辫',
  '长直',
  '姬发式',
  '短发',
  '中长发',
  '长发',
  '卷发',
  '波波头',
  '双钻头(螺旋双马尾)',
  '低马尾',
  '长双马尾'
]

Attribute_data = [
  '青梅竹马',
  '天降系',
  '妹妹',
  '姐姐',
  '人妻',
  '学生',
  '学生会长',
  '老师',
  '不良',
  '碧池',
  '破鞋',
  '优等生',
  '大小姐',
  '眼镜娘',
  '贵族',
  '不幸少女',
  '吸血鬼',
  '公主',
  '圣女',
  '修女',
  '偶像',
  '猫娘',
  '宅女',
  '文学少女',
  '巫女',
  '魔法少女',
  '人造人',
  '杀手',
  '杀人狂',
  '科学家',
  '伪娘',
  '警察',
  '暴走族',
  '女骑士',
  '特工',
  '女仆',
  '舰娘',
  '幽灵',
  '战术人形',
  '魔物娘'
]

Character_data = [
  '运动达人',
  '天才',
  '高傲',
  '傲娇',
  '元气',
  '强气',
  '弱气',
  '乐观',
  '悲观',
  '腹黑',
  '病娇',
  '冒失',
  '认真',
  '天然呆',
  '三无',
  '抖S',
  '抖M',
  '中二',
  '电波',
  '大和抚子',
  '病弱',
  '高岭之花',
  '笨蛋',
  '工口',
  '毒舌',
  '女王',
  '拜金',
  '温柔',
  '百合妹'
]

//数据来源:随便百度的 毫无科学依据
Cupsize_data = [
  'AA',
  'A',
  'A',
  'A',
  'A',
  'A',
  'B',
  'B',
  'B',
  'B',
  'B',
  'B',
  'B',
  'B',
  'B',
  'B',
  'B',
  'C',
  'C',
  'C',
  'C',
  'D',
  'D',
  'D',
  'E',
  'E',
  'F',
  'G'
]

Skin_data = ['洁白', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '黑妹']
// 以上为随机生成的对象数组

const info = {
  name: '老婆生成',
  author: 'jimmma',
  version: '1.0.0'
}


//监听
const listener = function (data) {
  const { raw_message, reply } = data
  if (['老婆生成'].includes(raw_message)) {

//取随机
var hair = oim.rand(Hair_data);
var Attribute = oim.rand(Attribute_data);
var Character = oim.rand(Character_data);
var cup = oim.rand(Cupsize_data);
var Skin = oim.rand(Skin_data);
var high = oim.rand(Height_data);

    let msg = `======生成完毕======\n`
    msg += `身高: ${high} \n`
    msg += `属性: ${Attribute} \n`
    msg += `形象: ${Character} \n`
    msg += `cup: ${cup} \n`
    msg += `肤色: ${Skin} \n`
    msg += `头发: ${hair} \n`
    reply(msg)
  }
}

const enable = bot => {
  bot.on('message', listener)
}
const disable = bot => {
  bot.off('message', listener)
}
module.exports = { info, enable, disable }
