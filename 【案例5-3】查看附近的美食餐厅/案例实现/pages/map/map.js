// pages/map/map.js
const key = '7DCBZ-N5P64-AFSUR-DLNYJ-MQ2YK-VCFP3'
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const qqmapsdk = new QQMapWX({
  key
})

Page({
  data: {
    scale: 18,      // 缩放
    longitude: 0,   // 地图中心点经度
    latitude: 0,    // 地图中心点纬度
    markers: []     // 标记点
  },
  mapCtx: null,

  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },

  onLoad: function () {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    })
  },

  getFood: function (longitude, latitude) {
    // 调用接口
    qqmapsdk.search({
      // 搜索关键词
      keyword: '餐厅',
      location: {
        longitude: longitude,
        latitude: latitude
      },
      success: res => {
        var markers = []
        // 为附近的美食餐厅设置标记点
        for (let i in res.data) {
          markers.push({
            iconPath: '/images/food.png',
            id: markers.length,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            width: 30,
            height: 30
          })
        }
        markers.push({
          iconPath: '/images/center.png',
          id: res.data.length,
          latitude: latitude,
          longitude: longitude,
          width: 15,
          height: 40
        })
        // 将搜索结果显示在地图上
        this.setData({
          markers
        })
      }
    })
  },

  regionChange: function (e) {
    if (e.type === 'end') {
      this.mapCtx.getCenterLocation({
        success: res => {
          this.getFood(res.longitude, res.latitude)
        }
      })
    }
  },

  bannerTap: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon'
    })
  },
  
  controlTap: function (e) {
    this.mapCtx.moveToLocation()
  }
})