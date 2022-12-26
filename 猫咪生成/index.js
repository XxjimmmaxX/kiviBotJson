const oim = require('@vikiboss/oim')

// 以下为随机生成的对象数组
const colors = ['black', 'white', 'gray', 'brown', 'orange'];
const breeds = ["英国短毛猫","美国短毛猫","欧洲短毛猫","东方短毛猫","暹罗猫","卷毛猫","缅甸猫","哈瓦那猫","新加坡猫","曼岛猫","埃及猫","孟加拉猫","苏格兰折耳猫","美国卷耳猫","加州闪亮猫","加拿大无毛猫","日本短尾猫","呵叻猫","阿比西尼亚猫","孟买猫","俄罗斯蓝猫","波米拉猫","波斯猫(英国称longhair)","金吉拉猫","喜马拉雅猫","缅因猫","伯曼猫","安哥拉猫","土耳其梵猫","挪威森林猫","西伯利亚猫","布偶猫","索马里猫","狸花猫"]
const names = ["橙子","桔子","阳阳","小菊","黄黄","大黄","阿黄","金子","金豆","汤圆","馒头","年糕","汉堡","锅包肉","红烧肉","肉包","包包","肉肉","小丸子","花椒","方便面","豆包","蛋黄酥","煎饺","大饼","哈密瓜","牛奶","布丁","芒果","橘子","沙拉","冰粉","布丁","泡芙","黑加仑","巧克力","可乐","月饼","桃酥","麻花","香蕉","丸子","肉丸","咖啡","摩卡","奶糖","糖糖","美美","团团","点点","露露","欣欣","小冰","天使","安琪","安妮","甜甜","米莉","宝贝","小雪","米菲","安娜","毛球","哈比","拖把","七宝","阿布","卡鲁","布鲁斯","不想动","不高兴","喵叽叽","安咕咕","榔头","棒槌","小脑斧","红中","八万","拉登","奈美","德芙","狗蛋","耶斯托洛夫斯基","梵高","林黛玉","梦露","莎士比亚","拿破仑","丘吉尔","总统","巴顿","东坡","曼玉","cream（奶油松）","cookie（曲奇）","trifle（松糕）","custard（奶蛋饼）","cocoa（可可）fritter（炸果饼）","souffle（蛋奶酥）","fruit（果冻）","dessert（甜点）","loli（罗莉）","puff（松饼）","coco（可可）","欧米伽（oumiga）","Sunny（桑尼）","欧米伽（oumiga）","Sunny（桑尼）","i miss you (米修)","Peter（皮特）","crookshanks（《哈利波特》赫敏养的一只猫）","kitty（《蒂凡尼的早餐》的一只猫的名字）Doki","noodle","pickle","Joki","Yodi","Haru"]
const eyeColors = ['green', 'blue', 'yellow', 'orange', 'brown'];
// 英国短毛猫、金吉拉猫、银渐层猫、美国短毛猫、布偶猫、金渐层猫、波斯猫、苏格兰折耳猫、异国短毛猫、挪威森林猫、孟加拉豹猫、孟买猫、奥西猫、喜马拉雅猫、暹罗猫、俄罗斯蓝猫
// 以上为随机生成的对象数组

const info = {
  name: '猫咪生成',
  author: 'jimmma',
  version: '1.0.0'
}

// 监听
const listener = function (data) {
  const { raw_message, reply } = data

  if (['猫咪生成'].includes(raw_message)) {
    // 取随机
    const color = colors[Math.floor(Math.random() * colors.length)];
    const breed = breeds[Math.floor(Math.random() * breeds.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    var weight = Math.random() * 10 + 5; // weight between 5 and 15 pounds
    weight = weight.toFixed(2)
    var size = Math.random() * 20 + 10; // size between 10 and 30 inches
    size = size.toFixed(2)
    const weight_ch = weight * 0.45
    const size_ch = size * 2.54

    const msg = `
🐈🐈‍你的猫咪生成好了~🐈‍🐈
😾毛发颜色: ${color}
😾眼睛颜色: ${eyeColor}
😾品种: ${breed}
😾名字: ${name}
😾重量: ${weight}磅 = ${weight_ch}公斤
😾大小: ${size}英寸 = ${size_ch}厘米`.trim()

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
