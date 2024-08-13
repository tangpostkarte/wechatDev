// pages/order/detail/detail.js
const app = getApp()
const fetch = app.fetch
Page({
  data: {},
  onLoad: function (options) {
    var id = options.order_id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('/food/order', {
      id: id
    }).then(data => {
      this.setData(data)
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  onUnload: function () {
    wx.reLaunch({
      url: '/pages/order/list/list'
    })
  }
})
