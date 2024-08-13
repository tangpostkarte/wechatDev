// pages/message/message.js
const app = getApp()

Page({
  onShow: function () {
    this.getTabBar().setData({
      active: 'message'
    })
  },
})