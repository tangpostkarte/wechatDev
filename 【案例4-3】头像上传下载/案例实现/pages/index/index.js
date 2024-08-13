// index.js
Page({
  data: {
    imgUrl: '/images/guest.png',
    tempFilePath: null
  },
  uploadFileUrl: null,
  // 图片选择
  changeImg: function () {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: res => {
        var tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          tempFilePath: tempFilePath,
          imgUrl: tempFilePath
        })
      }
    })
  },
  upload: function () {
    // 如果没有更改照片则提示更改后再上传
    if (!this.data.tempFilePath) {
      wx.showToast({
        title: '请您更改头像之后再进行上传操作',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 确认更改头像之后再上传
    wx.uploadFile({
      filePath: this.data.tempFilePath,
      name: 'image',
      url: 'http://localhost:3000/upload',
      success: res => {
        this.uploadFileUrl = JSON.parse(res.data).file
        console.log('上传成功')
      }
    })
  },
  // 图片的下载
  download: function () {
    if (!this.uploadFileUrl) {
      wx.showToast({
        title: '请您上传头像之后再进行下载操作',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '图片下载中，请稍后……',
    })
    wx.downloadFile({
      url: this.uploadFileUrl,
      success: res => {
        wx.hideLoading()
        console.log('下载完成')
        wx.previewImage({
          urls: [res.tempFilePath]
        })
      }
    })
  }
})