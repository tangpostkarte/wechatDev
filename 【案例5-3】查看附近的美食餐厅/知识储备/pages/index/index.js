// index.js
// 引入SDK核心类，js文件的位置可自行放置
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
// 创建QQMapWX实例
const qqmapsdk = new QQMapWX({
  key: '7DCBZ-N5P64-AFSUR-DLNYJ-MQ2YK-VCFP3'  // 需要填写！！！
})
Page({
  data: {
    markers: [{
      id: 1,
      width: 90,
      height: 90,
      iconPath: '/images/gps.png',
      longitude: 113.324520,
      latitude: 23.099994
    }]
  },
  onReady: function () {
    const mapContext = wx.createMapContext('myMap')

    mapContext.getCenterLocation({
      success: res => {
        const longitude = res.longitude
        const latitude = res.latitude
        console.log(longitude, latitude)
      }
    })

    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const longitude = res.longitude
        const latitude = res.latitude
        console.log(longitude, latitude)
      }
    })

    wx.getSystemInfo({
      success: res => {
        console.log(res.windowWidth)           // 可使用窗口宽度
        console.log(res.windowHeight)          // 可使用窗口高度
      }
    })    
  },
  onShow: function () {
    // 搜索信息
    qqmapsdk.search({
      keyword: '酒店',
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  navigateTo: function () {
    wx.navigateTo({
      url: '/pages/list/list?id=1',
      success: () => {
        console.log('跳转成功')
      },
      fail: () => {
        console.log('跳转失败')
      },
      complete: () => {
        console.log('跳转完成')
      }
    })
  }
})
