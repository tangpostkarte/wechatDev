// index.js
Page({
  onReady: function () {
    // 创建BackgroundAudioManager实例
    var audioGbam = wx.getBackgroundAudioManager()
    // 当开始播放音乐时，输出调试信息
    audioGbam.onPlay(function () {
      console.log('开始播放')
    })
    // 设置背景音频的标题
    audioGbam.title = '音乐标题'
    // 设置背景音频的资源地址
    audioGbam.src = 'http://127.0.0.1:3000/1.mp3'
  },
  scroll: function (e) {
    console.log(e.detail)
  },
  sliderChanging: function (e) {
    console.log(e.detail.value)
  }
})