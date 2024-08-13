// 将角度转换为弧度
const D6 = 6 * Math.PI / 180
const D30 = 30 * Math.PI / 180
const D90 = 90 * Math.PI / 180

module.exports = canvas => {
  const ctx = canvas.getContext('2d')
  // 计算表盘半径，留出30px外边距
  var radius = canvas.width / 2 - 30
  return () => {
    // 在绘制时钟前先清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 设置坐标轴原点为画布的中心点
    ctx.translate(canvas.width / 2, canvas.height / 2)
    // 绘制表盘
    drawDial(ctx, radius)
    // 绘制指针
    drawHand(ctx, radius)
    // 绘制完成后将画布恢复成初始状态
    ctx.rotate(D90)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)
    ctx.restore()
  }
}
// 表盘整体部分，包括外层大圆和中心圆部分
function drawDial(ctx, radius) {
  // 绘制外层大圆
  ctx.lineWidth = '2' // 设置线条宽度为2px
  ctx.beginPath() // 开始一条路径
  ctx.arc(0, 0, radius, 0, 2 * Math.PI, true) // 画弧线
  ctx.stroke() // 绘制
  // 绘制中心圆
  ctx.lineWidth = '1'
  ctx.beginPath()
  ctx.arc(0, 0, 8, 0, 2 * Math.PI, true) // 中心圆半径为8px
  ctx.stroke()
  // 绘制大刻度盘
  ctx.lineWidth = '5'
  // 从三点钟开始，转圈进行绘制
  for (var i = 0; i < 12; ++i) {
    // 以原点为中心顺时针旋转，多次调用旋转的角度会叠加，从而画出倾斜的线
    ctx.rotate(D30) // 大刻度盘绘制12个线条
    ctx.beginPath()
    // 设置起始点，现在原点是在中心点，调用moveTo()方法将线条移动到外层大圆上
    ctx.moveTo(radius, 0)
    // 设置终点
    ctx.lineTo(radius - 15, 0) // 大刻度长度15px
    ctx.stroke()
  }
  // 绘制小刻度盘
  ctx.lineWidth = '1'
  for (var i = 0; i < 60; ++i) {
    ctx.rotate(D6)
    ctx.beginPath()
    ctx.moveTo(radius, 0)
    ctx.lineTo(radius - 10, 0) // 小刻度盘长度10px
    ctx.stroke()
  }
  // 绘制数字
  ctx.font = '22px sans-serif'
  ctx.textBaseline = 'middle' // 文本垂直居中
  // 文本距离时钟中心点半径，让文字与表盘线有距离
  var r = radius - 30
  // 文本位置是绕外圈圆的，所以要计算文本坐标
  for (var i = 1; i <= 12; ++i) {
    // 利用三角函数计算文本坐标
    var x = r * Math.cos(D30 * i - D90)
    var y = r * Math.sin(D30 * i - D90)
    // console.log(x, y)
    // 位置进行调整
    if (i > 10) {
      // 在画布上绘制文本，fillText(文本, 左上角x坐标, 左上角y坐标)
      ctx.fillText(i, x - 12, y) // 绘制11和12
    } else {
      ctx.fillText(i, x - 6, y) // 绘制1~10
    }
  }
}
// 绘制指针
function drawHand(ctx, radius) {
  var t = new Date() // 获取当前时间
  var h = t.getHours() // 小时
  var m = t.getMinutes() // 分
  var s = t.getSeconds() // 秒
  h = h > 12 ? h - 12 : h // 将24小时制转化为12小时制
  // 时间从3点开始，逆时针旋转90°，指向12点
  ctx.rotate(-D90)
  // 绘制时针
  ctx.save() // 记录旋转状态
  ctx.rotate(D30 * (h + m / 60 + s / 3600))
  ctx.lineWidth = '6'
  ctx.beginPath()
  ctx.moveTo(-20, 0) // 线条起点（针尾留出20px）
  ctx.lineTo(radius / 2.6, 0) // 线条长度
  ctx.stroke()
  ctx.restore() // 恢复旋转状态，避免旋转叠加
  // 绘制分针
  ctx.save()
  ctx.rotate(D6 * (m + s / 60))
  ctx.lineWidth = '4'
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(radius / 1.8, 0)
  ctx.stroke()
  ctx.restore()
  // 绘制秒针
  ctx.save()
  ctx.rotate(D6 * s)
  ctx.lineWidth = '2'
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(radius / 1.6, 0)
  ctx.stroke()
  ctx.restore()
}