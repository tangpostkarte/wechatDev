// index.js
Page({
  data: {
    url: 'http://127.0.0.1:3000/tree.jpg',
  },
  tempFilePath: null,
  test: function () {
    wx.chooseMedia({
      count: 9, // 最多可以选择9个文件 
      mediaType: ['image'], // 文件类型为只能拍摄图片或从相册中选图片
      sourceType: ['album', 'camera'], // 图片来源为从相册选择和使用相机拍摄
      success: res => {
        // 获取用户选择的文件
        const tempFilePath = res.tempFiles[0].tempFilePath
        console.log(tempFilePath)
        this.tempFilePath = tempFilePath
        this.setData({
          url: this.tempFilePath
        })
      }
    })
  },
  // 预览图片
  previewImage() {
    wx.previewImage({
      urls: [
        this.data.url // 需要预览的图片链接列表
      ]
    })
  },
  // 文件上传
  upload: function () {
    wx.uploadFile({
      filePath: this.tempFilePath,
      name: 'image',
      url: 'http://127.0.0.1:3000/upload',
      success: res => {
        console.log(res)
      }
    })
  },
  // 文件下载
  download: function () {
    wx.downloadFile({
      url: 'http://127.0.0.1:3000/tree.jpg',
      success(res) {
        // 判断服务器响应的状态码
        if (res.statusCode === 200) {
          console.log(res.tempFilePath)
        }
      }
    })
  }
})