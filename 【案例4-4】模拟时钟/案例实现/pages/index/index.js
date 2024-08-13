// index.js
const drawClock = require('../../utils/drawClock.js')

Page({
  timer: null, // 定时器

  onReady: function () {
    wx.createSelectorQuery()
    .select('#myCanvas')
    .fields({ node: true, size: true })
    .exec(res => {
      const canvas = res[0].node
      canvas.width = res[0].width
      canvas.height = res[0].height
      const draw = drawClock(canvas)
      draw()
      this.timer = setInterval(draw, 1000)
    })
  },
  // 在页面卸载时清除定时器
  onUnload: function () {
    clearInterval(this.timer)
  }
})
