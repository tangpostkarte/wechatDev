// index.js
Page({
  data: {
    arr: [ 'a', 'b', 'c'],
    list: [
      { message: '梅' , id: 1 }, { message: '兰' , id: 2 },
      { message: '竹' , id: 3 }, { message: '菊' , id: 4 }
    ]
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()

      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }, 2000)
  },
  onReachBottom: function () {
    console.log('触发了上拉触底的事件')
  },
  onPullDownRefresh: function () {
    console.log('触发了下拉刷新的事件')
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
  }
})
