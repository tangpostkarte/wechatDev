// index.js
const app = getApp()
const defaultAvatar = '/images/avatar.png'
Page({
  data: {
    avatarUrl: defaultAvatar,
  },

  credit: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/credit',
      data: {
        token: app.globalData.token
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onChooseAvatar: function (e) {
    console.log(e)
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
  },  
})