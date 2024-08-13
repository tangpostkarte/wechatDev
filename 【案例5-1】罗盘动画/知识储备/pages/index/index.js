// index.js
Page({
  data: {
    move: {}
  },
  translate: function () {
    var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    animation.translate(50, 70).step()
    this.setData({
      move: animation.export()
    })
  }
})