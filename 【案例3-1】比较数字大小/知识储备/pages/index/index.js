// index.js
Page({
  // 页面初始数据
  data: {
    msg1: 'Hello',
    msg2: 'World',
    message: 'Hello World',
    num: 1,    // 定义data数据
    condition: true,
    count: 1,
    hidden: true
  },
  test: function () {				// 定义test()函数
      console.log('test()函数执行了')
  }, 
  compare: function () {
    console.log('比较按钮被单击了')
  },
  compare () {
    console.log('比较按钮被单击了')
  },
  compare: function (e) {
    console.log(e)
  },
  viewtap: function (e) {
    console.log(e.target.id + '-' + e.currentTarget.id)
  },  
  changeText: function () {
    this.setData({
      message: 'hello 微信小程序'
    })
  },
  // 页面生命周期回调函数，以onLoad()为例
  onLoad: function () {
    console.log(this.data.num)		// 通过this关键字访问data中的num数据
    this.test()				   		      // 通过this关键字调用test()函数

    console.log('onLoad()函数执行了');
  },
  // 页面事件处理函数，以onPullDownRefresh()为例
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh()函数执行了');
  }
})