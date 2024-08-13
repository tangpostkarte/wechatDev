// index.js
const app = getApp()
const fetch = app.fetch
Page({
  data: {
    swiper: [],
    ad: '',
    category: []
  },
  onLoad: function () {
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('/food/index').then(data => {
        wx.hideLoading()
        this.setData({
          swiper: data.img_swiper,
          ad: data.img_ad,
          category: data.img_category
        })
      }, () => {
        callback()
      })
    }
    if (app.userLoginReady) {
      callback()
    } else {
      app.userLoginReadyCallback = callback
    }  
  },
  start: function () {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
  
})
