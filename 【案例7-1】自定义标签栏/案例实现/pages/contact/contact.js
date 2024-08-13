// pages/contact/contact.js
const app = getApp()
Page({
  onShow: function () {
    this.getTabBar().setData({
      active: 'contact'
    })
  },
})