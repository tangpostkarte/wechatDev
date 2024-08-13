// index.js
const calc = require('../../utils/calc.js')

Page({
  data: {
    sub: '',
    num: '0'
  },
  // 设置3个变量标识
  numChangeFlag: false,
  execFlag: false,
  resultFlag: false,
  numBtn: function (e) {
    // 点击数字按钮，获取对应的数字，将其值赋给num
    var num = e.target.dataset.val
    if (this.resultFlag) {
      this.resetBtn()
    }
    if (this.numChangeFlag) {
      this.numChangeFlag = false
      this.execFlag = true // 代表已输入第2个数字
      this.data.num = '0' // 将num设为0，避免数字进行拼接
      calc.changeNum2() // 将target切换到第2个数字
    }
    // 设置输入的数字
    calc.setNum(this.data.num === '0' ? num : this.data.num + num)
    // 在页面中显示输入的数字
    this.setData({
      num: calc.getNum()
    })
  },
  opBtn: function (e) {
    calc.op = e.target.dataset.val
    this.numChangeFlag = true
    // 判断是否已经输入第2个数字
    if (this.execFlag) {
      this.execFlag = false
      // 已经输入第2个数字，再判断当前是否为计算结果状态
      if (this.resultFlag) {
        // 当前是计算结果状态，需要在计算结果的基础上计算
        this.resultFlag = false
      } else {
        // 连续计算，将计算结果作为第1个数字
        calc.num1 = calc.getResult()
      }
    }
    this.setData({
      sub: calc.num1 + ' ' + calc.op + ' ',
      num: calc.num1
    })
  },
  // “=”按钮的事件处理函数
  execBtn: function () {
    if (this.numChangeFlag) {
      this.numChangeFlag = false
      this.execFlag = true
      calc.num2 = this.data.num
    }
    // 如果已经输入第2个数字，执行计算操作
    if (this.execFlag) {
      this.resultFlag = true
      var result = calc.getResult()
      this.setData({
        sub: calc.num1 + ' ' + calc.op + ' ' + calc.num2 + ' = ',
        num: result
      })
      calc.num1 = result
    }
  },
  resetBtn: function () {
    calc.reset() // 调用reset()实现数字、运算符的重置
    this.execFlag = false
    this.numChangeFlag = false
    this.resultFlag = false
    this.setData({
      sub: '',
      num: '0'
    })
  },
  // “.”按钮（小数点按钮）的事件处理函数
  dotBtn: function () {
    // 如果当前是计算结果状态，则重置计算器
    if (this.resultFlag) {
      this.resetBtn()
    }
    // 如果等待输入第2个数字且还没有输入第2个数字，设为“0.”
    if (this.numChangeFlag) {
      this.numChangeFlag = false
      calc.setNum('0.')
    } else if (this.data.num.indexOf('.') < 0) {
      // 如果当前数字中没有“.”，需要加上“.”
      calc.setNum(this.data.num + '.')
    }
    this.setData({
      num: calc.getNum()
    })
  },
  // DEL按钮（删除按钮）的事件处理函数
  delBtn: function () {
    // 如果当前是计算结果状态，则重置计算器
    if (this.resultFlag) {
      return this.resetBtn()
    }
    // 非计算结果状态，删除当前数字中最右边的一个字符
    var num = this.data.num.substr(0, this.data.num.length - 1)
    calc.setNum(num === '' || num === '-' || num === '-0.' ? '0' : num)
    this.setData({
      num: calc.getNum()
    })
  },
  // “+/-”按钮（正负切换按钮）的事件处理函数
  negBtn: function () {
    // 如果是0，不加正负号
    if (this.data.num === '0' || this.data.num === '0.') {
      return
    }
    // 如果当前是计算结果状态，则重置计算器
    if (this.resultFlag) {
      this.resetBtn()
    } else if (this.data.num.indexOf('-') < 0) {
      // 当前没有负号，加负号
      calc.setNum('-' + this.data.num)
    } else {
      // 当前有负号，去掉负号
      calc.setNum(this.data.num.substr(1))
    }
    this.setData({
      num: calc.getNum()
    })
  }
})