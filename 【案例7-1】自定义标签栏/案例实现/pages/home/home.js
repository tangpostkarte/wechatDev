// pages/home/home.js
const app = getApp()
Page({

  onShow: function () {
    this.getTabBar().setData({
      active: 'home'
    })
  },

})