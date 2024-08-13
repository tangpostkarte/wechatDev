const app = getApp()
const fetch = app.fetch
Page({
  data: {},
  comment: '',
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('/food/order', {
      id: options.order_id
    }).then(data => {
      this.setData(data)
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  inputComment: function (e) {
    console.log(e)
    this.comment = e.detail.value
  },
  pay: function () {
    var id = this.data.id
    wx.showLoading({
      title: '正在支付'
    })
    fetch('/food/order', {
      id: id,
      comment: this.comment
    }, 'POST').then(() => {
      return fetch('/food/pay', { id }, 'POST')
    }).then(() => {
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          wx.navigateTo({
            url: '/pages/order/detail/detail?order_id=' + id
          })
        }
      })
    }).catch(() => {
      this.pay()
    })
  }
  
})