// index.js
Page({
  onReady: function () {
    // 获取全局唯一的录音管理器RecorderManager
    var recorderManager = wx.getRecorderManager()
    // 监听录音开始事件
    recorderManager.onStart(() => {
      console.log('录音开始');
    })
    // 监听录音停止事件
    recorderManager.onStop(res => {
      console.log('录音停止')
      console.log(res.tempFilePath)
    })
    // 开始录音
    recorderManager.start()
    // 5秒后自动停止录音
    setTimeout(() => {
      recorderManager.stop()
    }, 5000)

    // 创建InnerAudioContext实例
    var audioCtx = wx.createInnerAudioContext()
    // 设置音频资源地址
    audioCtx.src = 'http://127.0.0.1:3000/1.mp3'
    // 当开始播放音频时，输出调试信息
    audioCtx.onPlay(() => {
      console.log('开始播放')
    })
    // 开始播放
    audioCtx.play()
  }
})