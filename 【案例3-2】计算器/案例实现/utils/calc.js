const math = require('./math.js')

// 计算器中的数字处理
module.exports = {
  target: 'num1',  // 表示当前正在输入哪个数字
  num1: '0',       // 保存第1个数字
  num2: '0',       // 保存第2个数字
  op: '',          // 运算符，值可以是 ＋ － × ÷
  // 设置当前数字
  setNum (num) {
    this[this.target] = num
  },
  // 获取当前数字
  getNum () {
    return this[this.target]
  },
  // 切换到第2个数字
  changeNum2 () {
    this.target = 'num2'
  },
  // 重置
  reset () {
    this.num1 = this.num2 = '0'
    this.target = 'num1'
    this.op = ''
  },
  // 进行计算
  getResult () {
    if (this.op === '＋') {
      return math.add(this.num1, this.num2) + ''
    } else if (this.op === '－') {
      return math.sub(this.num1, this.num2) + ''
    } else if (this.op === '×') {
      return math.mul(this.num1, this.num2) + ''
    } else if (this.op === '÷') {
      return math.div(this.num1, this.num2) + ''
    }
  }
}