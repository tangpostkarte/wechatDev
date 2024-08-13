// index.js
Page({
  onReady: function () {
    wx.createSelectorQuery()
      .select('#myCanvas') // 页面中<canvas>标签的id
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        // 获取Canvas实例
        const canvas = res[0].node
        // 调用getContext()方法获取RenderingContext实例
        const ctx = canvas.getContext('2d')
      })

    wx.createSelectorQuery()
      .select('#draw')
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        this.drawRect(ctx)
        this.drawSmile(ctx)
      })
  },
  drawRect: function (ctx) {
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(10, 10, 150, 50)
  },

  drawSmile: function (ctx) {
    // 设置线条颜色为红色，线条宽度为2px
    ctx.strokeStyle = '#f00'
    ctx.lineWidth = '2'
    // 移动画笔坐标位置，绘制外部大圆
    ctx.moveTo(160, 80)
    ctx.arc(100, 80, 60, 0, 2 * Math.PI, true)
    // 移动画笔坐标位置，绘制外部嘴巴线条
    ctx.moveTo(140, 80)
    ctx.arc(100, 80, 40, 0, Math.PI, false)
    // 移动画笔坐标位置，绘制左眼圆圈
    ctx.moveTo(85, 60)
    ctx.arc(80, 60, 5, 0, 2 * Math.PI, true)
    // 移动画笔坐标位置，绘制右眼圆圈
    ctx.moveTo(125, 60)
    ctx.arc(120, 60, 5, 0, 2 * Math.PI, true)
    ctx.stroke()
  }
})