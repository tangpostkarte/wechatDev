// app.js
App({
  fetch: require('./utils/fetch.js'),
  onLaunch: function () {
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    this.fetch('/user/checkLogin').then(data => {
      if (data.isLogin) {
        // 已登录
        this.onUserLoginReady()
        console.log('通过保存的Cookie登录成功') // 新增代码
      } else {
        // 未登录
        this.login({
          success: () => {			// 登录成功
            this.onUserLoginReady()
          },
          fail: () => {				// 登录失败，重新登录
            this.onLaunch()
          }
        })        
      }
    }, () => {
      this.onLaunch()
    })
  },
  login: function (options) {
    wx.login({
      success: res => {
        this.fetch('/user/login', {
          js_code: res.code
        }).then(data => {
          if (data && data.isLogin) {
            options.success()
          } else {
            wx.hideLoading()
            wx.showModal({
              title: '登录失败（请使用真实的AppID，并检查服务器端配置）',
              confirmText: '重试',
              success: res => {
                if (res.confirm) {
                  options.fail()
                }
              }
            })
          }
        }, () => {
          options.fail()
        })
      }
    })  
  },
  userLoginReady: false,
  userLoginReadyCallback: null,
  onUserLoginReady: function() {
    wx.hideLoading()
    if (this.userLoginReadyCallback) {
      this.userLoginReadyCallback()
    }
    this.userLoginReady = true
  }
})
