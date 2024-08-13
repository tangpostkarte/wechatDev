// pages/compass/compass.js
Page({

  data: {
    animation: {}
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
  },
  // 实现从原点随机旋转某一个角度
  rotate: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现图片随机缩放的效果
  scale: function () {
    this.animation.scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现平移变换的效果
  translate: function () {
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现对x、y轴坐标进行随机倾斜
  skew: function () {
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现同时进行旋转和缩放
  rotateAndScale: function () {
    this.animation.rotate(Math.random() * 720 - 360)
    this.animation.scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现旋转之后在缩放
  rotateThenScale: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.animation.scale(Math.random() * 2).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现同时展示全部动画
  all: function () {
    this.animation.rotate(Math.random() * 720 - 360)
    this.animation.scale(Math.random() * 2)
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现按顺序展示全部动画
  allOrder: function () {
    this.animation.rotate(Math.random() * 720 - 360).step()
    this.animation.scale(Math.random() * 2).step()
    this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  // 实现回到初始状态
  reset: function () {
    this.animation.rotate(0).scale(1).translate(0, 0).skew(0, 0).step({
      duration: 0
    })
    this.setData({
      animation: this.animation.export()
    })
  }
})