// index.js
const defaultAvatar = '/images/avatar.png'

Page({
  data: {
    avatarUrl: defaultAvatar
  },

  onLoad: function () {
    wx.login({
      success: res => {
        if (res.code) { // res.code为登录获取的code
          // 登录成功之后发起网络请求
          wx.request({
            url: 'http://127.0.0.1:3000/login',
            method: 'post',
            data: {
              code: res.code // 设置参数，把code传递给服务器
            },
            success: res => {
              console.log(res.data)
            }
          })
        } else {
          // 登录失败，在控制台输出错误信息
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // 存储缓存数据
    wx.setStorage({
      key: 'key', // 本地缓存中指定的key
      data: 'value', // 需要存储的内容（支持对象或字符串）
      success: res => {}, // 接口调用成功的回调函数
      fail: res => {} // 接口调用失败的回调函数
    })
    // 获取缓存数据
    wx.getStorage({
      key: 'key', // 本地缓存中指定的key
      success: res => { // 接口调用成功的回调函数
        console.log(res.data)
      },
      fail: res => {} // 接口调用失败的回调函数
    })
  },
  onChooseAvatar: function (e) {
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
  }
})