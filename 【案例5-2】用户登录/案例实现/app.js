// app.js
App({
  onLaunch: function () {
    this.checkLogin(res => {
      console.log('is_login: ', res.is_login)
      if (!res.is_login) {
        this.login()
      }
    })
  },
  login: function () {
    wx.login({
      success: res => {
        console.log('login code: ' + res.code)
        wx.request({
          url: 'http://127.0.0.1:3000/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: res => {
            console.log('token: ' + res.data.token)
            // 将token保存为公共 数据，用于在所有页面中共享token
            this.globalData.token = res.data.token
            // 将token保存到数据缓存
            wx.setStorage({
              key: 'token',
              data: res.data.token
            })
          }
        })
      }
    })
  },
  checkLogin: function (callback) {
    var token = this.globalData.token
    if (!token) {
      // 从数据缓存中获取token
      token = wx.getStorageSync('token')
      if (token) {
        this.globalData.token = token
      } else {
        callback({ is_login: false })
        return
      }
    }
    wx.request({
      url: 'http://127.0.0.1:3000/checklogin',
      data: { token: token },
      success: res => {
        callback({ is_login: res.data.is_login })
      }
    })
  }, 
  // 定义页面所需的数据 
  globalData: {
    token: null // 保存token
  }
})