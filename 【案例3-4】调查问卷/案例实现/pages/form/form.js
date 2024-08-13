// pages/form/form.js
Page({
  data: {

  },
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中'
    })
    wx.request({
      url: 'http://127.0.0.1:3000/',
      success: res => {
        // statusCode为HTTP状态码，200表示网络请求成功，数据获取成功
        if (res.statusCode === 200) {
          this.setData(res.data)
          console.log(res.data)
        } else {
          wx.showModal({
            title: '服务器异常'
          })
        }
        setTimeout(() => {
          wx.hideLoading()
        }, 500)
      },
      fail: function () {
        wx.hideLoading()
        wx.showModal({
          title: '网络异常，无法请求服务器'
        })
      },
    })
  },
  radioChange: function (e) {
    var val = e.detail.value
    this.data.gender.forEach((v) => {
      v.value === val ? v.checked = true : v.checked = false
    })
  },
  checkboxChange: function (e) {
    var val = e.detail.value
    this.data.skills.forEach((v) => {
      val.includes(v.value) ? v.checked = true : v.checked = false
    })
  },
  submit: function () {
    wx.request({
      url: 'http://127.0.0.1:3000',
      method: 'POST',
      data: this.data,
      success: res => {
        wx.showModal({
          title: '提交完成',
          showCancel: false
        })
      }
    })
  }
})