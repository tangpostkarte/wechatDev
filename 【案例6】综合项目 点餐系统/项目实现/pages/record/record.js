// pages/record/record.js
const defaultAvatar = '/images/avatar.png'
const app = getApp()
const fetch = app.fetch
Page({
  data: {
    avatarUrl: defaultAvatar
  },
  onLoad: function () {
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('/food/record').then(data => {
      wx.hideLoading()
      this.setData(data)
    })
  },
  onChooseAvatar: function (e) {
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
  }
})